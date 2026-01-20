export default function Badge({ kind = "muted", children }) {
  return <span className={`badge badge--${kind}`}>{children}</span>;
}
