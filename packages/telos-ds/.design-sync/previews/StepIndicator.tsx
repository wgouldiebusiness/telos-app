import * as React from 'react'
import { StepIndicator, BrandScope } from 'telos-ds'

const frame: React.CSSProperties = {
  background: '#0c0a12', padding: '40px 32px', maxWidth: 560, fontFamily: 'Inter, sans-serif',
}
const steps = ['Business', 'Challenges', 'Services', 'Review']

export function InProgress() {
  return (
    <BrandScope style={frame}>
      <StepIndicator steps={steps} current={1} />
    </BrandScope>
  )
}

export function AlmostDone() {
  return (
    <BrandScope style={frame}>
      <StepIndicator steps={steps} current={3} />
    </BrandScope>
  )
}
