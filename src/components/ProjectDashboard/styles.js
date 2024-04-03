import styled from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #edf0f5;
  padding: 32px;
  box-sizing: border-box;
  gap: 36px;
  font-family: system-ui;
`;

export const LeftSeaction = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  flex-direction: column;
  gap: 24px;
  padding-top: 36px;
`;

export const RightSection = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

export const ProjectName = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  gap: 24px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

export const DetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldName = styled.div`
  display: flex;
  width: 100px;
  font-weight: 600;
`;

export const FieldValue = styled.div`
  display: flex;
  flex: 1;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #1976d2;
  border-radius: 4px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.03);
`;

export const NoDataMessage = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 5%;

  > span {
    color: #1976d2;
    cursor: pointer;
  }
`;
