"use client";
import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
  min-height: 100px;
`;

const Label = styled.label`
  color: ${(props) =>
    props.variant === "dark" ? "rgba(0, 0, 0, 1)" : "rgba(141, 141, 141, 1)"};
  font-size: 18px;
  line-height: 2;
  font-family: 'Inter' ;
  font-weight: 500;
  
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(141, 141, 141, 0.25);
  padding: 8px 0;
  font-size: 14px;
  font-family: 'Inter' ;
  color: rgba(141, 141, 141, 1);

  &:focus {
    outline: none;
    border-bottom-color: rgba(102, 161, 9, 1);
  }
`;

const StyledTextarea = styled.textarea`
  border: none;
  border-bottom: 1px solid rgba(141, 141, 141, 0.25);
  padding: 8px 0;
  font-size: 14px;
  font-family: 'Inter' ;
  color: rgba(141, 141, 141, 1);
  resize: vertical;
  min-height: 200px;

  &:focus {
    outline: none;
    border-bottom-color: rgba(102, 161, 9, 1);
  }
`;



const SubmitButton = styled.button`
  border-radius: 5px;
  background-color: rgba(102, 161, 9, 1);
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.12);
  align-self: flex-start;
  margin-top: 44px;
  padding: 15px 48px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(92, 145, 8, 1);
  }

  @media (max-width: 991px) {
    padding: 15px 20px;
    margin-top: 40px;
  }
`;

export const FormInput = ({ label, ...props }) => (
  <InputWrapper>
    <Label>{label}</Label>
    <StyledInput {...props} />
  </InputWrapper>
);

export const FormTextarea = ({ label, ...props }) => (
  <InputWrapper>
    <Label>{label}</Label>
    <StyledTextarea {...props} />
  </InputWrapper>
);



export { SubmitButton };
