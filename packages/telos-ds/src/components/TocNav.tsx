import * as React from 'react'
import { cx } from '../utils'

export interface TocItem {
  /** Anchor id the link points at (without the #). */
  id: string
  /** Visible label. */
  label: string
}

export interface TocNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Items to list. */
  items: TocItem[]
  /** id of the currently active section (highlighted with the accent). */
  active?: string
}

/**
 * The sticky table-of-contents rail used on the legal document pages.
 * The active item is highlighted with an accent left-border. Pair with
 * your own scroll-spy to update `active`.
 */
export function TocNav({ items, active, className, ...rest }: TocNavProps) {
  return (
    <nav className={cx('tls-toc', className)} aria-label="On this page" {...rest}>
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cx('tls-toc__link', active === item.id && 'tls-toc__link--active')}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
