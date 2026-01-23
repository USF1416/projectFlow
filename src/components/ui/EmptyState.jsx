import Card from "./Card";

export default function EmptyState({
  title = "Nothing here",
  description = "No data available yet.",
}) {
  return (
    <Card title={title}>
      <p style={{ color: "var(--color-muted)" }}>{description}</p>
    </Card>
  );
}
