// StepThree.js (Corrected)

import React from "react";
import styled from "styled-components";

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Adjusted gap for better spacing */
`;

const FieldRow = styled.p`
  color: #545454;
  margin: 0;
  font-size: 1rem;
`;

// Default content to prevent errors if the prop isn't passed
const defaultContent = {
  title: "Review & Confirm",
  fields: {
    name: "Name",
    phone: "Phone Number",
    date: "Appointment Date",
    branch: "Branch",
    service: "Service",
  },
};

export default function StepThree({ formData, content = defaultContent }) {
  // --- FIX 1: Accept the 'content' prop here ---

  return (
    <StepContainer>
      {/* --- FIX 2: Use the title from the content prop --- */}
      <h2 style={{ marginTop: "30px", color: "#545454" }}>{content.title}</h2>

      {/* --- FIX 3: Use the field labels from the content prop --- */}
      <FieldRow>
        <strong>{content.fields.name}:</strong> {formData.name}
      </FieldRow>

      <FieldRow>
        <strong>{content.fields.phone}:</strong> {formData.phone}
      </FieldRow>

      <FieldRow>
        <strong>{content.fields.date}:</strong> {formData.appointmentDate}
      </FieldRow>

      <FieldRow>
        <strong>{content.fields.branch}:</strong> {formData.branch}
      </FieldRow>

      <FieldRow>
        <strong>{content.fields.service}:</strong> {formData.inquiry}
      </FieldRow>
    </StepContainer>
  );
}
