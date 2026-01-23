import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import BoardPage from "../pages/BoardPage.jsx";
import AppLayout from "../components/layout/AppLayout.jsx";

export default function AppRouter({ data }) {
  return (
    <Routes>
      {/* Redirection racine → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Page publique */}
      <Route path="/login" element={<LoginPage />} />

      {/* Toutes les pages suivantes partagent le layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage data={data} />} />
        <Route path="/projects" element={<ProjectsPage data={data} />} />

        {/* Board global ou filtré par projet */}
        <Route path="/board" element={<BoardPage data={data} />} />
        <Route path="/board/:projectId" element={<BoardPage data={data} />} />
      </Route>

      {/* Fallback : route inconnue */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
