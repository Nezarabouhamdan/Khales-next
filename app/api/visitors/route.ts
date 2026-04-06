// import { NextResponse } from "next/server";
// import { BetaAnalyticsDataClient } from "@google-analytics/data";

// export const dynamic = "force-dynamic";

// const analyticsDataClient = new BetaAnalyticsDataClient({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   },
// });

// export async function GET() {
//   const propertyId = process.env.GA4_PROPERTY_ID;

//   try {
//     const [response] = await analyticsDataClient.runReport({
//       property: `properties/${propertyId}`,
//       dateRanges: [
//         {
//           startDate: "2023-01-01",
//           endDate: "today",
//         },
//       ],
//       metrics: [
//         { name: "activeUsers" }, // الترتيب مهم: هذا سيكون index 0
//         { name: "eventCount" }, // هذا سيكون index 1
//       ],
//     });

//     const row = response.rows?.[0];
//     const activeUsers = row?.metricValues?.[0]?.value || "0";
//     const eventCount = row?.metricValues?.[1]?.value || "0";

//     return NextResponse.json({
//       visitors: parseInt(activeUsers),
//       events: parseInt(eventCount),
//     });
//   } catch (error) {
//     console.error("GA4 API Error:", error);
//     return NextResponse.json({ error: "Failed" }, { status: 500 });
//   }
// }
