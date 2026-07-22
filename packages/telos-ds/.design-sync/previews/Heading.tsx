import * as React from 'react'
import { Heading, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 560, fontFamily: 'Inter, sans-serif',
}

export function Scale() {
  return (
    <BrandScope style={frame}>
      <Heading level="display">Customising technology for your business.</Heading>
      <Heading level="h1">Websites built to win clients.</Heading>
      <Heading level="h2">Three steps. No surprises.</Heading>
      <Heading level="h3">The client portal</Heading>
    </BrandScope>
  )
}
