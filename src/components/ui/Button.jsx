// Bouton générique réutilisable
// variant permet de gérer plusieurs styles via le CSS
export default function Button({ variant = "primary", children, ...props }) {
  const className = `btn btn--${variant}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
