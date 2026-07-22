import * as React from 'react'
import { cx } from '../utils'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label shown above the input. */
  label?: string
  /** Marks the field required (shows an accent asterisk). */
  required?: boolean
  /** Shows an "optional" hint next to the label. */
  optional?: boolean
  /** Error message shown below; also turns the border red. */
  error?: string
}

/**
 * A labelled text input in the Telos style: dark translucent field,
 * accent focus ring, optional error state. Pass any native input prop
 * (type, placeholder, value, onChange).
 */
export function TextField({
  label,
  required,
  optional,
  error,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const inputId = id || (label ? `tls-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  return (
    <label className="tls-field" htmlFor={inputId}>
      {label && (
        <span className="tls-label">
          {label}
          {required && <span className="tls-req"> *</span>}
          {optional && <span className="tls-opt"> optional</span>}
        </span>
      )}
      <input
        id={inputId}
        className={cx('tls-input', error && 'tls-input--error', className)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && <p className="tls-error">{error}</p>}
    </label>
  )
}
