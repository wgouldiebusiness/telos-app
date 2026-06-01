'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#080010', '#7868E6', '#000000', '#0D0820']}
        speed={0.1}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.blob4} />
    </div>
  )
}
