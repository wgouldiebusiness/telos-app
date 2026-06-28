'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import DottedMap from 'dotted-map'
import styles from './WorldMap.module.css'

// The dotted base map only depends on its colour and is expensive to build,
// so cache the generated SVG per colour at module scope (shared across every
// render, server and client) instead of rebuilding it on each mount.
const svgCache = new Map<string, string>()
function getDottedSvg(color: string): string {
  const cached = svgCache.get(color)
  if (cached) return cached
  const map = new DottedMap({ height: 100, grid: 'diagonal' })
  const svg = map.getSVG({
    radius: 0.22,
    color,
    shape: 'circle',
    backgroundColor: 'transparent',
  })
  svgCache.set(color, svg)
  return svg
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
  /** colour of the static dotted base map (hex8 with alpha recommended) */
  dotColor?: string
  animationDuration?: number
}

/**
 * Animated dotted world map with arcing connection paths.
 * Adapted for the Telos codebase: always-dark, brand purple, transparent
 * background so the global shader shows through, CSS Modules (no Tailwind),
 * and no next-themes dependency.
 */
export function WorldMap({
  dots = [],
  lineColor = '#9B8DF5',
  dotColor = '#9B8DF540',
  animationDuration = 2,
}: MapProps) {
  const svgMap = useMemo(() => getDottedSvg(dotColor), [dotColor])

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360)
    const y = (90 - lat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  // ── Two-phase looping timeline (all times in seconds) ──
  // Phase A: every arc draws (nearly) together, holds, then retracts together.
  // Phase B: arcs draw one at a time, alternating sides, hold, retract together.
  // Then it loops back to Phase A, and so on.
  const n = dots.length

  // Order for Phase B: alternate between west- and east-bound destinations,
  // farthest-out first, so it visibly ping-pongs across the map.
  const idx = dots.map((_, i) => i)
  const west = idx.filter(i => dots[i].end.lng < dots[i].start.lng)
                  .sort((a, b) => dots[a].end.lng - dots[b].end.lng)
  const east = idx.filter(i => dots[i].end.lng >= dots[i].start.lng)
                  .sort((a, b) => dots[b].end.lng - dots[a].end.lng)
  const order: number[] = []
  for (let k = 0; k < Math.max(west.length, east.length); k++) {
    if (k < west.length) order.push(west[k])
    if (k < east.length) order.push(east[k])
  }
  const seqPos = new Array(n).fill(0)
  order.forEach((pathIdx, pos) => { seqPos[pathIdx] = pos })

  const staggerA   = 0.12              // Phase A: near-together draw stagger
  const drawA      = animationDuration // Phase A: per-arc draw time
  const holdA      = 2.0               // Phase A: hold fully drawn
  const retract    = 1.0               // retract time (both phases)
  const gap1       = 0.4               // pause between phases
  const stepB      = 0.7               // Phase B: cadence — one arc every 0.7s
  const drawB      = 0.6               // Phase B: per-arc draw time
  const holdB      = 1.2               // Phase B: hold once all have reached
  const gap2       = 0.4               // pause before looping back

  const allDrawnA   = (n - 1) * staggerA + drawA
  const retractStA  = allDrawnA + holdA
  const retractEnA  = retractStA + retract
  const phaseBStart = retractEnA + gap1
  const allDrawnB   = phaseBStart + (n - 1) * stepB + drawB
  const retractStB  = allDrawnB + holdB
  const retractEnB  = retractStB + retract
  const fullCycleDuration = retractEnB + gap2

  // pathLength + travelling-dot keyframes are the same shape for every arc;
  // only the per-arc times differ, computed in the map below.
  const PATH_VALUES  = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
  const DOT_OFFSET   = ['0%', '0%', '100%', '100%', '100%', '0%', '100%', '100%', '100%', '0%']
  const DOT_OPACITY  = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0]

  return (
    <div className={styles.wrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className={styles.dots}
        alt="World map"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className={styles.lines}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="telos-map-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="telos-map-glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)

          const T = (s: number) => s / fullCycleDuration
          const drawStA = i * staggerA
          const drawEnA = i * staggerA + drawA
          const drawStB = phaseBStart + seqPos[i] * stepB
          const drawEnB = drawStB + drawB
          // 10 keyframes: [start, A-draw-start, A-draw-end, A-retract-start,
          //  A-retract-end, B-draw-start, B-draw-end, B-retract-start,
          //  B-retract-end, loop-end]
          const times = [
            0,
            T(drawStA), T(drawEnA), T(retractStA), T(retractEnA),
            T(drawStB), T(drawEnB), T(retractStB), T(retractEnB),
            1,
          ]
          const path = createCurvedPath(startPoint, endPoint)

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#telos-map-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: PATH_VALUES }}
                transition={{
                  duration: fullCycleDuration,
                  times,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              />

              <motion.circle
                r="4"
                fill={lineColor}
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: DOT_OFFSET,
                  opacity: DOT_OPACITY,
                }}
                transition={{
                  duration: fullCycleDuration,
                  times,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
                style={{ offsetPath: `path('${path}')` }}
              />
            </g>
          )
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)

          return (
            <g key={`points-group-${i}`}>
              {[startPoint, endPoint].map((pt, j) => (
                <g key={`pt-${i}-${j}`}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#telos-map-glow)"
                  />
                  <circle cx={pt.x} cy={pt.y} r="3" fill={lineColor} opacity="0.5">
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin={`${j * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin={`${j * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default WorldMap
