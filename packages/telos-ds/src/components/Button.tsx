import * as React from 'react'
import { cx } from '../utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary is the solid accent pill; secondary is outlined; ghost is text-only. */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size of the button. */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * The Telos pill button. Primary = solid accent, secondary = outlined,
 * ghost = quiet text. The accent follows the nearest BrandScope
 * (purple by default, red for Websites, teal for Media).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx('tls-btn', `tls-btn--${variant}`, `tls-btn--${size}`, className)}
      {...rest}
    >
      {children}
    </button>
  )
}
