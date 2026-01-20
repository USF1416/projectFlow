import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function DashboardPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card
        title="Total Issues"
        right={<Badge kind="success">OK</Badge>}
        footer={<Button variant="secondary">Action</Button>}
      >
        Contenu de test UI kit.
      </Card>
    </div>
  );
}
