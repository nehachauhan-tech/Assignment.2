import { useState } from 'react';

const LABELS = {
  customer: {
    firstName: 'First Name', lastName: 'Last Name', dob: 'Date of Birth',
    gender: 'Gender', nationality: 'Nationality', pan: 'PAN Number',
    aadhaar: 'Aadhaar Number', maritalStatus: 'Marital Status',
  },
  contact: {
    email: 'Email Address', phone: 'Mobile Number', altPhone: 'Alternate Phone',
    addressLine1: 'Address Line 1', addressLine2: 'Address Line 2',
    city: 'City', state: 'State', pincode: 'Pincode', country: 'Country',
  },
  financial: {
    accountType: 'Account Type', occupation: 'Occupation', annualIncome: 'Annual Income',
    sourceOfFunds: 'Source of Funds', bankName: 'Bank Name',
    accountNumber: 'Account Number', ifsc: 'IFSC Code',
    nomineeName: 'Nominee Name', nomineeRelation: 'Nominee Relation',
  },
};

const SECTION_META = [
  { key: 'customer', title: 'Customer Details', icon: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  )},
  { key: 'contact', title: 'Contact Information', icon: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.22 2 2 0 012 .04h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/></svg>
  )},
  { key: 'financial', title: 'Financial Details', icon: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/></svg>
  )},
];

function maskAadhaar(v) {
  const d = v.replace(/\s/g, '');
  return d.length === 12 ? `XXXX XXXX ${d.slice(8)}` : v;
}
function maskAccount(v) {
  return v.length > 4 ? `${'X'.repeat(v.length - 4)}${v.slice(-4)}` : v;
}

function displayValue(section, key, value) {
  if (!value) return <span className="rv-empty">Not provided</span>;
  if (section === 'customer' && key === 'aadhaar') return maskAadhaar(value);
  if (section === 'financial' && key === 'accountNumber') return maskAccount(value);
  if (section === 'customer' && key === 'pan') return value.toUpperCase();
  if (section === 'financial' && key === 'ifsc') return value.toUpperCase();
  return value;
}

function ReviewSection({ sectionKey, title, icon, data, onEdit }) {
  const labels = LABELS[sectionKey];
  const rows = Object.entries(labels).map(([key, label]) => ({ key, label, value: data[key] }));

  return (
    <div className="rv-section">
      <div className="rv-section__header">
        <div className="rv-section__title-row">
          <span className="rv-section__icon">{icon}</span>
          <h3 className="rv-section__title">{title}</h3>
        </div>
        <button type="button" className="rv-edit-btn" onClick={onEdit}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
      <div className="rv-table">
        {rows.map(({ key, label, value }) => (
          <div key={key} className="rv-row">
            <span className="rv-row__label">{label}</span>
            <span className="rv-row__value">{displayValue(sectionKey, key, value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsSection({ data, onEdit }) {
  const docs = [
    { key: 'panCard', label: 'PAN Card' },
    { key: 'aadhaarCard', label: 'Aadhaar Card' },
    { key: 'addressProof', label: 'Address Proof' },
    { key: 'photograph', label: 'Photograph' },
  ];

  return (
    <div className="rv-section">
      <div className="rv-section__header">
        <div className="rv-section__title-row">
          <span className="rv-section__icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </span>
          <h3 className="rv-section__title">Documents</h3>
        </div>
        <button type="button" className="rv-edit-btn" onClick={onEdit}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
      <div className="rv-doc-grid">
        {docs.map(d => (
          <div key={d.key} className={`rv-doc-chip ${data[d.key] ? 'rv-doc-chip--ok' : 'rv-doc-chip--missing'}`}>
            {data[d.key]
              ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/></svg>
            }
            <span>{d.label}</span>
            {data[d.key] && <span className="rv-doc-chip__name">{data[d.key].name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StepReview({ form, onBack, onSubmit }) {
  const [agreed, setAgreed] = useState(false);

  const EDIT_STEPS = { customer: 0, contact: 1, financial: 2, documents: 3 };

  return (
    <div className="ob-form">
      <div className="ob-form__head">
        <h2 className="ob-form__title">Review & Submit</h2>
        <p className="ob-form__sub">Please review all details carefully before submitting your application</p>
      </div>

      <div className="rv-sections">
        {SECTION_META.map(s => (
          <ReviewSection
            key={s.key}
            sectionKey={s.key}
            title={s.title}
            icon={s.icon}
            data={form[s.key]}
            onEdit={() => onBack(EDIT_STEPS[s.key])}
          />
        ))}
        <DocumentsSection data={form.documents} onEdit={() => onBack(3)} />
      </div>

      <label className="rv-consent">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <span>
          I confirm that all information provided is accurate and I consent to the
          <span className="rv-consent__link"> Terms & Conditions</span> and
          <span className="rv-consent__link"> Privacy Policy</span>.
        </span>
      </label>

      <div className="ob-actions">
        <button type="button" className="ob-btn ob-btn--ghost" onClick={onBack}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button
          type="button"
          className="ob-btn ob-btn--primary"
          disabled={!agreed}
          onClick={onSubmit}
        >
          Submit Application
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
