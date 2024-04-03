import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectWizard from "./components/ProjectWizard/index";
import ProjectDashboard from "./components/ProjectDashboard/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectWizard />} />
        <Route path="/project-dashboard" element={<ProjectDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
