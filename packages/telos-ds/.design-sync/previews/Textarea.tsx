import * as React from 'react'
import { Textarea, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', maxWidth: 420, fontFamily: 'Inter, sans-serif',
}

export function Default() {
  return (
    <BrandScope style={frame}>
      <Textarea
        label="Anything else?"
        optional
        rows={4}
        placeholder="Tell us what is slowing your team down."
      />
    </BrandScope>
  )
}
