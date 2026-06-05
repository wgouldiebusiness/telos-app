'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './MediaShaderBackground.module.css'

export default function MediaShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Deep teal mesh gradient */}
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#00100D', '#0C4A3C', '#000000', '#001A14']}
        speed={0.08}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
