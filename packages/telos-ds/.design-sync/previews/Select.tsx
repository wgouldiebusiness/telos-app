import * as React from 'react'
import { Select, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '32px', maxWidth: 380, fontFamily: 'Inter, sans-serif',
}

export function Default() {
  return (
    <BrandScope style={frame}>
      <Select
        label="Industry"
        defaultValue="trades"
        options={[
          { label: 'Select an industry', value: '' },
          { label: 'Field and trades', value: 'trades' },
          { label: 'Professional services', value: 'services' },
          { label: 'Hospitality', value: 'hospitality' },
          { label: 'Healthcare', value: 'healthcare' },
        ]}
      />
    </BrandScope>
  )
}
