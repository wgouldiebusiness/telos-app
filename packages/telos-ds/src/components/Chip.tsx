import * as React from 'react'
import { cx } from '../utils'

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the chip is selected. Selected chips fill with the accent. */
  active?: boolean
}

/**
 * A selectable pill, used for multi-select and single-select choices
 * (challenges, services, budget, timeline). Toggles to the accent fill
 * when active.
 */
export function Chip({ active = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx('tls-chip', active && 'tls-chip--active', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
