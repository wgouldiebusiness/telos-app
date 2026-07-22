import * as React from 'react'
import { cx } from '../utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label shown above the textarea. */
  label?: string
  /** Shows an "optional" hint next to the label. */
  optional?: boolean
}

/**
 * A labelled multi-line text field, styled to match TextField.
 */
export function Textarea({ label, optional, className, id, ...rest }: TextareaProps) {
  const areaId = id || (label ? `tls-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  return (
    <label className="tls-field" htmlFor={areaId}>
      {label && (
        <span className="tls-label">
          {label}
          {optional && <span className="tls-opt"> optional</span>}
        </span>
      )}
      <textarea id={areaId} className={cx('tls-textarea', className)} {...rest} />
    </label>
  )
}
