"use client";
import React from "react";
import styled from "styled-components";

const Button = ({
  children,
  variant = "secondary",
  icon,
  onClick,
  ...props
}) => {
  return (
    <ButtonContainer variant={variant} onClick={onClick} {...props}>
      <ButtonText variant={variant}>{children}</ButtonText>
      {icon && <ButtonIcon src={icon} alt="" />}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  display: flex;
  min-height: 40px;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  padding: 12px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "primary" ? "#66a109" : "#f8f8f8"};
  color: ${(props) => (props.variant === "primary" ? "#fff" : "#19191b")};
  width: ${(props) => (props.variant === "primary" ? "140px" : "auto")};

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #66a109;
    outline-offset: 2px;
  }
`;

const ButtonText = styled.span`
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  color: ${(props) => (props.variant === "primary" ? "#fff" : "#19191b")};
`;

const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

export default Button;
