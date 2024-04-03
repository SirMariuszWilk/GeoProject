import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import {
  Dashboard,
  LeftSeaction,
  RightSection,
  ProjectName,
  ProjectDetails,
  DetailsRow,
  FieldName,
  FieldValue,
  Map,
  NoDataMessage,
} from "./styles.js";
import { useNavigate } from "react-router-dom";

import { loadMap } from "./utils";

const ProjectDashboard = () => {
  const projectForm = useSelector((state) => state.project?.form);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectForm?.area) {
      loadMap(projectForm.area, mapRef.current);
    }
  }, [projectForm?.area]);

  if (!projectForm) {
    return (
      <Dashboard>
        <NoDataMessage>
          No data provided. Go to{" "}
          <span onClick={() => navigate("/")}>project creation</span> to create
          a project.
        </NoDataMessage>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <LeftSeaction>
        <ProjectName>{projectForm.name}</ProjectName>
        <ProjectDetails>
          <DetailsRow>
            <FieldName>Description</FieldName>
            <FieldValue>{projectForm.description || "-"}</FieldValue>
          </DetailsRow>
          <DetailsRow>
            <FieldName>Start date</FieldName>
            <FieldValue>{projectForm.startDate}</FieldValue>
          </DetailsRow>
          <DetailsRow>
            <FieldName>End date</FieldName>
            <FieldValue>{projectForm.endDate}</FieldValue>
          </DetailsRow>
        </ProjectDetails>
      </LeftSeaction>

      <RightSection>
        <Map ref={mapRef} id="map"></Map>
      </RightSection>
    </Dashboard>
  );
};

export default ProjectDashboard;
