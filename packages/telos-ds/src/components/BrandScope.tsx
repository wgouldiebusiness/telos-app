import * as React from 'react'
import { cx } from '../utils'

export type Brand = 'telos' | 'websites' | 'media'

export interface BrandScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which brand's accent to apply to everything inside. */
  brand?: Brand
}

/**
 * Sets the active accent for its subtree. The default (telos) is purple;
 * "websites" turns everything red and "media" turns it teal. Wrap a
 * section, a card, or a whole page. Every Telos component reads the accent
 * token, so nothing else needs changing.
 */
export function BrandScope({ brand = 'telos', className, children, ...rest }: BrandScopeProps) {
  return (
    <div
      className={cx('tls-root', className)}
      data-brand={brand === 'telos' ? undefined : brand}
      {...rest}
    >
      {children}
    </div>
  )
}
