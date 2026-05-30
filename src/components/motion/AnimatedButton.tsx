import Link from 'next/link'
import styles from './AnimatedButton.module.css'

interface AnimatedButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  target?: string
}

export default function AnimatedButton({
  href,
  onClick,
  variant = 'primary',
  children,
  className,
  type = 'button',
  disabled,
  target,
}: AnimatedButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ''}`

  if (href) {
    return (
      <Link href={href} className={cls} target={target}>
        <span className={styles.label}>{children}</span>
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}
