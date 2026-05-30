import styles from './Logo.module.css'

interface LogoProps {
  size?: 'sm' | 'lg'
  dark?: boolean
  float?: boolean
  className?: string
}

export default function Logo({ size = 'sm', dark = false, float = false, className }: LogoProps) {
  const isLarge = size === 'lg'
  const w = isLarge ? 52 : 24
  const h = isLarge ? 62 : 28
  const crossH = isLarge ? 13 : 6
  const stemW = isLarge ? 18 : 8
  const stemX = (w - stemW) / 2

  const crossColor = dark ? '#BE9F63' : '#A8884E'
  const stemColor  = dark ? '#F0EADA' : '#163E2B'

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden="true"
      className={`${styles.mark} ${float ? styles.float : ''} ${className ?? ''}`}
    >
      <rect x={0} y={0} width={w} height={crossH} fill={crossColor} />
      <rect x={stemX} y={crossH} width={stemW} height={h - crossH} fill={stemColor} />
    </svg>
  )
}
