import * as React from 'react'
import { SuccessPanel, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', maxWidth: 480, fontFamily: 'Inter, sans-serif',
}

export function Default() {
  return (
    <BrandScope style={frame}>
      <SuccessPanel
        title="You are on the list."
        text="We will email you the moment a slot opens. No spam, no pitch."
      />
    </BrandScope>
  )
}
