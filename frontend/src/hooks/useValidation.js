import { useState, useCallback } from "react";

export default function useValidation(rules = {}) {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((fieldName, value) => {
    const rule = rules[fieldName];
    if (!rule) return null;

    try {
      if (rule.required && !value) {
        return `${fieldName} is required`;
      }

      if (rule.type === "number" && value) {
        const num = Number(value);
        if (isNaN(num)) {
          return `${fieldName} must be a valid number`;
        }
        if (rule.min !== undefined && num < rule.min) {
          return `${fieldName} must be at least ${rule.min}`;
        }
        if (rule.max !== undefined && num > rule.max) {
          return `${fieldName} cannot exceed ${rule.max}`;
        }
      }

      if (rule.type === "date" && value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return `${fieldName} must be a valid date`;
        }
      }

      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) return customError;
      }

      return null;
    } catch (err) {
      return `Invalid ${fieldName}`;
    }
  }, [rules]);

  const validateAll = useCallback(
    (formData) => {
      const newErrors = {};
      let isValid = true;

      Object.keys(formData).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [validateField]
  );

  const clearError = useCallback((fieldName) => {
    if (fieldName) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } else {
      setErrors({});
    }
  }, []);

  const getError = useCallback(
    (fieldName) => errors[fieldName] || null,
    [errors]
  );

  return {
    errors,
    validateField,
    validateAll,
    clearError,
    getError,
    isValid: Object.keys(errors).length === 0,
  };
}
