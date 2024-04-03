import styled from "styled-components";
import { default as StepperMui } from "@mui/material/Stepper";
import { default as TextFieldMui } from "@mui/material/TextField";

export const Stepper = styled(StepperMui)`
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 460px;
  align-items: center;
  height: 100%;

  > button {
    width: 160px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-weight: 600;
    font-size: 16px;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 0px 120px 0;
  box-sizing: border-box;
  gap: 120px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Dates = styled.div`
  display: flex;
`;

export const TextField = styled(TextFieldMui)`
  width: 100%;

  > div {
    width: 100%;
  }
`;

export const Hyphen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  margin-right: 12px;
`;

export const Title = styled.div`
  font-family: system-ui;
  font-size: 18px;
  width: 100%;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

  > label {
    width: 160px;
  }
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: left;
  margin-top: 6px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
  width: 100%;
  font-size: 12px;
  font-family: system-ui;
`;

export const ErrorMessageCenter = styled(ErrorMessage)`
  text-align: center;
`;

export const File = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 12px;
  padding-top: 12px;
  color: #1976d2;
`;

export const FileName = styled.div`
  display: flex;
  font-family: system-ui;
`;

export const Delete = styled.div`
  color: #d32f2f;
  cursor: pointer;
  font-size: 18px;
  position: relative;
  top: -1px;

  &:hover {
    color: #f34f4f;
  }
`;
