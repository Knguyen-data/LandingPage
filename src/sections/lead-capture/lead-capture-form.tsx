'use client';

import { useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { ArrowRight, Check, MapPin } from 'lucide-react';

import {
  readDashbookingLeadAttribution,
  useDashbookingLeadAttribution,
} from '@/sections/lead-capture/use-lead-attribution';
import { useDashbookingAddressSuggest } from '@/sections/lead-capture/use-address-suggest';
import type { LeadCaptureSectionContent } from '@/content/types';
import { dashbookingLeadCaptureLimits } from '@/content/lead-capture';
import type { DashbookingPlaceSuggestion } from '@/lib/leads/address-suggest';
import { isValidLeadEmail, isValidLeadPhone } from '@/lib/leads/payload';

interface DashbookingLandingLeadCaptureFormProps {
  readonly copy: LeadCaptureSectionContent;
  readonly submitted: boolean;
  readonly onSubmitted: () => void;
}

type LeadFieldName = 'name' | 'business' | 'phone' | 'email' | 'address' | 'city' | 'region' | 'country' | 'interest' | 'message';

interface LeadFormValues {
  name: string;
  business: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  region: string;
  country: string;
  interest: string;
  message: string;
  website: string;
}

type LeadFieldErrors = Partial<Record<'name' | 'business' | 'phone' | 'email', string>>;

const emptyValues: LeadFormValues = {
  name: '',
  business: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  region: '',
  country: '',
  interest: '',
  message: '',
  website: '',
};

export function DashbookingLandingLeadCaptureForm({
  copy,
  submitted,
  onSubmitted,
}: DashbookingLandingLeadCaptureFormProps) {
  const formId = useId();
  const submittingLock = useRef(false);
  const [values, setValues] = useState<LeadFormValues>(emptyValues);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const locked = submitting || submitted;
  const addresses = useDashbookingAddressSuggest(values.address, !locked);
  const highlightedSuggestion = addresses.suggestions.length
    ? Math.min(activeSuggestion, addresses.suggestions.length - 1)
    : 0;

  useDashbookingLeadAttribution();

  const fieldId = (name: LeadFieldName) => `${formId}-${name}`;
  const errorId = (name: LeadFieldName) => `${formId}-${name}-error`;

  const setField = (name: keyof LeadFormValues, value: string) => {
    if (locked) {
      return;
    }
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validateField = (name: 'name' | 'business' | 'phone' | 'email', value: string): string => {
    if (!value.trim()) {
      return copy.requiredError;
    }

    if (name === 'email' && !isValidLeadEmail(value.trim().toLowerCase())) {
      return copy.emailError;
    }

    if (name === 'phone' && !isValidLeadPhone(value.trim())) {
      return copy.phoneError;
    }

    return '';
  };

  const validateForm = (): LeadFieldErrors => {
    const nextErrors: LeadFieldErrors = {};
    const requiredFields = ['name', 'business', 'phone', 'email'] as const;

    for (const field of requiredFields) {
      const message = validateField(field, values[field]);
      if (message) {
        nextErrors[field] = message;
      }
    }

    return nextErrors;
  };

  const applyAddress = (suggestion: DashbookingPlaceSuggestion) => {
    setValues((current) => ({
      ...current,
      address: suggestion.address || current.address,
      city: suggestion.city || current.city,
      region: suggestion.region || current.region,
      country: suggestion.country || current.country,
    }));
    addresses.close();
    setActiveSuggestion(0);
  };

  const handleAddressKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!addresses.open || addresses.suggestions.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % addresses.suggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion((current) => (current - 1 + addresses.suggestions.length) % addresses.suggestions.length);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const suggestion = addresses.suggestions[highlightedSuggestion];
      if (suggestion) {
        applyAddress(suggestion);
      }
      return;
    }

    if (event.key === 'Escape') {
      addresses.close();
    }
  };

  const handleBlur = (name: 'name' | 'business' | 'phone' | 'email') => {
    const message = validateField(name, values[name]);
    setErrors((current) => {
      const next = { ...current };
      if (!message) {
        delete next[name];
        return next;
      }

      next[name] = message;
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingLock.current || locked) {
      return;
    }

    const nextErrors = validateForm();
    setErrors(nextErrors);
    setFormError('');

    const firstInvalid = (['name', 'business', 'phone', 'email'] as const).find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    submittingLock.current = true;
    setSubmitting(true);

    const attribution = readDashbookingLeadAttribution();

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          business: values.business,
          phone: values.phone,
          email: values.email,
          address: values.address,
          city: values.city,
          region: values.region,
          country: values.country,
          interest: values.interest,
          message: values.message,
          website: values.website,
          platform: attribution.platform,
          campaign: attribution.campaign,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean } | null;

      if (!response.ok || !payload?.success) {
        setFormError(copy.errorRetry);
        return;
      }

      onSubmitted();
    } catch {
      setFormError(copy.errorRetry);
    } finally {
      submittingLock.current = false;
      setSubmitting(false);
    }
  };

  const buttonLabel = submitted ? copy.submittedLabel : submitting ? copy.submittingLabel : copy.submitLabel;

  return (
    <form
      className={submitted ? 'lead-capture__form is-submitted' : 'lead-capture__form'}
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="lead-capture__form-heading">{copy.title}</h3>

      <label className="lead-capture__honeypot" htmlFor={`${formId}-website`} aria-hidden="true">
        Website
        <input
          id={`${formId}-website`}
          name="website"
          value={values.website}
          onChange={(event) => setField('website', event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="lead-capture__grid">
        <LeadField
          id={fieldId('name')}
          name="name"
          errorId={errorId('name')}
          label={copy.nameLabel}
          required
          value={values.name}
          placeholder={copy.namePlaceholder}
          autoComplete="name"
          maxLength={dashbookingLeadCaptureLimits.name}
          error={errors.name}
          disabled={locked}
          onChange={(value) => setField('name', value)}
          onBlur={() => handleBlur('name')}
        />
        <LeadField
          id={fieldId('business')}
          name="business"
          errorId={errorId('business')}
          label={copy.businessLabel}
          required
          value={values.business}
          placeholder={copy.businessPlaceholder}
          autoComplete="organization"
          maxLength={dashbookingLeadCaptureLimits.business}
          error={errors.business}
          disabled={locked}
          onChange={(value) => setField('business', value)}
          onBlur={() => handleBlur('business')}
        />
        <div className="lead-capture__field lead-capture__field--wide lead-capture__field--suggest">
          <label htmlFor={fieldId('address')}>
            <span>{copy.addressLabel}</span>
          </label>
          <input
            id={fieldId('address')}
            name="address"
            type="text"
            value={values.address}
            placeholder={copy.addressPlaceholder}
            autoComplete="off"
            maxLength={dashbookingLeadCaptureLimits.address}
            disabled={locked}
            readOnly={locked}
            role="combobox"
            aria-expanded={addresses.open}
            aria-controls={`${formId}-address-list`}
            aria-activedescendant={
              addresses.open && addresses.suggestions[highlightedSuggestion]
                ? `${formId}-address-${addresses.suggestions[highlightedSuggestion].placeId}`
                : undefined
            }
            aria-autocomplete="list"
            onChange={(event) => {
              setField('address', event.target.value);
              setActiveSuggestion(0);
            }}
            onBlur={() => {
              window.setTimeout(() => addresses.close(), 160);
            }}
            onKeyDown={handleAddressKeyDown}
          />
          {addresses.open ? (
            <ul id={`${formId}-address-list`} className="lead-capture__suggest" role="listbox">
              {addresses.suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.placeId}
                  id={`${formId}-address-${suggestion.placeId}`}
                  role="option"
                  aria-selected={index === highlightedSuggestion}
                >
                  <button
                    type="button"
                    className={index === highlightedSuggestion ? 'is-active' : undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => applyAddress(suggestion)}
                  >
                    <MapPin size={16} strokeWidth={2.2} aria-hidden="true" />
                    <span>
                      <strong>{suggestion.address || suggestion.label}</strong>
                      <em>
                        {[suggestion.city, suggestion.region, suggestion.country].filter(Boolean).join(', ')}
                      </em>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <LeadField
          id={fieldId('city')}
          name="city"
          errorId={errorId('city')}
          label={copy.cityLabel}
          value={values.city}
          placeholder={copy.cityPlaceholder}
          autoComplete="address-level2"
          maxLength={dashbookingLeadCaptureLimits.city}
          disabled={locked}
          onChange={(value) => setField('city', value)}
        />
        <LeadField
          id={fieldId('region')}
          name="region"
          errorId={errorId('region')}
          label={copy.regionLabel}
          value={values.region}
          placeholder={copy.regionPlaceholder}
          autoComplete="address-level1"
          maxLength={dashbookingLeadCaptureLimits.region}
          disabled={locked}
          onChange={(value) => setField('region', value)}
        />
        <LeadField
          id={fieldId('country')}
          name="country"
          errorId={errorId('country')}
          label={copy.countryLabel}
          value={values.country}
          placeholder={copy.countryPlaceholder}
          autoComplete="country-name"
          maxLength={dashbookingLeadCaptureLimits.country}
          disabled={locked}
          onChange={(value) => setField('country', value)}
        />
        <LeadField
          id={fieldId('phone')}
          name="phone"
          errorId={errorId('phone')}
          label={copy.phoneLabel}
          required
          type="tel"
          value={values.phone}
          placeholder={copy.phonePlaceholder}
          autoComplete="tel"
          maxLength={dashbookingLeadCaptureLimits.phone}
          error={errors.phone}
          disabled={locked}
          onChange={(value) => setField('phone', value)}
          onBlur={() => handleBlur('phone')}
        />
        <LeadField
          id={fieldId('email')}
          name="email"
          errorId={errorId('email')}
          label={copy.emailLabel}
          required
          type="email"
          value={values.email}
          placeholder={copy.emailPlaceholder}
          autoComplete="email"
          maxLength={dashbookingLeadCaptureLimits.email}
          error={errors.email}
          disabled={locked}
          onChange={(value) => setField('email', value)}
          onBlur={() => handleBlur('email')}
        />
        <div className="lead-capture__field lead-capture__field--wide">
          <label htmlFor={fieldId('interest')}>
            <span>{copy.interestLabel}</span>
          </label>
          <select
            id={fieldId('interest')}
            name="interest"
            value={values.interest}
            disabled={locked}
            onChange={(event) => setField('interest', event.target.value)}
          >
            <option value="">{copy.interestPlaceholder}</option>
            {copy.interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lead-capture__field lead-capture__field--wide">
          <label htmlFor={fieldId('message')}>
            <span>{copy.messageLabel}</span>
            <em>{copy.messageHint}</em>
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            value={values.message}
            placeholder={copy.messagePlaceholder}
            maxLength={dashbookingLeadCaptureLimits.message}
            rows={4}
            disabled={locked}
            readOnly={locked}
            onChange={(event) => setField('message', event.target.value)}
          />
        </div>
      </div>

      {formError ? (
        <p className="lead-capture__form-error" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        className={submitted ? 'button-link lead-capture__submit is-submitted' : 'button-link lead-capture__submit'}
        disabled={locked}
      >
        <span>{buttonLabel}</span>
        {submitting ? <span className="lead-capture__spinner" aria-hidden="true" /> : null}
        {submitted ? <Check size={18} strokeWidth={2.6} /> : null}
        {!submitting && !submitted ? <ArrowRight size={18} strokeWidth={2.4} /> : null}
      </button>
      <p className="lead-capture__privacy">{copy.privacyNote}</p>
    </form>
  );
}

interface LeadFieldProps {
  readonly id: string;
  readonly name: string;
  readonly errorId: string;
  readonly label: string;
  readonly hint?: string;
  readonly required?: boolean;
  readonly type?: 'text' | 'email' | 'tel';
  readonly value: string;
  readonly placeholder: string;
  readonly autoComplete: string;
  readonly maxLength: number;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly wide?: boolean;
  readonly onChange: (value: string) => void;
  readonly onBlur?: () => void;
}

function LeadField({
  id,
  name,
  errorId,
  label,
  hint,
  required = false,
  type = 'text',
  value,
  placeholder,
  autoComplete,
  maxLength,
  error,
  disabled = false,
  wide = false,
  onChange,
  onBlur,
}: LeadFieldProps) {
  const className = [
    'lead-capture__field',
    error ? 'is-invalid' : '',
    wide ? 'lead-capture__field--wide' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={className}>
      <label htmlFor={id}>
        <span>
          {label}
          {required ? <abbr title="required">*</abbr> : null}
        </span>
        {hint ? <em>{hint}</em> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        readOnly={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
      {error ? (
        <p id={errorId} className="lead-capture__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
