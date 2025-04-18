"use client";
import styled from "styled-components";

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
  }

  &:hover {
    border-color: #333;
  }

  &[aria-invalid="true"] {
    border-color: #dc3545;
  }
`;

export const FormLabel = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
  }

  &:hover {
    border-color: #333;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
  }

  &:hover {
    border-color: #333;
  }

  &[aria-invalid="true"] {
    border-color: #dc3545;
  }
`;

export const FormButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  cursor: pointer;
  background-color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.2);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  font-family: "Inter", sans-serif;
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  padding: 16px;
  border-radius: 4px;
  background-color: #d4edda;
  margin-bottom: 16px;
  font-family: "Inter", sans-serif;
`;
