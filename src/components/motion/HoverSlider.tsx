'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import styles from './HoverSlider.module.css'

/* ─────────────────────────────────────────────
   HoverSlider — CSS-Modules port of the 21st.dev
   "animated slideshow" (YoucefBnm). Brand titles
   roll letter-by-letter on hover/active; the matching
   slide crossfades in. Auto-advances on a timer and
   pauses while the user is hovering the titles.
───────────────────────────────────────────── */

interface Ctx {
  activeSlide: number
  changeSlide: (i: number) => void
}
const HoverSliderContext = createContext<Ctx | null>(null)

function useHoverSlider() {
  const ctx = useContext(HoverSliderContext)
  if (!ctx) throw new Error('useHoverSlider must be used within <HoverSlider>')
  return ctx
}

interface HoverSliderProps {
  children: ReactNode
  className?: string
  /** number of slides — required for auto-advance */
  count?: number
  /** ms between auto-advances; 0 disables autoplay */
  autoplayInterval?: number
}

export function HoverSlider({
  children,
  className,
  count = 0,
  autoplayInterval = 3200,
}: HoverSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const changeSlide = useCallback((i: number) => setActiveSlide(i), [])

  // keep latest active in a ref so the interval doesn't reset each tick
  const activeRef = useRef(0)
  activeRef.current = activeSlide

  useEffect(() => {
    if (!count || !autoplayInterval || paused) return
    const id = setInterval(() => {
      setActiveSlide((activeRef.current + 1) % count)
    }, autoplayInterval)
    return () => clearInterval(id)
  }, [count, autoplayInterval, paused])

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div
        className={className}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {children}
      </div>
    </HoverSliderContext.Provider>
  )
}

/* ── Stacked slide stage ── */
export function HoverSliderImageWrap({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${styles.stage} ${className ?? ''}`}>{children}</div>
}

const SLIDE_EASE = [0.16, 1, 0.3, 1] as const

export function HoverSliderImage({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const { activeSlide } = useHoverSlider()
  const isActive = activeSlide === index
  return (
    <motion.div
      className={`${styles.slot} ${className ?? ''}`}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 26,
        scale: isActive ? 1 : 0.94,
      }}
      transition={{ duration: 0.55, ease: SLIDE_EASE }}
      style={{
        zIndex: isActive ? 2 : 1,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
    >
      {children}
    </motion.div>
  )
}

/* ── Per-letter roll title ── */
export function TextStaggerHover({
  text,
  index,
  className,
}: {
  text: string
  index: number
  className?: string
}) {
  const { activeSlide, changeSlide } = useHoverSlider()
  const isActive = activeSlide === index
  const chars = Array.from(text)

  return (
    <button
      type="button"
      className={`${styles.title} ${isActive ? styles.titleActive : ''} ${className ?? ''}`}
      onMouseEnter={() => changeSlide(index)}
      onFocus={() => changeSlide(index)}
      onClick={() => changeSlide(index)}
      aria-pressed={isActive}
    >
      {chars.map((ch, i) => {
        const glyph = ch === ' ' ? ' ' : ch
        return (
          <span key={i} className={styles.charWrap}>
            <motion.span
              className={styles.char}
              animate={{ y: isActive ? '-110%' : '0%' }}
              transition={{ delay: i * 0.018, duration: 0.4, ease: SLIDE_EASE }}
            >
              {glyph}
            </motion.span>
            <motion.span
              className={styles.charAccent}
              aria-hidden="true"
              animate={{ y: isActive ? '0%' : '110%' }}
              transition={{ delay: i * 0.018, duration: 0.4, ease: SLIDE_EASE }}
            >
              {glyph}
            </motion.span>
          </span>
        )
      })}
    </button>
  )
}
