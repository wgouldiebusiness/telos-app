import * as React from 'react'
import { cx } from '../utils'

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Ordered step labels. */
  steps: string[]
  /** Zero-based index of the current step. Earlier steps show as done. */
  current: number
}

/**
 * The multi-step progress rail from the onboarding wizard: numbered
 * circles joined by lines, with done / active / upcoming states. Done
 * steps and their connecting lines take the accent colour.
 */
export function StepIndicator({ steps, current, className, ...rest }: StepIndicatorProps) {
  return (
    <ol className={cx('tls-steps', className)} aria-label="Progress" {...rest}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'upcoming'
        return (
          <li key={label} className="tls-step">
            <span className={`tls-step__circle tls-step__circle--${state}`}>
              {state === 'done' ? '✓' : i + 1}
            </span>
            <span className={cx('tls-step__label', state === 'upcoming' && 'tls-step__label--muted')}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <span className={cx('tls-step__line', i < current && 'tls-step__line--done')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
