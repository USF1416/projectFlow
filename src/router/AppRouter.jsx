import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import BoardPage from "../pages/BoardPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
