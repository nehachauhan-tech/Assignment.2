import { useState } from 'react';
import StepCustomerDetails from './StepCustomerDetails';
import StepContactInfo from './StepContactInfo';
import StepFinancialDetails from './StepFinancialDetails';
import StepDocuments from './StepDocuments';
import StepReview from './StepReview';
import SuccessScreen from './SuccessScreen';

const STEPS = [
  { id: 'customer', label: 'Customer Details', short: 'Details' },
  { id: 'contact', label: 'Contact Information', short: 'Contact' },
  { id: 'financial', label: 'Financial Details', short: 'Financial' },
  { id: 'documents', label: 'Documents', short: 'Docs' },
  { id: 'review', label: 'Review & Submit', short: 'Review' },
];

const INITIAL = {
  customer: {
    firstName: '', lastName: '', dob: '', gender: '',
    nationality: 'Indian', pan: '', aadhaar: '', maritalStatus: '',
  },
  contact: {
    email: '', phone: '', altPhone: '',
    addressLine1: '', addressLine2: '', city: '',
    state: '', pincode: '', country: 'India',
  },
  financial: {
    accountType: '', occupation: '', annualIncome: '',
    sourceOfFunds: '', bankName: '', accountNumber: '',
    ifsc: '', nomineeName: '', nomineeRelation: '',
  },
  documents: {
    panCard: null, aadhaarCard: null, addressProof: null, photograph: null,
  },
};

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function updateSection(section, fields) {
    setForm(f => ({ ...f, [section]: { ...f[section], ...fields } }));
  }

  function clearErrors(section, keys) {
    setErrors(e => {
      const next = { ...e };
      keys.forEach(k => delete next[`${section}.${k}`]);
      return next;
    });
  }

  function handleNext(validated, errs) {
    if (!validated) { setErrors(e => ({ ...e, ...errs })); return; }
    setErrors({});
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setErrors({});
    setStep(s => Math.max(s - 1, 0));
  }

  if (submitted) return <SuccessScreen onReset={() => { setForm(INITIAL); setStep(0); setSubmitted(false); }} />;

  const stepProps = { form, updateSection, errors, clearErrors, onNext: handleNext, onBack: handleBack };

  return (
    <div className="ob-wrapper">
      {/* Progress bar */}
      <div className="ob-progress">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`ob-step ${i === step ? 'ob-step--active' : ''} ${i < step ? 'ob-step--done' : ''}`}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
          >
            <span className="ob-step__num">
              {i < step
                ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : i + 1
              }
            </span>
            <span className="ob-step__label">{s.label}</span>
            {i < STEPS.length - 1 && <span className="ob-step__connector" />}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="ob-body">
        {step === 0 && <StepCustomerDetails {...stepProps} />}
        {step === 1 && <StepContactInfo {...stepProps} />}
        {step === 2 && <StepFinancialDetails {...stepProps} />}
        {step === 3 && <StepDocuments {...stepProps} />}
        {step === 4 && <StepReview form={form} onBack={handleBack} onSubmit={() => setSubmitted(true)} />}
      </div>
    </div>
  );
}
