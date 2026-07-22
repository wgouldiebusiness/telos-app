import * as React from 'react'
import { cx } from '../utils'

export interface SuccessPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline (e.g. "You're on the list."). */
  title: string
  /** Supporting sentence below the title. */
  text?: string
}

/**
 * The confirmation state shown after a form submits: an accent check mark,
 * a tight heading, and a calm supporting line. Used by the waitlist and
 * onboarding flows.
 */
export function SuccessPanel({ title, text, className, children, ...rest }: SuccessPanelProps) {
  return (
    <div className={cx('tls-success', className)} {...rest}>
      <span className="tls-success__mark" aria-hidden="true">✓</span>
      <h2 className="tls-success__title">{title}</h2>
      {text && <p className="tls-success__text">{text}</p>}
      {children}
    </div>
  )
}
