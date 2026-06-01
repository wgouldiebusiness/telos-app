'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Deep near-black with dark purple undertones — "Black Panther" palette */}
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#04000E', '#3D2E7C', '#000000', '#060010']}
        speed={0.08}
      />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.blob4} />
    </div>
  )
}
