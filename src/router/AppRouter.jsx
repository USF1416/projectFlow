import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import BoardPage from "../pages/BoardPage.jsx";
import AppLayout from "../components/layout/AppLayout.jsx";

export default function AppRouter({ data }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage data={data} />} />
        <Route path="/projects" element={<ProjectsPage data={data} />} />
        <Route path="/board/:projectId" element={<BoardPage data={data} />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
