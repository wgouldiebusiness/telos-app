'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo/Logo'
import styles from './MediaHeader.module.css'

const navLinks = [
  { label: 'What We Do', href: '/media#services' },
  { label: 'Pricing',    href: '/media#pricing'  },
  { label: 'About',      href: '/media/about'    },
  { label: 'Log In',     href: '/media/login'    },
]

const brandLinks = [
  { label: 'Telos AI',       href: '/',         color: 'purple' },
  { label: 'Telos Websites', href: '/websites', color: 'red'    },
]

export default function MediaHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Set cursor accent to teal while on media pages
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-accent', '#00D4B4')
    return () => { document.documentElement.style.removeProperty('--cursor-accent') }
  }, [])

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href="/media" className={styles.brand} aria-label="Telos Media home">
            <Logo size="sm" accentColor="#00D4B4" />
            <span className={styles.wordmark}>Telos Media</span>
          </Link>

          <nav className={styles.nav} aria-label="Media navigation">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.brandBadges}>
              {brandLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.color === 'red' ? styles.badgeRed : styles.badgePurple}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/media#booking" className={styles.ctaBtn}>
              Book a Call
            </Link>
          </nav>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Tap anywhere outside the panel to close */}
            <motion.div
              key="backdrop"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          <motion.div
            key="panel"
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className={styles.mobileLink}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {brandLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + i) * 0.06, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`${styles.mobileLink} ${link.color === 'red' ? styles.mobileRed : styles.mobilePurple}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + brandLinks.length) * 0.06, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href="/media#booking" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
                  Book a Call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
