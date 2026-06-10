'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './WebsitesShaderBackground.module.css'

export default function WebsitesShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Deep red mesh gradient */}
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#180302', '#621008', '#2A0502', '#0E0201']}
        speed={0.14}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
