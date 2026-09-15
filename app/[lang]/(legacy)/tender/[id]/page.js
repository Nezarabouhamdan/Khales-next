"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import styles from "./tender.module.css";

const NEXT_API_URL = "/api/tender";

export default function TenderPage() {
  const params = useParams();
  const projectId = params?.id;

  const [project, setProject] = useState(null);
  const [boqItems, setBoqItems] = useState([]);
  const [contractor, setContractor] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Fetch Data ---
  useEffect(() => {
    if (!projectId) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${NEXT_API_URL}?id=${projectId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Project not found");

        setProject({
          id: data.id,
          name: data.project_name,
          client: data.client_name,
        });

        setBoqItems(
          data.boq_items.map((item) => ({
            ...item,
            price: "",
            total: 0,
          })),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [projectId]);

  // --- Handlers ---
  const handlePriceChange = (id, val) => {
    const price = parseFloat(val);
    setBoqItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            price: val,
            total: isNaN(price) ? 0 : item.qty * price,
          };
        }
        return item;
      }),
    );
  };

  const handleContractorChange = (e) => {
    setContractor({ ...contractor, [e.target.name]: e.target.value });
  };

  const grandTotal = useMemo(() => {
    return boqItems.reduce((acc, item) => acc + item.total, 0);
  }, [boqItems]);

  // --- Pagination ---
  const totalPages = Math.ceil(boqItems.length / itemsPerPage);
  const currentItems = boqItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractor.name || !contractor.phone || grandTotal <= 0) {
      alert(
        "Please ensure all details are filled and at least one price is entered.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        project_id: projectId,
        contractor_name: contractor.name,
        email: contractor.email,
        phone: contractor.phone,
        company: contractor.company,
        lines: boqItems
          .filter((i) => parseFloat(i.price) > 0)
          .map((i) => ({ line_id: i.id, price: i.price })),
      };

      const res = await fetch(NEXT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission Failed");
      setSubmitted(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className={styles.centerMessage}>Loading Tender...</div>;
  if (error)
    return (
      <div className={styles.centerMessage} style={{ color: "red" }}>
        {error}
      </div>
    );

  if (submitted)
    return (
      <div className={styles.centerMessage} style={{ flexDirection: "column" }}>
        <h1
          style={{ color: "#4F8A10", fontSize: "3rem", marginBottom: "10px" }}
        >
          ✓
        </h1>
        <h2>Submission Received</h2>
        <p>Thank you, your bid has been securely recorded.</p>
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          {/* 1. Header Card */}
          <div className={styles.headerCard}>
            <div className={styles.projectTitle}>
              <span className={styles.idBadge}>Tender #{project?.id}</span>
              <h1 style={{ marginTop: "10px" }}>{project?.name}</h1>
              <p>Client: {project?.client}</p>
            </div>
            {/* يمكنك إضافة شعار الشركة هنا إذا أردت */}
          </div>

          {/* 2. Contractor Info */}
          <h3 className={styles.sectionTitle}>Contractor Information</h3>
          <div className={styles.formCard}>
            <div className={styles.gridTwo}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Company Name</label>
                <input
                  name="company"
                  className={styles.input}
                  onChange={handleContractorChange}
                  placeholder="Company Ltd."
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Contact Person</label>
                <input
                  name="name"
                  required
                  className={styles.input}
                  onChange={handleContractorChange}
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  name="email"
                  required
                  type="email"
                  className={styles.input}
                  onChange={handleContractorChange}
                  placeholder="name@company.com"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  name="phone"
                  required
                  className={styles.input}
                  onChange={handleContractorChange}
                  placeholder="+971..."
                />
              </div>
            </div>
          </div>

          {/* 3. Pricing Table */}
          <h3 className={styles.sectionTitle}>Pricing Schedule (BOQ)</h3>
          <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Description</th>
                    <th style={{ width: "10%" }}>Unit</th>
                    <th style={{ width: "10%" }}>Qty</th>
                    <th style={{ width: "20%", textAlign: "right" }}>
                      Unit Price
                    </th>
                    <th style={{ width: "20%", textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>
                          {item.description}
                        </div>
                        {item.section && (
                          <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                            {item.section}
                          </div>
                        )}
                      </td>
                      <td>{item.uom}</td>
                      <td>{item.qty}</td>
                      <td style={{ textAlign: "right" }}>
                        <input
                          type="number"
                          className={styles.priceInput}
                          placeholder="0.00"
                          onChange={(e) =>
                            handlePriceChange(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "right", fontWeight: 600 }}>
                        {item.total > 0 ? item.total.toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px 0",
                  borderTop: "1px solid #eee",
                }}
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 16px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "#fff",
                  }}
                >
                  Previous
                </button>
                <span style={{ fontSize: "0.9rem", color: "#555" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 16px",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "#fff",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Spacer for Bottom Bar */}
        <div style={{ height: "100px" }}></div>

        {/* 4. Modern Floating Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.totalArea}>
            <span className={styles.totalLabel}>Grand Total (AED)</span>
            <span className={styles.totalValue}>
              {grandTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Submit Bid"}
          </button>
        </div>
      </form>
    </div>
  );
}
