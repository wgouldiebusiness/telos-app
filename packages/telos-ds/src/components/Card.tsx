import * as React from 'react'
import { cx } from '../utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply the default inner padding. Set false for a flush container. */
  padded?: boolean
}

/**
 * A translucent "glass" surface that floats over the dark background.
 * The building block for panels, forms and callouts.
 */
export function Card({ padded = true, className, children, ...rest }: CardProps) {
  return (
    <div className={cx('tls-card', padded && 'tls-card--pad', className)} {...rest}>
      {children}
    </div>
  )
}
