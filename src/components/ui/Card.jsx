export default function Card({ title, right, children, footer }) {
  return (
    <section className="card">
      {title ? (
        <div className="card__header">
          <h2 style={{ fontSize: 18 }}>{title}</h2>
          {right || null}
        </div>
      ) : null}

      <div className="card__body">{children}</div>

      {footer ? <div className="card__footer">{footer}</div> : null}
    </section>
  );
}
