import * as React from 'react'
import { TextField, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 380, fontFamily: 'Inter, sans-serif',
}

export function Default() {
  return (
    <BrandScope style={frame}>
      <TextField label="Email" required type="email" placeholder="you@company.com" />
      <TextField label="Business" optional placeholder="What do you run?" />
    </BrandScope>
  )
}

export function WithError() {
  return (
    <BrandScope style={frame}>
      <TextField label="Email" required type="email" defaultValue="not-an-email" error="Enter a valid email so we can reach you." />
    </BrandScope>
  )
}
