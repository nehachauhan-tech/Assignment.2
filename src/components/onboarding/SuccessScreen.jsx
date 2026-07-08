export default function SuccessScreen({ onReset }) {
  return (
    <div className="ob-success">
      <div className="ob-success__icon">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="rgba(16,185,129,.15)" stroke="#10b981" strokeWidth="1.5"/>
          <path d="M6 12l4 4 8-8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="ob-success__title">Application Submitted!</h2>
      <p className="ob-success__msg">
        Your customer onboarding application has been received successfully.
        Our team will verify your documents and activate your account within <strong>2–3 business days</strong>.
        A confirmation has been sent to your registered email address.
      </p>
      <div className="ob-success__ref">
        Reference ID: <strong>GRN-{Math.random().toString(36).slice(2, 10).toUpperCase()}</strong>
      </div>
      <button className="ob-btn ob-btn--primary" onClick={onReset}>
        Start New Application
      </button>
    </div>
  );
}
