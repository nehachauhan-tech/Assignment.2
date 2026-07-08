export function Field({ label, error, required, children, hint }) {
  return (
    <div className={`ff ${error ? 'ff--error' : ''}`}>
      <label className="ff__label">
        {label}
        {required && <span className="ff__req">*</span>}
      </label>
      {children}
      {hint && !error && <span className="ff__hint">{hint}</span>}
      {error && <span className="ff__err">{error}</span>}
    </div>
  );
}

export function Input({ error, ...props }) {
  return <input className={`ff__input ${error ? 'ff__input--err' : ''}`} {...props} />;
}

export function Select({ error, children, ...props }) {
  return (
    <div className="ff__select-wrap">
      <select className={`ff__select ${error ? 'ff__input--err' : ''}`} {...props}>
        {children}
      </select>
      <svg className="ff__select-arrow" width="14" height="14" fill="none" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export function StepActions({ onBack, onNext, nextLabel = 'Continue', step, total }) {
  return (
    <div className="ob-actions">
      {onBack && (
        <button type="button" className="ob-btn ob-btn--ghost" onClick={onBack}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      )}
      <button type="submit" className="ob-btn ob-btn--primary">
        {nextLabel}
        {nextLabel !== 'Submit Application' && (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}
