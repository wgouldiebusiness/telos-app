import * as React from 'react'
import { cx } from '../utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label shown above the select. */
  label?: string
  /** Options to render. A placeholder can be passed as the first option with an empty value. */
  options: SelectOption[]
}

/**
 * A labelled dropdown, styled to match the other form fields
 * (dark field, accent focus ring, dark option list).
 */
export function Select({ label, options, className, id, ...rest }: SelectProps) {
  const selectId = id || (label ? `tls-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  return (
    <label className="tls-field" htmlFor={selectId}>
      {label && <span className="tls-label">{label}</span>}
      <select id={selectId} className={cx('tls-select', className)} {...rest}>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
