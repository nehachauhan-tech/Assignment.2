import { Field, Input, Select, StepActions } from './FormField';

const STATES = ['Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

export default function StepContactInfo({ form, updateSection, errors, clearErrors, onNext, onBack }) {
  const s = form.contact;

  function handleChange(e) {
    const { name, value } = e.target;
    updateSection('contact', { [name]: value });
    clearErrors('contact', [name]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!s.email.trim()) errs['contact.email'] = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)) errs['contact.email'] = 'Enter a valid email address';
    if (!s.phone.trim()) errs['contact.phone'] = 'Phone number is required';
    else if (!/^\+?[\d\s\-]{10,14}$/.test(s.phone)) errs['contact.phone'] = 'Enter a valid 10-digit phone number';
    if (!s.addressLine1.trim()) errs['contact.addressLine1'] = 'Address is required';
    if (!s.city.trim()) errs['contact.city'] = 'City is required';
    if (!s.state) errs['contact.state'] = 'State is required';
    if (!s.pincode.trim()) errs['contact.pincode'] = 'Pincode is required';
    else if (!/^\d{6}$/.test(s.pincode)) errs['contact.pincode'] = 'Pincode must be 6 digits';
    onNext(Object.keys(errs).length === 0, errs);
  }

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>
      <div className="ob-form__head">
        <h2 className="ob-form__title">Contact Information</h2>
        <p className="ob-form__sub">How we'll reach you and your residential address</p>
      </div>

      <div className="ob-section-label">Communication</div>
      <div className="ob-grid ob-grid--2">
        <Field label="Email Address" required error={errors['contact.email']}>
          <Input type="email" name="email" value={s.email} onChange={handleChange} placeholder="name@example.com" error={errors['contact.email']} />
        </Field>
        <Field label="Mobile Number" required error={errors['contact.phone']}>
          <Input type="tel" name="phone" value={s.phone} onChange={handleChange} placeholder="+91 98765 43210" error={errors['contact.phone']} />
        </Field>
      </div>
      <div className="ob-grid ob-grid--2">
        <Field label="Alternate Phone" error={errors['contact.altPhone']}>
          <Input type="tel" name="altPhone" value={s.altPhone} onChange={handleChange} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <div className="ob-section-label">Residential Address</div>
      <div className="ob-grid ob-grid--1">
        <Field label="Address Line 1" required error={errors['contact.addressLine1']}>
          <Input name="addressLine1" value={s.addressLine1} onChange={handleChange} placeholder="House / Flat No., Street" error={errors['contact.addressLine1']} />
        </Field>
      </div>
      <div className="ob-grid ob-grid--1">
        <Field label="Address Line 2" error={errors['contact.addressLine2']}>
          <Input name="addressLine2" value={s.addressLine2} onChange={handleChange} placeholder="Landmark, Area (optional)" />
        </Field>
      </div>
      <div className="ob-grid ob-grid--3">
        <Field label="City" required error={errors['contact.city']}>
          <Input name="city" value={s.city} onChange={handleChange} placeholder="e.g. Mumbai" error={errors['contact.city']} />
        </Field>
        <Field label="State" required error={errors['contact.state']}>
          <Select name="state" value={s.state} onChange={handleChange} error={errors['contact.state']}>
            <option value="">Select state</option>
            {STATES.map(st => <option key={st} value={st}>{st}</option>)}
          </Select>
        </Field>
        <Field label="Pincode" required error={errors['contact.pincode']}>
          <Input name="pincode" value={s.pincode} onChange={handleChange} placeholder="400001" maxLength={6} error={errors['contact.pincode']} />
        </Field>
      </div>
      <div className="ob-grid ob-grid--2">
        <Field label="Country">
          <Select name="country" value={s.country} onChange={handleChange}>
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="UAE">UAE</option>
          </Select>
        </Field>
      </div>

      <StepActions onBack={onBack} nextLabel="Continue" />
    </form>
  );
}
