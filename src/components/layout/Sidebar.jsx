import { NavLink } from "react-router-dom";

export default function Sidebar() {
  function SideLink({ to, label }) {
    return (
      <NavLink
        to={to}
        style={({ isActive }) => ({
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--color-border)",
          background: isActive ? "rgba(37,99,235,0.10)" : "transparent",
          color: isActive ? "var(--color-primary)" : "var(--color-text)",
          fontWeight: 600,
        })}
      >
        {label}
      </NavLink>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: "rgba(37, 99, 235, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            color: "var(--color-primary)",
          }}
        >
          PF
        </div>
        <strong>ProjectFlow</strong>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SideLink to="/dashboard" label="Dashboard" />
        <SideLink to="/projects" label="Projects" />
        <SideLink to="/board" label="Board" />
      </nav>

      <div
        style={{ marginTop: "auto", fontSize: 13, color: "var(--color-muted)" }}
      >
        Version démo
      </div>
    </div>
  );
}
