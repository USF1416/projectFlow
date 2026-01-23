import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import IssueModal from "../components/IssueModal";
import Select from "../components/ui/Select";

export default function BoardPage({ data }) {
  // Récupère le projectId depuis l’URL (/board ou /board/:projectId)
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Données globales fournies par App.jsx
  const {
    projects,
    issues,
    users,
    modalIssueId,
    modalIssue,
    openIssue,
    closeIssue,
    updateIssue,
  } = data;

  // État local : filtre projet (all ou id d’un projet)
  const [selectedProjectId, setSelectedProjectId] = useState(
    projectId || "all"
  );

  // Synchronise le select avec l’URL si l’utilisateur navigue
  useEffect(() => {
    setSelectedProjectId(projectId || "all");
  }, [projectId]);

  // Projet sélectionné (ou null si "all")
  const selectedProject = useMemo(() => {
    if (selectedProjectId === "all") return null;
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Issues visibles selon le filtre
  const visibleIssues = useMemo(() => {
    if (selectedProjectId === "all") return issues;
    return issues.filter((i) => i.projectId === selectedProjectId);
  }, [issues, selectedProjectId]);

  // Regroupement des issues par statut (Kanban)
  const byStatus = useMemo(() => {
    return {
      todo: visibleIssues.filter((i) => i.status === "todo"),
      in_progress: visibleIssues.filter((i) => i.status === "in_progress"),
      done: visibleIssues.filter((i) => i.status === "done"),
    };
  }, [visibleIssues]);

  // Helpers pour retrouver un user ou un projet
  const userById = (id) => users.find((u) => u.id === id);
  const projectById = (id) => projects.find((p) => p.id === id);

  // Gestion du changement de filtre
  // → met à jour l’URL pour garder une navigation cohérente
  const onFilterChange = (value) => {
    setSelectedProjectId(value);
    if (value === "all") navigate("/board");
    else navigate(`/board/${value}`);
  };

  // Sécurité : aucun projet existant
  if (!projects.length) {
    return (
      <EmptyState
        title="No projects"
        description="Create a project first to manage issues."
      />
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* En-tête du board */}
      <div className="board-header">
        <div>
          <h1 style={{ fontSize: 24 }}>
            {selectedProject ? selectedProject.name : "Board"}
          </h1>
          <p style={{ color: "var(--color-muted)", marginTop: 6 }}>
            {selectedProject
              ? selectedProject.description
              : "All issues across all projects."}
          </p>
        </div>

        {/* Filtre projet */}
        <div style={{ width: 260 }}>
          <Select
            label="Filter by project"
            value={selectedProjectId}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Colonnes Kanban */}
      <div className="board-grid">
        <Column title="To Do" items={byStatus.todo}>
          {byStatus.todo.length ? (
            byStatus.todo.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                project={projectById(it.projectId)}
                showProject={selectedProjectId === "all"}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyState title="No issues" description="Nothing to do here." />
          )}
        </Column>

        <Column title="In Progress" items={byStatus.in_progress}>
          {byStatus.in_progress.length ? (
            byStatus.in_progress.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                project={projectById(it.projectId)}
                showProject={selectedProjectId === "all"}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyState title="No issues" description="Nothing in progress." />
          )}
        </Column>

        <Column title="Done" items={byStatus.done}>
          {byStatus.done.length ? (
            byStatus.done.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                project={projectById(it.projectId)}
                showProject={selectedProjectId === "all"}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyState title="No issues" description="Nothing completed yet." />
          )}
        </Column>
      </div>

      {/* Modal d’édition d’issue */}
      {modalIssueId && modalIssue ? (
        <IssueModal
          issue={modalIssue}
          users={users}
          onClose={closeIssue}
          onSave={(patch) => {
            updateIssue(modalIssue.id, patch);
            closeIssue();
          }}
        />
      ) : null}
    </div>
  );
}

/* Composants internes */

function Column({ title, items, children }) {
  return (
    <div>
      <div className="column-title">
        <strong>{title}</strong>
        <Badge kind="muted">{items.length}</Badge>
      </div>
      <div style={{ display: "grid", gap: 12 }}>{children}</div>
    </div>
  );
}

function IssueCard({ issue, assignee, project, showProject, onOpen }) {
  return (
    <div
      className="issue-card"
      onClick={() => onOpen(issue.id)}
      style={{ cursor: "pointer" }}
    >
      <div className="issue-top">
        <span className="issue-small">{issue.id}</span>
        <Badge kind={priorityKind(issue.priority)}>
          {labelPriority(issue.priority)}
        </Badge>
      </div>

      <p className="issue-title">{issue.title}</p>

      <div className="issue-footer">
        <div>
          <span className="issue-small">{labelStatus(issue.status)}</span>
          {showProject && project ? (
            <div className="issue-small" style={{ color: "var(--color-muted)" }}>
              {project.name}
            </div>
          ) : null}
        </div>

        <div className="mini-avatar" title={assignee?.name}>
          {assignee?.initials || "?"}
        </div>
      </div>
    </div>
  );
}

/* Helpers d’affichage */

function labelStatus(s) {
  if (s === "in_progress") return "In Progress";
  if (s === "done") return "Done";
  return "To Do";
}

function priorityKind(p) {
  if (p === "high") return "warning";
  if (p === "medium") return "muted";
  return "muted";
}

function labelPriority(p) {
  if (p === "high") return "High";
  if (p === "medium") return "Medium";
  return "Low";
}
