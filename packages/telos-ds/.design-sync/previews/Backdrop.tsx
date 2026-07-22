import * as React from 'react'
import { Backdrop, BrandScope, Eyebrow, Heading } from 'telos-ds'

export function Telos() {
  return (
    <BrandScope brand="telos">
      <Backdrop style={{ padding: '56px 40px', minHeight: 220, fontFamily: 'Inter, sans-serif' }}>
        <Eyebrow accent>Telos AI</Eyebrow>
        <Heading level="h1" style={{ margin: '12px 0 0', maxWidth: 460 }}>
          Custom software that runs your admin.
        </Heading>
      </Backdrop>
    </BrandScope>
  )
}

export function Media() {
  return (
    <BrandScope brand="media">
      <Backdrop style={{ padding: '56px 40px', minHeight: 220, fontFamily: 'Inter, sans-serif' }}>
        <Eyebrow accent>Telos Media</Eyebrow>
        <Heading level="h1" style={{ margin: '12px 0 0', maxWidth: 460 }}>
          Content that sounds like you.
        </Heading>
      </Backdrop>
    </BrandScope>
  )
}
