'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import DottedMap from 'dotted-map'
import styles from './WorldMap.module.css'

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
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
  animationDuration = 2,
}: MapProps) {
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: 'diagonal' })
    return map.getSVG({
      radius: 0.22,
      color: '#9B8DF540',
      shape: 'circle',
      backgroundColor: 'transparent',
    })
  }, [])

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

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

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

          const startTime = (i * staggerDelay) / fullCycleDuration
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration
          const path = createCurvedPath(startPoint, endPoint)

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#telos-map-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
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
                  offsetDistance: ['0%', '0%', '100%', '100%', '100%'],
                  opacity: [0, 0, 1, 0, 0],
                }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
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
