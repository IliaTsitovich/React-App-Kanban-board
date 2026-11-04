import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, id, hint, error, className = '', ...rest },
  ref
) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`field-input ${className}`}
        aria-describedby={hint && !error ? `${id}-hint` : undefined}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
