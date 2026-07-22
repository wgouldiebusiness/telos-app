import * as React from 'react'
import { BrandScope, Card, Eyebrow, Heading, Button } from 'telos-ds'

const outer: React.CSSProperties = {
  background: '#0c0a12', padding: '28px', display: 'flex', gap: 16, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif',
}

function Panel({ brand, name }: { brand: 'telos' | 'websites' | 'media'; name: string }) {
  return (
    <BrandScope brand={brand}>
      <Card style={{ width: 240 }}>
        <Eyebrow accent>{name}</Eyebrow>
        <Heading level="h3" style={{ margin: '8px 0 14px' }}>Same components.</Heading>
        <Button size="sm">Get started</Button>
      </Card>
    </BrandScope>
  )
}

export function ThreeBrands() {
  return (
    <div style={outer}>
      <Panel brand="telos" name="Telos AI" />
      <Panel brand="websites" name="Telos Websites" />
      <Panel brand="media" name="Telos Media" />
    </div>
  )
}
