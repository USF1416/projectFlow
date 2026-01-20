import { useEffect } from "react";

export default function Modal({ title, children, footer, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdrop = (e) => {
    if (e.target.classList.contains("modal-backdrop")) onClose?.();
  };

  return (
    <div className="modal-backdrop" onMouseDown={onBackdrop}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title || "Modal"}>
        <div className="modal__header">
          <strong>{title}</strong>
          <button className="iconbtn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">{children}</div>

        {footer ? <div className="modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
