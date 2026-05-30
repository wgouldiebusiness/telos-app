'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo/Logo'
import styles from './PageIntro.module.css'

export default function PageIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (!sessionStorage.getItem('telos-intro-shown')) {
      setShow(true)
      sessionStorage.setItem('telos-intro-shown', '1')
      const t = setTimeout(() => setShow(false), 900)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Logo size="lg" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
