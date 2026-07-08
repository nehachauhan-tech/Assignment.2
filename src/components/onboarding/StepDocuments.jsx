import { useState } from 'react';
import { Field, StepActions } from './FormField';

const DOCS = [
  { key: 'panCard', label: 'PAN Card', required: true, hint: 'JPG, PNG or PDF — max 5 MB' },
  { key: 'aadhaarCard', label: 'Aadhaar Card (Front & Back)', required: true, hint: 'JPG, PNG or PDF — max 5 MB' },
  { key: 'addressProof', label: 'Address Proof', required: true, hint: 'Utility bill, bank statement, or rental agreement (max 5 MB)' },
  { key: 'photograph', label: 'Passport-size Photograph', required: true, hint: 'JPG or PNG — white background preferred, max 2 MB' },
];

function UploadZone({ docKey, label, required, hint, file, onChange }) {
  const [drag, setDrag] = useState(false);

  function handleFile(f) {
    if (f) onChange(docKey, f);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div
      className={`doc-zone ${drag ? 'doc-zone--drag' : ''} ${file ? 'doc-zone--filled' : ''}`}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="doc-zone__filled">
          <span className="doc-zone__file-icon">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#10b981" strokeWidth="1.5"/>
              <polyline points="14 2 14 8 20 8" stroke="#10b981" strokeWidth="1.5"/>
            </svg>
          </span>
          <div className="doc-zone__file-info">
            <span className="doc-zone__file-name">{file.name}</span>
            <span className="doc-zone__file-size">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <button
            type="button"
            className="doc-zone__remove"
            onClick={() => onChange(docKey, null)}
            aria-label="Remove file"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <label className="doc-zone__label" htmlFor={`doc-${docKey}`}>
          <span className="doc-zone__icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="doc-zone__cta">
            <span className="doc-zone__cta-link">Click to upload</span> or drag & drop
          </span>
          <span className="doc-zone__hint">{hint}</span>
          <input
            id={`doc-${docKey}`}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="doc-zone__input"
            onChange={e => handleFile(e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
}

export default function StepDocuments({ form, updateSection, errors, clearErrors, onNext, onBack }) {
  const s = form.documents;

  function handleChange(key, file) {
    updateSection('documents', { [key]: file });
    clearErrors('documents', [key]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    DOCS.filter(d => d.required).forEach(d => {
      if (!s[d.key]) errs[`documents.${d.key}`] = `${d.label} is required`;
    });
    onNext(Object.keys(errs).length === 0, errs);
  }

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>
      <div className="ob-form__head">
        <h2 className="ob-form__title">Documents</h2>
        <p className="ob-form__sub">Upload clear, legible copies of the following documents for KYC verification</p>
      </div>

      <div className="doc-grid">
        {DOCS.map(d => (
          <Field key={d.key} label={d.label} required={d.required} error={errors[`documents.${d.key}`]}>
            <UploadZone
              docKey={d.key}
              label={d.label}
              required={d.required}
              hint={d.hint}
              file={s[d.key]}
              onChange={handleChange}
            />
          </Field>
        ))}
      </div>

      <div className="doc-notice">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16h.01" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>All documents are encrypted and stored securely in compliance with RBI and SEBI data protection guidelines.</p>
      </div>

      <StepActions onBack={onBack} nextLabel="Review Application" />
    </form>
  );
}
