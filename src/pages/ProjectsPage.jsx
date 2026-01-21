import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getProjectProgress } from "../data/seed";

export default function ProjectsPage({ data }) {
  const { projects, users, issues } = data;
  const navigate = useNavigate();

  const userById = (id) => users.find((u) => u.id === id);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="projects-grid">
        {projects.map((p) => {
          const progress = getProjectProgress(p.id, issues);

          return (
            <Card
              key={p.id}
              title={p.name}
              footer={
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/board/${p.id}`)}
                  >
                    Open
                  </Button>
                </div>
              }
            >
              <div style={{ display: "grid", gap: 14 }}>
                <p style={{ color: "var(--color-muted)", lineHeight: 1.4 }}>
                  {p.description}
                </p>

                <div style={{ display: "grid", gap: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "var(--color-muted)" }}>
                      Progress
                    </span>
                    <strong>{progress}%</strong>
                  </div>
                  <div className="progress">
                    <div
                      className="progress__bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--color-muted)", fontSize: 13 }}>
                    Team
                  </span>
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
