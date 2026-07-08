import { Field, Input, Select, StepActions } from './FormField';

export default function StepFinancialDetails({ form, updateSection, errors, clearErrors, onNext, onBack }) {
  const s = form.financial;

  function handleChange(e) {
    const { name, value } = e.target;
    updateSection('financial', { [name]: value });
    clearErrors('financial', [name]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!s.accountType) errs['financial.accountType'] = 'Please select an account type';
    if (!s.occupation) errs['financial.occupation'] = 'Occupation is required';
    if (!s.annualIncome) errs['financial.annualIncome'] = 'Annual income range is required';
    if (!s.sourceOfFunds) errs['financial.sourceOfFunds'] = 'Source of funds is required';
    if (!s.bankName.trim()) errs['financial.bankName'] = 'Bank name is required';
    if (!s.accountNumber.trim()) errs['financial.accountNumber'] = 'Account number is required';
    else if (!/^\d{9,18}$/.test(s.accountNumber)) errs['financial.accountNumber'] = 'Enter a valid account number';
    if (!s.ifsc.trim()) errs['financial.ifsc'] = 'IFSC code is required';
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(s.ifsc.toUpperCase())) errs['financial.ifsc'] = 'Invalid IFSC code (e.g. HDFC0001234)';
    onNext(Object.keys(errs).length === 0, errs);
  }

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>
      <div className="ob-form__head">
        <h2 className="ob-form__title">Financial Details</h2>
        <p className="ob-form__sub">Account preferences, income profile, and banking details</p>
      </div>

      <div className="ob-section-label">Account & Income</div>
      <div className="ob-grid ob-grid--2">
        <Field label="Account Type" required error={errors['financial.accountType']}>
          <Select name="accountType" value={s.accountType} onChange={handleChange} error={errors['financial.accountType']}>
            <option value="">Select type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="demat">Demat Account</option>
            <option value="investment">Investment Portfolio</option>
          </Select>
        </Field>
        <Field label="Occupation" required error={errors['financial.occupation']}>
          <Select name="occupation" value={s.occupation} onChange={handleChange} error={errors['financial.occupation']}>
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self_employed">Self-Employed</option>
            <option value="business">Business Owner</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
            <option value="homemaker">Homemaker</option>
            <option value="other">Other</option>
          </Select>
        </Field>
      </div>

      <div className="ob-grid ob-grid--2">
        <Field label="Annual Income" required error={errors['financial.annualIncome']}>
          <Select name="annualIncome" value={s.annualIncome} onChange={handleChange} error={errors['financial.annualIncome']}>
            <option value="">Select range</option>
            <option value="below_2l">Below ₹2 Lakh</option>
            <option value="2l_5l">₹2L – ₹5L</option>
            <option value="5l_10l">₹5L – ₹10L</option>
            <option value="10l_25l">₹10L – ₹25L</option>
            <option value="25l_50l">₹25L – ₹50L</option>
            <option value="above_50l">Above ₹50L</option>
          </Select>
        </Field>
        <Field label="Source of Funds" required error={errors['financial.sourceOfFunds']}>
          <Select name="sourceOfFunds" value={s.sourceOfFunds} onChange={handleChange} error={errors['financial.sourceOfFunds']}>
            <option value="">Select source</option>
            <option value="salary">Salary / Employment</option>
            <option value="business">Business Income</option>
            <option value="investment">Investment Returns</option>
            <option value="inheritance">Inheritance / Gift</option>
            <option value="rental">Rental Income</option>
            <option value="other">Other</option>
          </Select>
        </Field>
      </div>

      <div className="ob-section-label">Bank Account Details</div>
      <div className="ob-grid ob-grid--2">
        <Field label="Bank Name" required error={errors['financial.bankName']}>
          <Input name="bankName" value={s.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" error={errors['financial.bankName']} />
        </Field>
        <Field label="Account Number" required error={errors['financial.accountNumber']}>
          <Input name="accountNumber" value={s.accountNumber} onChange={handleChange} placeholder="Enter account number" error={errors['financial.accountNumber']} />
        </Field>
      </div>
      <div className="ob-grid ob-grid--2">
        <Field label="IFSC Code" required error={errors['financial.ifsc']} hint="11-character code (e.g. HDFC0001234)">
          <Input
            name="ifsc" value={s.ifsc} onChange={handleChange}
            placeholder="HDFC0001234" maxLength={11}
            style={{ textTransform: 'uppercase' }}
            error={errors['financial.ifsc']}
          />
        </Field>
      </div>

      <div className="ob-section-label">Nominee Details <span className="ob-section-label__opt">(Optional)</span></div>
      <div className="ob-grid ob-grid--2">
        <Field label="Nominee Name" error={errors['financial.nomineeName']}>
          <Input name="nomineeName" value={s.nomineeName} onChange={handleChange} placeholder="Full name of nominee" />
        </Field>
        <Field label="Nominee Relation" error={errors['financial.nomineeRelation']}>
          <Select name="nomineeRelation" value={s.nomineeRelation} onChange={handleChange}>
            <option value="">Select relation</option>
            <option value="spouse">Spouse</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </Select>
        </Field>
      </div>

      <StepActions onBack={onBack} nextLabel="Continue" />
    </form>
  );
}
