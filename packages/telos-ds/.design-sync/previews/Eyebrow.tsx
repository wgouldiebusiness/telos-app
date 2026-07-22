import * as React from 'react'
import { Eyebrow, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif',
}

export function MutedAndAccent() {
  return (
    <BrandScope style={frame}>
      <Eyebrow>See it live</Eyebrow>
      <Eyebrow accent>Waitlist</Eyebrow>
      <Eyebrow>Legal · Terms of Service</Eyebrow>
    </BrandScope>
  )
}
