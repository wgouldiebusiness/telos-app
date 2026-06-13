'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './MediaShaderBackground.module.css'

export default function MediaShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#001A14', '#0D6B52', '#003828', '#001F18']}
        speed={0.22}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  )
}
