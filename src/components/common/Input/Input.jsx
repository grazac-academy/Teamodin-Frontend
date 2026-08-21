import React, { useState } from 'react';
import './Input.css';

export const Input = ({
  label,
  name,
  type = 'text',
  value = '',
  placeholder = '',
  error = '',
  touched = false,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  icon = null,
  showPasswordToggle = false,
  hint = '',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === 'password' && showPasswordToggle
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  const hasError = touched && error;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={name} className="input-group__label">
          {label}
          {required && <span className="input-group__required">*</span>}
        </label>
      )}

      <div className="input-group__wrapper">
        {icon && <span className="input-group__icon-left">{icon}</span>}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-group__input ${hasError ? 'input-group__input--error' : ''}`}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />

        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className="input-group__password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}

        {value && type !== 'password' && (
          <span className="input-group__check">✓</span>
        )}
      </div>

      {hint && !hasError && (
        <p className="input-group__hint">{hint}</p>
      )}

      {hasError && (
        <p className="input-group__error">{error}</p>
      )}
    </div>
  );
};

export default Input;
