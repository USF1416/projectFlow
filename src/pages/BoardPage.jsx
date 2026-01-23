import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import IssueModal from "../components/IssueModal";

export default function BoardPage({ data }) {
  const { projectId } = useParams();

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

  const project = projects.find((p) => p.id === projectId);

  const projectIssues = useMemo(() => {
    return issues.filter((i) => i.projectId === projectId);
  }, [issues, projectId]);

  const byStatus = useMemo(() => {
    return {
      todo: projectIssues.filter((i) => i.status === "todo"),
      in_progress: projectIssues.filter((i) => i.status === "in_progress"),
      done: projectIssues.filter((i) => i.status === "done"),
    };
  }, [projectIssues]);

  const userById = (id) => users.find((u) => u.id === id);

  if (!project) {
    return (
      <Card title="Project not found">
        <p style={{ color: "var(--color-muted)" }}>
          Le projet demandé n’existe pas.
        </p>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="board-header">
        <div>
          <h1 style={{ fontSize: 24 }}>{project.name}</h1>
          <p style={{ color: "var(--color-muted)", marginTop: 6 }}>
            {project.description}
          </p>
        </div>
      </div>

      <div className="board-grid">
        <Column title="To Do" items={byStatus.todo}>
          {byStatus.todo.length ? (
            byStatus.todo.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyColumn />
          )}
        </Column>

        <Column title="In Progress" items={byStatus.in_progress}>
          {byStatus.in_progress.length ? (
            byStatus.in_progress.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyColumn />
          )}
        </Column>

        <Column title="Done" items={byStatus.done}>
          {byStatus.done.length ? (
            byStatus.done.map((it) => (
              <IssueCard
                key={it.id}
                issue={it}
                assignee={userById(it.assigneeId)}
                onOpen={openIssue}
              />
            ))
          ) : (
            <EmptyColumn />
          )}
        </Column>
      </div>

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

function IssueCard({ issue, assignee, onOpen }) {
  return (
    <div
      className="issue-card"
      onClick={() => onOpen(issue.id)}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(issue.id);
      }}
    >
      <div className="issue-top">
        <span className="issue-small">{issue.id}</span>
        <Badge kind={priorityKind(issue.priority)}>
          {labelPriority(issue.priority)}
        </Badge>
      </div>

      <p className="issue-title">{issue.title}</p>

      <div className="issue-footer">
        <span className="issue-small">{labelStatus(issue.status)}</span>
        <div className="mini-avatar" title={assignee?.name}>
          {assignee?.initials || "?"}
        </div>
      </div>
    </div>
  );
}

function EmptyColumn() {
  return (
    <Card>
      <p style={{ color: "var(--color-muted)" }}>No issues in this column.</p>
    </Card>
  );
}

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
