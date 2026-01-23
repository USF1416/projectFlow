export default function Input({ label, error, help, ...props }) {
  return (
    <div className="field">
      {label ? <label className="label">{label}</label> : null}
      <input className="input" {...props} />
      {/* Affichage conditionnel des messages */}
      {error ? (
        <div className="error">{error}</div>
      ) : help ? (
        <div className="help">{help}</div>
      ) : null}
    </div>
  );
}
