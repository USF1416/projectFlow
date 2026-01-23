import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();

  // État du formulaire (demo)
  const [email, setEmail] = useState("john@projectflow.dev");
  const [password, setPassword] = useState("demo");

  // UX: loading + message d'erreur
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Soumission du formulaire
  // Ici : login simulé (pas de backend), l'objectif est de démontrer l'UX + navigation
  const submit = (e) => {
    e.preventDefault();
    setError("");

    // Validation minimale (portfolio)
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    // Simulation d'appel serveur
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Après "auth", on redirige vers l'app
      navigate("/dashboard");
    }, 800);
  };

  return (
    // Page centrée avec un fond léger (style SaaS)
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "radial-gradient(1200px 600px at 30% 10%, rgba(37,99,235,0.12), transparent 55%), var(--color-bg)",
      }}
    >
      <div style={{ width: "min(420px, 100%)" }}>
        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              background: "rgba(37, 99, 235, 0.12)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              color: "var(--color-primary)",
            }}
          >
            PF
          </div>
          <div>
            <strong style={{ fontSize: 16 }}>ProjectFlow</strong>
            <div style={{ fontSize: 13, color: "var(--color-muted)" }}>
              Sign in to continue
            </div>
          </div>
        </div>

        {/* Carte principale */}
        <Card title="Login">
          <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Erreur lisible, pas d'alert() */}
            {error ? (
              <div
                style={{
                  color: "var(--color-danger)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            ) : null}

            {/* Bouton avec état loading */}
            <Button disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div
              style={{
                fontSize: 13,
                color: "var(--color-muted)",
                marginTop: 6,
              }}
            >
              Demo login. No real authentication.
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
