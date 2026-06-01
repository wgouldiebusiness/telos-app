'use client'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <MeshGradient
        className={styles.layer}
        colors={['#000000', '#0A0010', '#7868E6', '#000000', '#0D0820']}
        speed={0.12}
      />
    </div>
  )
}
