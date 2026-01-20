import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <div className="shell">
        <header className="topbar">
          <Topbar />
        </header>

        <main className="content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
