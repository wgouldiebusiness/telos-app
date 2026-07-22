import * as React from 'react'
import { Button, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12',
  padding: '32px',
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  alignItems: 'center',
  fontFamily: 'Inter, sans-serif',
}

export function Variants() {
  return (
    <BrandScope style={frame}>
      <Button variant="primary">Book a free call</Button>
      <Button variant="secondary">What we build</Button>
      <Button variant="ghost">Learn more</Button>
    </BrandScope>
  )
}

export function Sizes() {
  return (
    <BrandScope style={frame}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </BrandScope>
  )
}

export function SubBrands() {
  return (
    <div style={{ ...frame, background: '#0c0a12' }}>
      <BrandScope brand="telos"><Button>Telos AI</Button></BrandScope>
      <BrandScope brand="websites"><Button>Telos Websites</Button></BrandScope>
      <BrandScope brand="media"><Button>Telos Media</Button></BrandScope>
    </div>
  )
}
