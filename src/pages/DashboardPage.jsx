import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

export default function DashboardPage({ data }) {
  const { issues } = data;

  const total = issues.length;
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const completed = issues.filter((i) => i.status === "done").length;

  // Overdue: V1 fake, on prend une valeur statique ou on met 0
  const overdue = 7; // comme sur le visuel, mais volontairement statique

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 24 }}>Dashboard</h1>
        <p style={{ color: "var(--color-muted)", marginTop: 6 }}>
          Welcome back. Here’s what’s happening today.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Issues"
          value={total}
          hint="+12 from last week"
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          hint="+5 from last week"
        />
        <StatCard
          title="Completed"
          value={completed}
          hint="+18 from last week"
        />
        <StatCard
          title="Overdue"
          value={overdue}
          hint="-3 from last week"
          danger
        />
      </div>

      <Card
        title="Recent Issues"
        right={
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              variant="secondary"
              onClick={() => alert("V1: modal plus tard")}
            >
              New Issue
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert("V1: page plus tard")}
            >
              View all
            </Button>
          </div>
        }
      >
        <div style={{ display: "grid", gap: 10 }}>
          {issues.map((issue) => (
            <div key={issue.id} className="issue-row">
              <div className="issue-left">
                <span className="issue-id">{issue.id}</span>
                <span className="issue-title">{issue.title}</span>
              </div>

              <div className="badges">
                <Badge kind={priorityKind(issue.priority)}>
                  {labelPriority(issue.priority)}
                </Badge>
                <Badge kind={statusKind(issue.status)}>
                  {labelStatus(issue.status)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatCard({ title, value, hint, danger = false }) {
  return (
    <Card title={title}>
      <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>{value}</div>
      <div
        style={{
          marginTop: 8,
          fontSize: 13,
          color: danger ? "var(--color-danger)" : "var(--color-muted)",
        }}
      >
        {hint}
      </div>
    </Card>
  );
}

function statusKind(s) {
  if (s === "done") return "success";
  if (s === "in_progress") return "warning";
  return "muted";
}

function priorityKind(p) {
  if (p === "high") return "warning";
  if (p === "medium") return "muted";
  return "muted";
}

function labelStatus(s) {
  if (s === "in_progress") return "In Progress";
  if (s === "done") return "Done";
  return "To Do";
}

function labelPriority(p) {
  if (p === "high") return "High";
  if (p === "medium") return "Medium";
  return "Low";
}
