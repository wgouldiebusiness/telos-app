'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.12 })
  const [done, setDone] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      onAnimationComplete={() => setDone(true)}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      style={done ? {} : { willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}
