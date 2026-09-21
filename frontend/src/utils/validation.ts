import type { ContactFormErrors, ContactFormValues } from '../types/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\s().-]{8,}$/;

export const validateContactField = (
  field: keyof ContactFormValues,
  value: string,
): string | undefined => {
  const trimmedValue = value.trim();

  if (field === 'name' && !trimmedValue) return 'Vui lòng nhập họ và tên.';
  if (field === 'email') {
    if (!trimmedValue) return 'Vui lòng nhập email.';
    if (!emailPattern.test(trimmedValue)) return 'Email chưa đúng định dạng.';
  }
  if (field === 'phone' && trimmedValue && !phonePattern.test(trimmedValue)) {
    return 'Số điện thoại chưa đúng định dạng.';
  }
  if (field === 'message' && !trimmedValue) return 'Vui lòng nhập nội dung cần tư vấn.';

  return undefined;
};

export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  (Object.keys(values) as Array<keyof ContactFormValues>).forEach((field) => {
    const error = validateContactField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
};
