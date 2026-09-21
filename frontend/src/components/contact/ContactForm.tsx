import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useState } from 'react';
import type { ContactFormErrors, ContactFormValues } from '../../types/site';
import { validateContactField, validateContactForm } from '../../utils/validation';
import styles from './ContactForm.module.css';

const initialValues: ContactFormValues = { name: '', email: '', phone: '', message: '' };

type SubmissionState = 'idle' | 'submitting' | 'success';

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    const error = validateContactField(field, values[field]);
    setErrors((current) => ({ ...current, [field]: error }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmissionState('submitting');
    window.setTimeout(() => setSubmissionState('success'), 650);
  };

  if (submissionState === 'success') {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successIcon}><Send aria-hidden="true" size={22} /></div>
        <p className="eyebrow">Đã ghi nhận</p>
        <h2>Cảm ơn bạn đã kết nối.</h2>
        <p>Yêu cầu của bạn đã được ghi nhận. Tân Hoàng Phát sẽ liên hệ trong thời gian sớm nhất.</p>
        <button type="button" className={styles.resetButton} onClick={() => { setValues(initialValues); setErrors({}); setSubmissionState('idle'); }}>Gửi yêu cầu khác</button>
      </div>
    );
  }

  const renderFieldError = (field: keyof ContactFormValues) => errors[field] ? <span className={styles.error} id={`${field}-error`}>{errors[field]}</span> : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <p className="eyebrow">Gửi yêu cầu tư vấn</p>
        <h2>Chúng tôi sẽ phản hồi rõ ràng và nhanh chóng.</h2>
        <p>Để lại thông tin, đội ngũ kỹ thuật sẽ liên hệ để hiểu rõ hơn về nhu cầu của bạn.</p>
      </div>
      <div className={styles.fields}>
        <label>
          <span>Họ và tên <b aria-hidden="true">*</b></span>
          <input name="name" value={values.name} onChange={(event) => handleChange('name', event.target.value)} onBlur={() => handleBlur('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" />
          {renderFieldError('name')}
        </label>
        <label>
          <span>Email <b aria-hidden="true">*</b></span>
          <input name="email" type="email" value={values.email} onChange={(event) => handleChange('email', event.target.value)} onBlur={() => handleBlur('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" />
          {renderFieldError('email')}
        </label>
        <label>
          <span>Số điện thoại</span>
          <input name="phone" type="tel" value={values.phone} onChange={(event) => handleChange('phone', event.target.value)} onBlur={() => handleBlur('phone')} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} autoComplete="tel" />
          {renderFieldError('phone')}
        </label>
        <label className={styles.fullWidth}>
          <span>Nội dung cần tư vấn <b aria-hidden="true">*</b></span>
          <textarea name="message" rows={5} value={values.message} onChange={(event) => handleChange('message', event.target.value)} onBlur={() => handleBlur('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
          {renderFieldError('message')}
        </label>
      </div>
      <button className="button-link" type="submit" disabled={submissionState === 'submitting'}>
        <span>{submissionState === 'submitting' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</span>
        <Send aria-hidden="true" size={16} />
      </button>
    </form>
  );
}
