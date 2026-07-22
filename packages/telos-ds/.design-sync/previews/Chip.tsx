import * as React from 'react'
import { Chip, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', display: 'flex', gap: 10, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif',
}

export function SelectedAndUnselected() {
  return (
    <BrandScope style={frame}>
      <Chip active>Custom software</Chip>
      <Chip active>AI agents</Chip>
      <Chip>Workflow automation</Chip>
      <Chip>Systems integration</Chip>
      <Chip>Ongoing support</Chip>
    </BrandScope>
  )
}
