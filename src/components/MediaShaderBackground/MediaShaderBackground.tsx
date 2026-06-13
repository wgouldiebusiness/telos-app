'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './MediaShaderBackground.module.css'

export default function MediaShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#1A0000', '#8C1808', '#380000', '#080000']}
        speed={0.22}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
