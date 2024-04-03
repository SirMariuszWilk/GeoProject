import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    form: null,
  },
  reducers: {
    addProject: (state, action) => {
      console.log("action", action);
      state.form = action.payload.form;
    },
  },
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;
