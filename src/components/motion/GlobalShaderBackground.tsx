'use client'
import { usePathname } from 'next/navigation'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './GlobalShaderBackground.module.css'

type Theme = {
  colors: [string, string, string, string, string]
  bg: string
  bgMobile: string
  blob1: string
  blob2: string
}

const THEMES: Record<string, Theme> = {
  media: {
    colors: ['#000000', '#001A14', '#0D6B52', '#003828', '#001F18'],
    bg:       'radial-gradient(ellipse 80% 60% at 30% 30%, #0d3828 0%, #000 60%), radial-gradient(ellipse 60% 50% at 75% 80%, #082218 0%, #000 70%)',
    bgMobile: 'radial-gradient(ellipse 115% 78% at 25% 16%, #0F5640 0%, #062D20 44%, #02110B 100%), radial-gradient(ellipse 95% 68% at 82% 88%, #0C7555 0%, transparent 60%)',
    blob1: 'radial-gradient(circle, rgba(0,200,165,.36) 0%, rgba(0,140,115,.10) 50%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(0,212,180,.24) 0%, rgba(0,150,130,.08) 50%, transparent 70%)',
  },
  websites: {
    colors: ['#000000', '#1A0000', '#8C1808', '#380000', '#080000'],
    bg:       'radial-gradient(ellipse 80% 60% at 30% 30%, #3A0800 0%, #000 60%), radial-gradient(ellipse 60% 50% at 75% 80%, #220300 0%, #000 70%)',
    bgMobile: 'radial-gradient(ellipse 115% 78% at 25% 16%, #8E1F0A 0%, #420F02 44%, #180400 100%), radial-gradient(ellipse 95% 68% at 82% 88%, #6E1706 0%, transparent 60%)',
    blob1: 'radial-gradient(circle, rgba(200,40,20,.36) 0%, rgba(140,20,10,.10) 50%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(180,30,14,.24) 0%, rgba(120,15,8,.08) 50%, transparent 70%)',
  },
  default: {
    colors: ['#000000', '#06003C', '#6040CC', '#1C0060', '#020010'],
    bg:       'radial-gradient(ellipse 80% 60% at 30% 30%, #22104A 0%, #000 60%), radial-gradient(ellipse 60% 50% at 75% 80%, #120830 0%, #000 70%)',
    bgMobile: 'radial-gradient(ellipse 115% 78% at 25% 16%, #3D2090 0%, #1C0D55 44%, #0B0524 100%), radial-gradient(ellipse 95% 68% at 82% 88%, #2C1678 0%, transparent 60%)',
    blob1: 'radial-gradient(circle, rgba(96,64,204,.38) 0%, rgba(60,30,150,.10) 50%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(70,45,180,.26) 0%, rgba(40,20,120,.08) 50%, transparent 70%)',
  },
}

export default function GlobalShaderBackground() {
  const pathname = usePathname()
  const theme = pathname.startsWith('/media') ? THEMES.media
              : pathname.startsWith('/websites') ? THEMES.websites
              : THEMES.default

  return (
    <div
      className={styles.root}
      style={{
        '--shader-bg':        theme.bg,
        '--shader-bg-mobile': theme.bgMobile,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <MeshGradient
        className={styles.layer}
        colors={theme.colors}
        speed={0.22}
      />
      <div className={styles.blob1} style={{ background: theme.blob1 }} />
      <div className={styles.blob2} style={{ background: theme.blob2 }} />
    </div>
  )
}
