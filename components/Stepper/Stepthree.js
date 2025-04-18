import React from "react";
import styled from "styled-components";

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function StepThree({ formData }) {
  return (
    <StepContainer>
      <h2 style={{ marginTop: "30px", color: "#545454" }}>
        Step 3: Review & Confirm
      </h2>
      <p style={{ color: "#545454" }}>
        <strong>Name:</strong> {formData.name}
      </p>
      <p style={{ color: "#545454" }}>
        <strong>Phone Number:</strong> {formData.phone}
      </p>
      <p style={{ color: "#545454" }}>
        <strong>Appointment Date:</strong> {formData.appointmentDate}
      </p>{" "}
      <p style={{ color: "#545454" }}>
        <strong>branch:</strong> {formData.branch}
      </p>{" "}
      <p style={{ color: "#545454" }}>
        <strong>service:</strong> {formData.inquiry}
      </p>
      {/* Show other fields and a final summary as needed */}
    </StepContainer>
  );
}
