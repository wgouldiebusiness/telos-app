'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './WebsitesShaderBackground.module.css'

export default function WebsitesShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Deep red mesh gradient */}
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#0E0302', '#3D0A08', '#000000', '#180302']}
        speed={0.08}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
