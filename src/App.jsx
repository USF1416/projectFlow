import { useMemo, useState } from "react";
import AppRouter from "./router/AppRouter";
import { users, projects, issues as seedIssues } from "./data/seed";

export default function App() {
  // État global des issues
  // → source de vérité pour tout le projet
  const [issues, setIssues] = useState(seedIssues);

  // Identifiant de l’issue actuellement ouverte dans la modal
  // null = aucune modal ouverte
  const [modalIssueId, setModalIssueId] = useState(null);

  // Ouvre la modal pour une issue donnée
  const openIssue = (id) => setModalIssueId(id);

  // Ferme la modal
  const closeIssue = () => setModalIssueId(null);

  // Met à jour une issue (édition depuis la modal)
  // patch = uniquement les champs modifiés
  const updateIssue = (id, patch) => {
    setIssues((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    );
  };

  // Issue actuellement affichée dans la modal
  // useMemo évite de recalculer inutilement
  const modalIssue = useMemo(
    () => issues.find((i) => i.id === modalIssueId) || null,
    [issues, modalIssueId],
  );

  // Toutes les données + actions sont passées au router
  // → évite le prop drilling anarchique
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
