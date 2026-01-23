import { useMemo, useState } from "react";
import AppRouter from "./router/AppRouter";
import { users, projects, issues as seedIssues } from "./data/seed";

export default function App() {
  const [issues, setIssues] = useState(seedIssues);

  // Modal state
  const [modalIssueId, setModalIssueId] = useState(null);

  const openIssue = (id) => setModalIssueId(id);
  const closeIssue = () => setModalIssueId(null);

  const updateIssue = (id, patch) => {
    setIssues((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    );
  };

  const modalIssue = useMemo(
    () => issues.find((i) => i.id === modalIssueId) || null,
    [issues, modalIssueId],
  );

  return (
    <AppRouter
      data={{
        users,
        projects,
        issues,
        setIssues,
        modalIssueId,
        modalIssue,
        openIssue,
        closeIssue,
        updateIssue,
      }}
    />
  );
}
