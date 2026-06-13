'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#06003C', '#6040CC', '#1C0060', '#020010']}
        speed={0.22}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.blob4} />
    </div>
  )
}
