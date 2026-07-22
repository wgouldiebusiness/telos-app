import * as React from 'react'
import { cx } from '../utils'

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tint the kicker with the accent colour instead of muted grey. */
  accent?: boolean
}

/**
 * The small uppercase, wide-tracked kicker label that sits above headings
 * ("SEE IT LIVE", "LEGAL · TERMS"). Rendered in Inter, not a mono face.
 */
export function Eyebrow({ accent = false, className, children, ...rest }: EyebrowProps) {
  return (
    <span className={cx('tls-eyebrow', accent && 'tls-eyebrow--accent', className)} {...rest}>
      {children}
    </span>
  )
}
