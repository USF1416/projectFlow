export default function Select({ label, error, help, children, ...props }) {
  return (
    <div className="field">
      {label ? <label className="label">{label}</label> : null}

      {/* IMPORTANT : un select est un <select>, pas un <input> */}
      <select className="select" {...props}>
        {children}
      </select>

      {error ? (
        <div className="error">{error}</div>
      ) : help ? (
        <div className="help">{help}</div>
      ) : null}
    </div>
  );
}
