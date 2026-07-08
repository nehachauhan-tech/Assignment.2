import { Field, Input, Select, StepActions } from './FormField';

export default function StepCustomerDetails({ form, updateSection, errors, clearErrors, onNext, onBack }) {
  const s = form.customer;

  function handleChange(e) {
    const { name, value } = e.target;
    updateSection('customer', { [name]: value });
    clearErrors('customer', [name]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!s.firstName.trim()) errs['customer.firstName'] = 'First name is required';
    if (!s.lastName.trim()) errs['customer.lastName'] = 'Last name is required';
    if (!s.dob) errs['customer.dob'] = 'Date of birth is required';
    if (!s.gender) errs['customer.gender'] = 'Please select gender';
    if (!s.pan.trim()) errs['customer.pan'] = 'PAN is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(s.pan.toUpperCase())) errs['customer.pan'] = 'Invalid PAN format (e.g. ABCDE1234F)';
    if (!s.aadhaar.trim()) errs['customer.aadhaar'] = 'Aadhaar number is required';
    else if (!/^\d{12}$/.test(s.aadhaar.replace(/\s/g, ''))) errs['customer.aadhaar'] = 'Aadhaar must be 12 digits';
    onNext(Object.keys(errs).length === 0, errs);
  }

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>
      <div className="ob-form__head">
        <h2 className="ob-form__title">Customer Details</h2>
        <p className="ob-form__sub">Basic personal information about the account holder</p>
      </div>

      <div className="ob-grid ob-grid--2">
        <Field label="First Name" required error={errors['customer.firstName']}>
          <Input name="firstName" value={s.firstName} onChange={handleChange} placeholder="e.g. Neha" error={errors['customer.firstName']} />
        </Field>
        <Field label="Last Name" required error={errors['customer.lastName']}>
          <Input name="lastName" value={s.lastName} onChange={handleChange} placeholder="e.g. Chauhan" error={errors['customer.lastName']} />
        </Field>
      </div>

      <div className="ob-grid ob-grid--3">
        <Field label="Date of Birth" required error={errors['customer.dob']}>
          <Input type="date" name="dob" value={s.dob} onChange={handleChange} error={errors['customer.dob']} />
        </Field>
        <Field label="Gender" required error={errors['customer.gender']}>
          <Select name="gender" value={s.gender} onChange={handleChange} error={errors['customer.gender']}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </Select>
        </Field>
        <Field label="Marital Status" error={errors['customer.maritalStatus']}>
          <Select name="maritalStatus" value={s.maritalStatus} onChange={handleChange}>
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </Select>
        </Field>
      </div>

      <div className="ob-grid ob-grid--2">
        <Field label="PAN Number" required error={errors['customer.pan']} hint="10-character alphanumeric (e.g. ABCDE1234F)">
          <Input
            name="pan" value={s.pan} onChange={handleChange}
            placeholder="ABCDE1234F" maxLength={10}
            style={{ textTransform: 'uppercase' }}
            error={errors['customer.pan']}
          />
        </Field>
        <Field label="Aadhaar Number" required error={errors['customer.aadhaar']} hint="12-digit Aadhaar UID">
          <Input
            name="aadhaar" value={s.aadhaar} onChange={handleChange}
            placeholder="XXXX XXXX XXXX" maxLength={14}
            error={errors['customer.aadhaar']}
          />
        </Field>
      </div>

      <div className="ob-grid ob-grid--2">
        <Field label="Nationality" error={errors['customer.nationality']}>
          <Select name="nationality" value={s.nationality} onChange={handleChange}>
            <option value="Indian">Indian</option>
            <option value="NRI">NRI</option>
            <option value="Foreign">Foreign National</option>
          </Select>
        </Field>
      </div>

      <StepActions onNext={handleSubmit} nextLabel="Continue" />
    </form>
  );
}
