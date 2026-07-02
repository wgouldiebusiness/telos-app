'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo/Logo'
import styles from './Header.module.css'

const navLinks = [
  { label: 'Home',       href: '/',          badge: false, badgeColor: '' },
  { label: 'What We Do', href: '/solutions', badge: false, badgeColor: '' },
  { label: 'How It Works',href: '/process',  badge: false, badgeColor: '' },
  { label: 'Pricing',    href: '/pricing',   badge: false, badgeColor: '' },
  { label: 'About',      href: '/about',     badge: false, badgeColor: '' },
  { label: 'Log In',     href: '/login',     badge: false, badgeColor: '' },
]

// Sub-brand badge links — grouped tightly together
const brandLinks = [
  { label: 'Telos Websites', href: '/websites', badgeColor: 'red'  },
  { label: 'Telos Media',    href: '/media',    badgeColor: 'teal' },
]

export default function Header() {
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

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="Telos AI home">
            <Logo size="sm" />
            <span className={styles.wordmark}>Telos</span>
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {/* Sub-brand badges grouped tightly */}
            <div className={styles.brandBadges}>
              {brandLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.badgeColor === 'teal' ? styles.navBadgeTeal : styles.navBadgeRed}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/#waitlist" className={styles.navWaitlist}>
              Join the waitlist
            </Link>
            <Link href="/contact" className={styles.ctaBtn}>
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
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
                  >
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
                    className={`${styles.mobileLink} ${link.badgeColor === 'teal' ? styles.mobileLinkBadgeTeal : styles.mobileLinkBadgeRed}`}
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
                <Link href="/#waitlist" className={styles.mobileLink}>
                  Join the waitlist
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + brandLinks.length + 1) * 0.06, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href="/contact" className={styles.mobileCta}>
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
