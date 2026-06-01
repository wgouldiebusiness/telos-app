'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo/Logo'
import styles from './LampIntro.module.css'

export default function LampIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (!sessionStorage.getItem('telos-intro-shown')) {
      setShow(true)
      sessionStorage.setItem('telos-intro-shown', '1')
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
          onClick={() => setShow(false)}
        >
          {/* Lamp container */}
          <div className={styles.lamp}>

            {/* Left cone */}
            <motion.div
              className={`${styles.cone} ${styles.coneLeft}`}
              initial={{ width: '8rem', opacity: 0.5 }}
              animate={{ width: '30rem', opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
            >
              <div className={styles.coneMaskBottom} />
              <div className={styles.coneMaskLeft} />
            </motion.div>

            {/* Right cone */}
            <motion.div
              className={`${styles.cone} ${styles.coneRight}`}
              initial={{ width: '8rem', opacity: 0.5 }}
              animate={{ width: '30rem', opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
            >
              <div className={styles.coneMaskBottom} />
              <div className={styles.coneMaskRight} />
            </motion.div>

            {/* Dark overlay below cones */}
            <div className={styles.darkBelow} />

            {/* Centre glow blob */}
            <motion.div
              className={styles.glowBlob}
              initial={{ width: '8rem' }}
              animate={{ width: '16rem' }}
              transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
            />

            {/* Horizontal line */}
            <motion.div
              className={styles.line}
              initial={{ width: '8rem' }}
              animate={{ width: '30rem' }}
              transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
            />

            {/* Top dark mask */}
            <div className={styles.darkTop} />
          </div>

          {/* Logo + wordmark */}
          <motion.div
            className={styles.brand}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size="lg" dark />
            <span className={styles.wordmark}>Telos AI</span>
          </motion.div>

          {/* Auto-dismiss */}
          <AutoDismiss onDismiss={() => setShow(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 1800)
    return () => clearTimeout(t)
  }, [onDismiss])
  return null
}
