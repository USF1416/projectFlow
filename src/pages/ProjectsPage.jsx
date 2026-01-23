import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getProjectProgress } from "../data/seed";

export default function ProjectsPage({ data }) {
  // Données globales injectées depuis App.jsx
  // → la page ne stocke pas de données métier
  const { projects, users, issues } = data;

  const navigate = useNavigate();

  // Helper local: retrouver un utilisateur
  const userById = (id) => users.find((u) => u.id === id);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Header */}
      <div className="projects-header">
        <div>
          <h1 style={{ fontSize: 24 }}>Projects</h1>
          <p style={{ color: "var(--color-muted)", marginTop: 6 }}>
            Manage your active projects and track their progress.
          </p>
        </div>

        {/* Action V1 : visuelle (pas de création projet pour l’instant) */}
        <Button variant="secondary" onClick={() => {}}>
          New Project
        </Button>
      </div>

      {/* Grille de cards projets */}
      <div className="projects-grid">
        {projects.map((p) => {
          // Progress = donnée dérivée (calculée à l’affichage)
          // → évite de stocker une valeur qui peut devenir incohérente
          const progress = getProjectProgress(p.id, issues);

          return (
            <Card
              key={p.id}
              title={p.name}
              right={
                <span style={{ fontSize: 13, color: "var(--color-muted)", fontWeight: 600 }}>
                  {p.code}
                </span>
              }
              footer={
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* Navigation vers board filtré sur ce projet */}
                  <Button variant="secondary" onClick={() => navigate(`/board/${p.id}`)}>
                    Open
                  </Button>
                </div>
              }
            >
              <div style={{ display: "grid", gap: 14 }}>
                <p style={{ color: "var(--color-muted)", lineHeight: 1.4 }}>
                  {p.description}
                </p>

                {/* Progress bar */}
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--color-muted)" }}>Progress</span>
                    <strong>{progress}%</strong>
                  </div>
                  <div className="progress">
                    <div className="progress__bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Team avatars */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--color-muted)", fontSize: 13 }}>Team</span>
                  <div className="team">
                    {p.team?.map((uid) => {
                      const u = userById(uid);
                      return (
                        <div key={uid} className="avatar" title={u?.name}>
                          {u?.initials || "?"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
