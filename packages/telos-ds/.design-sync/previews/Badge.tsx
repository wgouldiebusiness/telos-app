import * as React from 'react'
import { Badge, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', fontFamily: 'Inter, sans-serif',
}

export function Brands() {
  return (
    <div style={frame}>
      <BrandScope brand="telos"><Badge dot>Telos AI</Badge></BrandScope>
      <BrandScope brand="websites"><Badge dot>Telos Websites</Badge></BrandScope>
      <BrandScope brand="media"><Badge dot>Telos Media</Badge></BrandScope>
      <BrandScope><Badge>Waitlist</Badge></BrandScope>
    </div>
  )
}
