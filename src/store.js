import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./components/slice";

export default configureStore({
  reducer: {
    project: projectReducer,
  },
});
