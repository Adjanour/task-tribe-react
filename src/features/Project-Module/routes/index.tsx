import { Route, Routes } from "react-router-dom";
import { ProjectCreatePage } from "@/features/Project-Module/routes/Main";
import ProjectPage from "@/features/Project-Module/routes/Project";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="all" element={<ProjectCreatePage />} />
      <Route
        path="/:projectId"
        element={<ProjectPage />} 
        
      />
    </Routes>
  );
};
