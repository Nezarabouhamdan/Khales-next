"use client";
import React, { useState } from "react";
import styles from "./CustomizePackageForm.module.css";

const CustomizePackageForm = ({ dict }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    emirate: "",
    area: "",
    plotNumber: "",
    phone: "",
    email: "",
    budget: "",
    timeline: "",
    plan: "Medium",
  });

  if (!dict || !dict.customizePackagePage) return null;

  const { title, subtitle, sections, direction } = dict.customizePackagePage;
  const { projectDetails, packages, addons, submitButton, successMessage } =
    sections;

  const planOrder = ["Basic", "Medium", "Elite"];
  const currentPlanIndex = planOrder.indexOf(formData.plan);

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const includedFeatures = addons.options
        .filter((opt) => currentPlanIndex >= planOrder.indexOf(opt.minPlan))
        .map((opt) => opt.label)
        .join("; ");

      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          branch: formData.emirate,
          inquiry: formData.plan,
          description: `Area: ${formData.area}\nPlot: ${formData.plotNumber}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nIncluded features: ${includedFeatures}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create lead");
      }

      setStatusMessage(
        successMessage
          .replace("{name}", formData.fullName)
          .replace("{plan}", formData.plan),
      );
      setFormData({
        fullName: "",
        emirate: "",
        area: "",
        plotNumber: "",
        phone: "",
        email: "",
        budget: "",
        timeline: "",
        plan: "Medium",
      });
    } catch (error) {
      console.error(error);
      setStatusMessage(
        "حدث خطأ أثناء إرسال البيانات. الرجاء المحاولة مرة أخرى.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper} dir={direction}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit}>
          <h2 className={styles.sectionTitle}>{projectDetails.title}</h2>
          <div className={styles.inputGrid}>
            {/* الاسم الكامل */}
            <div className={styles.field}>
              <label>{projectDetails.fields.fullName.label}</label>
              <input
                type="text"
                name="fullName"
                className={styles.input}
                placeholder={projectDetails.fields.fullName.placeholder}
                onChange={handleChange}
                value={formData.fullName}
                required
              />
            </div>

            {/* الإمارة */}
            <div className={styles.field}>
              <label>{projectDetails.fields.emirate.label}</label>
              <select
                name="emirate"
                className={styles.select}
                onChange={handleChange}
                value={formData.emirate}
                required
              >
                <option value="">
                  {projectDetails.fields.emirate.placeholder}
                </option>
                {projectDetails.fields.emirate.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* المنطقة السكنية */}
            <div className={styles.field}>
              <label>{projectDetails.fields.area.label}</label>
              <input
                type="text"
                name="area"
                className={styles.input}
                placeholder={projectDetails.fields.area.placeholder}
                onChange={handleChange}
                value={formData.area}
              />
            </div>

            {/* رقم الأرض */}
            <div className={styles.field}>
              <label>{projectDetails.fields.plotNumber.label}</label>
              <input
                type="text"
                name="plotNumber"
                className={styles.input}
                placeholder={projectDetails.fields.plotNumber.placeholder}
                onChange={handleChange}
                value={formData.plotNumber}
              />
            </div>

            {/* الجوال */}
            <div className={styles.field}>
              <label>{projectDetails.fields.phone.label}</label>
              <input
                type="tel"
                name="phone"
                className={styles.input}
                placeholder={projectDetails.fields.phone.placeholder}
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className={styles.field}>
              <label>{projectDetails.fields.email.label}</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                placeholder={projectDetails.fields.email.placeholder}
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            {/* الميزانية التقديرية */}
            <div className={styles.field}>
              <label>{projectDetails.fields.budget.label}</label>
              <select
                name="budget"
                className={styles.select}
                onChange={handleChange}
                value={formData.budget}
              >
                <option value="">
                  {projectDetails.fields.budget.placeholder}
                </option>
                {projectDetails.fields.budget.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* الجدول الزمني */}
            <div className={styles.field}>
              <label>{projectDetails.fields.timeline.label}</label>
              <select
                name="timeline"
                className={styles.select}
                onChange={handleChange}
                value={formData.timeline}
              >
                <option value="">
                  {projectDetails.fields.timeline.placeholder}
                </option>
                {projectDetails.fields.timeline.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>{packages.title}</h2>
          <div className={styles.packageGrid}>
            {[...packages.options].reverse().map((pkg) => {
              const isSelected = formData.plan === pkg.id;
              let cardClass = `${styles.packageCard} ${isSelected ? (pkg.isElite ? styles.selectedElite : styles.selected) : ""} ${pkg.isPopular ? styles.popular : ""}`;
              return (
                <label key={pkg.id} className={cardClass}>
                  <input
                    type="radio"
                    name="plan"
                    value={pkg.id}
                    className={styles.hiddenRadio}
                    onChange={handleChange}
                    checked={isSelected}
                  />
                  {pkg.badge && (
                    <div
                      className={`${styles.badge} ${pkg.isElite ? styles.badgeElite : styles.badgePopular}`}
                    >
                      {pkg.badge}
                    </div>
                  )}
                  <h3 className={pkg.isElite ? styles.eliteTitle : ""}>
                    {pkg.title}
                  </h3>
                  <div className={styles.priceRange}>{pkg.price}</div>
                </label>
              );
            })}
          </div>

          <h2 className={styles.sectionTitle}>{addons.title}</h2>
          <div className={styles.addonGrid}>
            {addons.options
              .filter(
                (opt) => currentPlanIndex >= planOrder.indexOf(opt.minPlan),
              )
              .map((opt) => (
                <div key={opt.id} className={styles.addonBox}>
                  <span className={styles.addonLabel}>{opt.label}</span>
                  <div className={styles.checkMark}>✓</div>
                </div>
              ))}
          </div>

          {statusMessage && (
            <div className={styles.statusMessage}>{statusMessage}</div>
          )}

          <div className={styles.btnContainer}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "جاري الإرسال..." : submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizePackageForm;
