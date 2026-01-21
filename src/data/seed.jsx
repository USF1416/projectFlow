export const users = [
  { id: "u1", name: "John Doe", initials: "JD" },
  { id: "u2", name: "Ines K.", initials: "IK" },
  { id: "u3", name: "Mehdi A.", initials: "MA" },
];

export const projects = [
  {
    id: "p1",
    name: "Analytics Dashboard",
    code: "ANA",
    description:
      "Real-time business intelligence dashboard with data visualization and reporting features.",
    progress: 78,
    team: ["u1", "u2"],
  },
  {
    id: "p2",
    name: "API Development",
    code: "API",
    description:
      "Building RESTful APIs and microservices architecture for backend infrastructure.",
    progress: 45,
    team: ["u1", "u3"],
  },
  {
    id: "p3",
    name: "Customer Portal",
    code: "CUS",
    description:
      "Self-service portal for customers to manage accounts, view orders, and access support.",
    progress: 92,
    team: ["u2", "u3"],
  },
];

export const issues = [
  {
    id: "PF-127",
    projectId: "p2",
    title: "Implement user authentication flow",
    status: "in_progress",
    priority: "high",
    assigneeId: "u1",
    description: "Add login and session handling for the app.",
  },
  {
    id: "PF-126",
    projectId: "p3",
    title: "Design dashboard analytics widgets",
    status: "todo",
    priority: "medium",
    assigneeId: "u2",
    description: "Create KPI cards and charts placeholders.",
  },
  {
    id: "PF-125",
    projectId: "p3",
    title: "Fix mobile navigation menu bug",
    status: "done",
    priority: "high",
    assigneeId: "u3",
    description: "Resolve sidebar collapse issues on small screens.",
  },
  {
    id: "PF-124",
    projectId: "p1",
    title: "Update API documentation",
    status: "done",
    priority: "low",
    assigneeId: "u2",
    description: "Improve README and endpoint descriptions.",
  },
  {
    id: "PF-123",
    projectId: "p3",
    title: "Optimize database queries",
    status: "todo",
    priority: "medium",
    assigneeId: "u1",
    description: "Review query performance and add indexes.",
  },
];

export function getProjectProgress(projectId, issues) {
  // On récupère uniquement les issues liées au projet donné
  const projectIssues = issues.filter((issue) => issue.projectId === projectId);
  // Si pas d'issue, la progression est de 0 %
  if (projectIssues.length === 0) {
    return 0;
  }
  // le nombre d'issues terminées ("done")
  const doneIssuesCount = projectIssues.filter(
    (issue) => issue.status === "done",
  ).length;
  // Math.round permet d'obtenir un nombre entier propre
  const progress = Math.round((doneIssuesCount / projectIssues.length) * 100);
  return progress;
}
