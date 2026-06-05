import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Telos AI: Custom AI agents for service businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow blob */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,50,180,0.4) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(60,40,160,0.3) 0%, transparent 70%)',
        }} />

        {/* T logo mark */}
        <svg width="64" height="76" viewBox="0 0 32 38" fill="none" style={{ marginBottom: 24 }}>
          <rect x="0" y="0" width="32" height="8" fill="#7868E6"/>
          <rect x="12" y="8" width="8" height="30" fill="#ffffff"/>
        </svg>

        {/* Wordmark */}
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: 16,
        }}>
          Telos AI
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 28,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          maxWidth: 700,
        }}>
          Custom AI agents for your business.
        </div>

        {/* Purple line accent */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 3,
          background: '#7868E6',
          borderRadius: 2,
        }} />
      </div>
    ),
    { ...size }
  )
}
