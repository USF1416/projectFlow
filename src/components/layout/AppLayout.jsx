import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    // Layout commun des pages privées : sidebar + topbar + contenu
    <div className="layout">
      {/* Navigation principale */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Zone principale */}
      <div className="shell">
        {/* Barre du haut : titre, recherche, profil */}
        <header className="topbar">
          <Topbar />
        </header>

        {/* Contenu de la route courante (injecté par React Router) */}
        <main className="content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
