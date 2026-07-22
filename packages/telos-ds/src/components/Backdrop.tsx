import * as React from 'react'
import { cx } from '../utils'

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * The signature Telos background: near-black with a soft accent glow
 * bleeding from the top. A static, lightweight stand-in for the site's
 * animated mesh gradient. Colour follows the nearest BrandScope.
 */
export function Backdrop({ className, children, ...rest }: BackdropProps) {
  return (
    <div className={cx('tls-backdrop', className)} {...rest}>
      {children}
    </div>
  )
}
