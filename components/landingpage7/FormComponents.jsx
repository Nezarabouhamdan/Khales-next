import React from "react";
import {
  StyledInput,
  StyledSelect,
  StyledButton,
  FormGroup,
  Label,
} from "./StyledComponents";

export const FormInput = ({ label, id, type = "text", ...props }) => (
  <FormGroup>
    <Label htmlFor={id}>{label}</Label>
    <StyledInput type={type} id={id} {...props} />
  </FormGroup>
);

export const FormSelect = ({
  label,
  id,
  options,
  placeholder = "Services Interested In",
  ...props
}) => (
  <FormGroup>
    {label && <Label htmlFor={id}>{label}</Label>}
    <StyledSelect id={id} {...props}>
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  </FormGroup>
);

export const FormButton = ({ children, ...props }) => (
  <StyledButton type="submit" {...props}>
    {children}
  </StyledButton>
);
