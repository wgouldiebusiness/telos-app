'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo/Logo'
import styles from './LampIntro.module.css'

export default function LampIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          onClick={() => setShow(false)}
        >
          {/* Left cone */}
          <motion.div
            className={`${styles.cone} ${styles.coneLeft}`}
            initial={{ width: '6rem', opacity: 0.4 }}
            animate={{ width: '28rem', opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />

          {/* Right cone */}
          <motion.div
            className={`${styles.cone} ${styles.coneRight}`}
            initial={{ width: '6rem', opacity: 0.4 }}
            animate={{ width: '28rem', opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />

          {/* Glow line */}
          <motion.div
            className={styles.line}
            initial={{ width: '6rem' }}
            animate={{ width: '28rem' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />

          {/* Dark masks */}
          <div className={styles.maskBottom} />
          <div className={styles.maskTop} />

          {/* Logo */}
          <motion.div
            className={styles.brand}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size="lg" dark />
            <span className={styles.wordmark}>Telos AI</span>
          </motion.div>

          <AutoDismiss onDismiss={() => setShow(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 1700)
    return () => clearTimeout(t)
  }, [onDismiss])
  return null
}
