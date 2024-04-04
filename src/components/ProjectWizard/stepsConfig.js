import {
  TextField,
  Dates,
  Hyphen,
  InputContainer,
  ErrorMessage,
  ErrorMessageCenter,
  FileName,
  Delete,
  File,
} from "./styles";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import gjv from "geojson-validation";
import { isJsonString, sanitizeGeoJSON } from "./utils";

const Error = ({ error, center = false }) => {
  const ErrorComponent = center ? ErrorMessageCenter : ErrorMessage;

  return (
    <ErrorComponent>
      {error?.isValid === false ? error?.errorMessage : null}
    </ErrorComponent>
  );
};

const STEPS = [
  {
    label: "Name",
    title: "Provide project name",
    id: "name",
    validate: ({ name }) => {
      const isString = typeof name === "string";
      const isCorrectLength = name.length >= 1 && name.length <= 32;

      return {
        isValid: isString && isCorrectLength,
        errorMessage: "Provide name of the project",
      };
    },
    component: (setters, values, errors) => {
      return (
        <InputContainer>
          <TextField
            label="Project Name"
            variant="outlined"
            onChange={(e) => setters.setName(e.target.value)}
          />

          <Error error={errors["name"]} />
        </InputContainer>
      );
    },
  },
  {
    label: "Description",
    title: "Provide project description",
    id: "description",
    validate: ({ description }) => ({
      isValid: true,
      errorMessage: null,
    }),
    component: (setters, values, errors) => {
      return (
        <InputContainer>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setters.setDescription(e.target.value)}
          />

          <Error error={errors["description"]} />
        </InputContainer>
      );
    },
  },
  {
    label: "Date Range",
    title: "Provide start date and end date of the project",
    id: "date-range",
    validate: ({ startDate, endDate }) => {
      const areValid = Boolean(startDate?.isValid() && endDate?.isValid());
      const areChronological =
        startDate?.isSame(endDate) || startDate?.isBefore(endDate);

      return {
        isValid: areValid && areChronological,
        errorMessage:
          "Provide valid start date and end date, in the correct order",
      };
    },
    component: (setters, values, errors) => {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <InputContainer>
            <DemoContainer components={["DatePicker"]}>
              <Dates>
                <DemoItem>
                  <DatePicker
                    value={values.startDate}
                    onChange={(newValue) => setters.setStartDate(newValue)}
                  />
                </DemoItem>
                <Hyphen>-</Hyphen>
                <DemoItem>
                  <DatePicker
                    value={values.endDate}
                    onChange={(newValue) => setters.setEndDate(newValue)}
                  />
                </DemoItem>
              </Dates>
            </DemoContainer>

            <Error error={errors["date-range"]} />
          </InputContainer>
        </LocalizationProvider>
      );
    },
  },
  {
    label: "Area of Interest",
    id: "area",
    title: "Provide area of interest by uploading GeoJSON file",
    validate: ({ area }) => ({
      isValid:
        isJsonString(area) && gjv.valid(sanitizeGeoJSON(JSON.parse(area))),
      errorMessage: "Provide a valid geojson file",
    }),
    component: (setters, values, errors, inputRef, handleLoaderChange) => {
      return (
        <InputContainer>
          <Button variant="outlined" component="label">
            Upload File
            <input
              type="file"
              hidden
              ref={inputRef}
              onChange={handleLoaderChange}
            />
          </Button>

          <Error error={errors["area"]} center />

          {values.fileName ? (
            <File>
              <FileName>{values.fileName}</FileName>
              <Delete
                onClick={() => {
                  setters.setArea("");
                  setters.setFileName("");
                  inputRef.current.value = "";
                }}
              >
                &#10005;
              </Delete>
            </File>
          ) : null}
        </InputContainer>
      );
    },
  },
];

export default STEPS;
