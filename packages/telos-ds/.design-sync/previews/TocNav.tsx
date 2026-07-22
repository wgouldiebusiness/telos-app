import * as React from 'react'
import { TocNav, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', width: 260, fontFamily: 'Inter, sans-serif',
}
const items = [
  { id: 's1', label: '1. Who we are' },
  { id: 's2', label: '2. Using this website' },
  { id: 's3', label: '3. The client portal' },
  { id: 's4', label: '4. Information on this website' },
  { id: 's5', label: '5. Artificial intelligence' },
]

export function Default() {
  return (
    <BrandScope style={frame}>
      <TocNav items={items} active="s2" />
    </BrandScope>
  )
}
