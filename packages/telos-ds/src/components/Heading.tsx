import * as React from 'react'
import { cx } from '../utils'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual size. "display" is the hero scale. */
  level?: 'display' | 'h1' | 'h2' | 'h3'
  /** Which heading tag to render. Defaults to a sensible tag for the level. */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

const DEFAULT_TAG: Record<NonNullable<HeadingProps['level']>, 'h1' | 'h2' | 'h3'> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
}

/**
 * A tight-tracked, heavy-weight Inter heading. Confident and big, the
 * house display style. Choose a visual `level` and, if needed, override
 * the semantic tag with `as`.
 */
export function Heading({ level = 'h2', as, className, children, ...rest }: HeadingProps) {
  const Tag = (as || DEFAULT_TAG[level]) as React.ElementType
  return (
    <Tag className={cx('tls-heading', `tls-heading--${level}`, className)} {...rest}>
      {children}
    </Tag>
  )
}
