function Button({ className = '', type = 'button', disabled = false, onClick, children }) {
  return (
    <button type={type} disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
