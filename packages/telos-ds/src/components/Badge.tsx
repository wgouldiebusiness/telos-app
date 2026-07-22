import * as React from 'react'
import { cx } from '../utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the leading accent dot. */
  dot?: boolean
}

/**
 * A small outlined pill in the accent colour, used for status and
 * sub-brand tags ("Waitlist", "Telos Websites"). Wrap in a BrandScope
 * to colour it red (Websites) or teal (Media).
 */
export function Badge({ dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('tls-badge', className)} {...rest}>
      {dot && <span className="tls-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
