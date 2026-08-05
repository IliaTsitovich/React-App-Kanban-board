import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, id, error, className = '', ...rest },
  ref
) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <input id={id} ref={ref} className={`field-input ${className}`} {...rest} />
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
