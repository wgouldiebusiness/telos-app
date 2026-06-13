'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './WebsitesShaderBackground.module.css'

export default function WebsitesShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#001818', '#0A7868', '#002828', '#000A08']}
        speed={0.22}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
