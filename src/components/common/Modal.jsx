import { useEffect, useId, useRef } from 'react';

export function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  });

  return (
    <dialog
      ref={dialogRef}
      className="app-modal"
      aria-labelledby={title ? titleId : undefined}
      onClose={onClose}
      onCancel={(e) => {
        // The parent decides whether Escape closes; it may need to confirm first.
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {open && (
        <div className="app-modal-content">
          <div className="app-modal-header">
            {title && (
              <h2 id={titleId} className="app-modal-title">
                {title}
              </h2>
            )}
            <button
              type="button"
              className="app-modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
