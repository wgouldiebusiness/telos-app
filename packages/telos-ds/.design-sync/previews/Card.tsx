import * as React from 'react'
import { Card, BrandScope, Eyebrow, Heading, Button } from 'telos-ds'

const frame: React.CSSProperties = { background: '#0c0a12', padding: '32px', fontFamily: 'Inter, sans-serif' }

export function Default() {
  return (
    <BrandScope style={frame}>
      <Card style={{ maxWidth: 420 }}>
        <Eyebrow accent>Built in from day one</Eyebrow>
        <Heading level="h3" style={{ margin: '10px 0 8px' }}>Wired into your AI agents</Heading>
        <p style={{ margin: '0 0 18px', color: 'rgba(255,255,255,0.66)', fontSize: 15, lineHeight: 1.6 }}>
          Every Telos site connects to your receptionist, follow-up and chat from launch.
        </p>
        <Button size="sm">See how it works</Button>
      </Card>
    </BrandScope>
  )
}

export function Flush() {
  return (
    <BrandScope style={frame}>
      <Card padded={false} style={{ maxWidth: 420, padding: 20 }}>
        <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>A flush card, no default padding.</span>
      </Card>
    </BrandScope>
  )
}
