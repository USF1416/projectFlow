import { useState } from "react";
import AppRouter from "./router/AppRouter";
import { users, projects, issues as seedIssues } from "./data/seed";

export default function App() {
  const [issues, setIssues] = useState(seedIssues);

  return (
    <AppRouter
      data={{
        users,
        projects,
        issues,
        setIssues,
      }}
    />
  );
}
