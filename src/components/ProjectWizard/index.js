import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Container,
  Stepper,
  FormContainer,
  StepContainer,
  Title,
  Inputs,
} from "./styles";
import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addProject } from "../slice";
import { post } from "../../utils/postMock";
import { useNavigate } from "react-router-dom";

import STEPS from "./stepsConfig";

const ProjectWizard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [area, setArea] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const inputRef = useRef(null);

  const formValues = {
    name,
    description,
    startDate,
    endDate,
    area,
  };

  const handleLoaderChange = (inputEvent) => {
    const fileReader = new FileReader();
    fileReader.readAsText(inputEvent.target.files[0], "UTF-8");
    fileReader.onload = (onloadEvent) => {
      const area = onloadEvent.target.result;

      const { isValid, errorMessage } = STEPS[step].validate({
        area,
      });

      if (isValid) {
        setFileName(inputEvent.target.files[0].name);
        setArea(onloadEvent.target.result);
        setErrors({});
      } else {
        setErrors({ area: { isValid, errorMessage } });
      }
    };
  };

  useEffect(() => {
    if (showErrors) {
      const { isValid, errorMessage } = STEPS[step].validate(formValues);

      setErrors({ [STEPS[step].id]: { isValid, errorMessage } });
    }
  }, [name, description, startDate, endDate, area]);

  const submitForm = () => {
    post("/add-project", formValues)
      .then((response) => {
        if (response) {
          dispatch(
            addProject({
              form: {
                ...formValues,
                startDate: startDate.format("DD/MM/YYYY"),
                endDate: endDate.format("DD/MM/YYYY"),
              },
            })
          );
          navigate("/project-dashboard");
        }
      })
      .catch((error) => {
        alert(
          `Error: ${error.message}. We couldn't create the project. Please try again.`
        );
      });
  };

  const isLastStep = STEPS.length === step + 1;

  const handleConfirm = () => {
    setShowErrors(true);

    const { isValid, errorMessage } = STEPS[step].validate(formValues);

    if (isValid) {
      setShowErrors(false);
      isLastStep ? submitForm() : setStep(step + 1);
    } else {
      setErrors({ [STEPS[step].id]: { isValid, errorMessage } });
    }
  };

  return (
    <Container>
      <Stepper activeStep={step} alternativeLabel>
        {STEPS.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormContainer>
        <Inputs>
          <Title>{STEPS[step].title}</Title>
          <StepContainer>
            {STEPS[step].component(
              {
                setName,
                setDescription,
                setStartDate,
                setEndDate,
                setArea,
                setFileName,
              },
              { startDate, endDate, fileName },
              errors,
              inputRef,
              handleLoaderChange
            )}
          </StepContainer>
        </Inputs>

        <Button onClick={handleConfirm} size="large" variant="contained">
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default ProjectWizard;
