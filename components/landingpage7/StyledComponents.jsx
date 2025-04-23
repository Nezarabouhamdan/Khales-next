import styled from "styled-components";

export const SplitLayout = styled.main`
  max-width: none;
  margin: 0;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 80vh;
  background-color: #30302e;
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 991px) {
    max-width: 991px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 640px) {
    max-width: 640px;
  }
`;

export const WelcomeSection = styled.section`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
`;

export const WelcomeText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 36px;
  color: #fff;
  line-height: 1.2;
  text-align: left;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

export const FormContainer = styled.section`
  width: 50%;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    width: 80%;
  }
`;

export const FormCard = styled.form`
  width: 366px;
  height: 448px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* This centers horizontally */
  justify-content: center; /* This centers vertically */
  padding: 25px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 2px 4px #423f32;
  gap: 20px; /* Adds consistent spacing between elements */

  @media (max-width: 991px) {
    width: 80%;
    height: auto;
    padding: 20px;
  }

  @media (max-width: 640px) {
    width: 90%;
    padding: 15px;
  }
`;

const baseFieldStyles = `
  width: 236px;
  height: 50px;
  border: 1px solid #423f32;
  background-color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  padding: 0 15px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color:#66a109;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 10px;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 40px;
  }
`;

export const StyledInput = styled.input`
  ${baseFieldStyles}
  text-align: center; /* Center both placeholder and user input */

  &::placeholder {
    text-align: center;
    color: #999;
    opacity: 1;
  }

  /* Vendor prefixes */
  &::-webkit-input-placeholder {
    text-align: center;
  }
  &:-moz-placeholder {
    text-align: center;
  }
  &::-moz-placeholder {
    text-align: center;
  }
  &:-ms-input-placeholder {
    text-align: center;
  }
`;

export const StyledSelect = styled.select`
  ${baseFieldStyles}
  text-align: center; /* Center the select text */
  text-align-last: center; /* Center the selected option */
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml...");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 12px;
  padding-right: 45px;
`;
export const StyledButton = styled.button`
  ${baseFieldStyles}
  text-align: center; /* Center button text */
  background-color: #30302e;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444442;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(48, 48, 46, 0.2);
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the content horizontally */
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  text-align: center; /* Center the label text */
  margin-bottom: 5px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #423f32;
`;
