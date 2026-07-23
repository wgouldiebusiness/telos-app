'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Respect users who ask for reduced motion — keep native scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      touchMultiplier: 1.2,
      // Smooth-scroll same-page anchor links (/#showcase, /media#services);
      // offset keeps the target clear of the fixed header.
      anchors: { offset: -90 },
    })
    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Jump to the top of the page on every route change. usePathname only
  // changes on a real navigation (never on a same-page #hash scroll), so
  // this fixes cross-page navigation — e.g. Telos AI -> Telos Media —
  // carrying over however far down the previous page the visitor had
  // scrolled, without touching in-page anchor scrolling.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
