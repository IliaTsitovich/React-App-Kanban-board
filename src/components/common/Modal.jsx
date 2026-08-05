import { useEffect, useRef } from 'react';

export function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="app-modal"
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {open && (
        <div className="app-modal-content">
          <div className="app-modal-header">
            {title && <h2 className="app-modal-title">{title}</h2>}
            <button
              type="button"
              className="app-modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
