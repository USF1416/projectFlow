import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const title = (() => {
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/projects")) return "Projects";
    if (location.pathname.startsWith("/board")) return "Board";
    return "ProjectFlow";
  })();

  return (
    <>
      <div>
        <div style={{ fontSize: 12, color: "var(--color-muted)" }}>ProjectFlow</div>
        <strong>{title}</strong>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          placeholder="Search..."
          className="topbar-search"
          style={{
            width: 260,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        />
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          JD
        </div>
      </div>
    </>
  );
}
