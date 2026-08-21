import { useState, useCallback } from 'react';

export const useForm = (initialValues, onSubmit, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field if schema provided
    if (validationSchema && validationSchema[name]) {
      const validator = validationSchema[name];
      const result = validator(values[name]);

      if (!result.valid) {
        setErrors((prev) => ({
          ...prev,
          [name]: result.error,
        }));
      }
    }
  }, [values, validationSchema]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;

    const newErrors = {};

    Object.keys(validationSchema).forEach((field) => {
      const validator = validationSchema[field];
      const result = validator(values[field]);

      if (!result.valid) {
        newErrors[field] = result.error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitError(null);

      // Validate form
      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (error) {
        setSubmitError(error.message || 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues,
    setErrors,
  };
};

export default useForm;
