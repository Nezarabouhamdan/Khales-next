import { NextResponse } from "next/server";
import xmlrpc from "xmlrpc";

export const runtime = "nodejs";

// --- Clients ---
const commonClient = xmlrpc.createClient({
  url: `${process.env.ODOO_URL}/xmlrpc/2/common`,
});
const objectClient = xmlrpc.createClient({
  url: `${process.env.ODOO_URL}/xmlrpc/2/object`,
});

// --- Helpers ---
function authenticate() {
  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [
        process.env.ODOO_DB,
        process.env.ODOO_EMAIL,
        process.env.ODOO_PASSWORD,
        {},
      ],
      (err, uid) => {
        if (err || !uid) reject("Odoo Auth Failed");
        else resolve(uid);
      },
    );
  });
}

function executeKw(uid, model, method, args, kwargs = {}) {
  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      "execute_kw",
      [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        model,
        method,
        args,
        kwargs,
      ],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      },
    );
  });
}

// --- GET Method (كما هو - لجلب البيانات) ---
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = Number(searchParams.get("id"));
    if (!projectId)
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 },
      );

    const uid = await authenticate();

    // جلب المشروع
    const project = await executeKw(
      uid,
      "project.project",
      "read",
      [[projectId]],
      {
        fields: ["name", "partner_id", "boq_state"],
      },
    );
    const projectData = project && project[0];

    if (!projectData || projectData.boq_state !== "published") {
      return NextResponse.json(
        { error: "Tender not available" },
        { status: 403 },
      );
    }

    // جلب بنود الـ BOQ
    const boqLines = await executeKw(
      uid,
      "kh.project.boq.plan",
      "search_read",
      [[["project_id", "=", projectId]]],
      {
        fields: [
          "id",
          "section_name",
          "item_description",
          "quantity",
          "uom_id",
        ],
        order: "id asc",
      },
    );

    return NextResponse.json({
      project_id: projectId,
      project_name: projectData.name,
      client_name: projectData.partner_id?.[1] || "",
      boq_items: boqLines.map((line) => ({
        id: line.id,
        section: line.section_name,
        description: line.item_description,
        qty: line.quantity,
        uom: line.uom_id,
      })),
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

// --- POST Method (التحديث الرئيسي هنا) ---
export async function POST(req) {
  console.log("🚀 [API] Submission Started");

  try {
    const body = await req.json();
    const { project_id, contractor_name, email, phone, company, lines } = body;

    if (!project_id || !contractor_name || !email || !lines) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const uid = await authenticate();

    // 1. حساب توقيت الإمارات (UTC+4) وإرساله كنص
    // ملاحظة: Odoo يتوقع الوقت بـ UTC. إذا أرسلت الوقت الحالي (UTC)، يجب ضبط تفضيلات المستخدم في أودو على Asia/Dubai ليظهر صحيحاً.
    // لكن لضمان الدقة سنرسل الوقت الحالي كما هو.
    const now = new Date();
    const dateString = now.toISOString().replace("T", " ").split(".")[0];

    // 2. إنشاء سجل التقديم
    // نملأ الحقول النصية الجديدة (contractor_name, etc.)
    console.log("📄 Creating Submission Header...");
    const submissionId = await executeKw(uid, "kh.boq.submission", "create", [
      {
        project_id: Number(project_id),
        contractor_name: company
          ? `${company} (${contractor_name})`
          : contractor_name,
        contractor_email: email,
        contractor_phone: phone,
        submission_date: dateString,
      },
    ]);

    console.log(`✅ Submission Created ID: ${submissionId}`);

    // 3. إنشاء الأسطر
    // نرسل فقط السعر، والكمية ستأتي تلقائياً من Related Field في أودو
    const linesPayload = lines.map((line) => ({
      submission_id: submissionId,
      plan_line_id: line.line_id, // هذا الربط سيجلب الكمية تلقائياً
      unit_price: parseFloat(line.price),
    }));

    if (linesPayload.length > 0) {
      await executeKw(uid, "kh.boq.line", "create", [linesPayload]);
      console.log("✅ Lines Created");
    }

    return NextResponse.json({ success: true, submission_id: submissionId });
  } catch (error) {
    console.error("🔥 [API ERROR]:", error);
    const msg = error.faultString || error.message || "Unknown Error";
    return NextResponse.json(
      { error: "Submission Failed", details: msg },
      { status: 500 },
    );
  }
}
