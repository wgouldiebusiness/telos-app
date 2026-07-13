// Shared inline styles for all Telos emails.
// Email clients need inline/table-safe CSS, so these are plain objects,
// not CSS modules. Keep every template visually consistent by importing
// from here rather than copying values.

export const body: React.CSSProperties = {
  backgroundColor: '#f5f5f7',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '40px 0',
}

export const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '14px',
  maxWidth: '480px',
  margin: '0 auto',
  padding: '40px 40px 32px',
}

export const brand: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.18em',
  color: '#7868e6',
  margin: '0 0 24px',
}

export const h1: React.CSSProperties = {
  fontSize: '26px',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: '#1d1d1f',
  margin: '0 0 20px',
  lineHeight: 1.1,
}

export const text: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.65,
  color: '#3a3a3c',
  margin: '0 0 16px',
}

export const button: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#7868e6',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '980px',
  margin: '4px 0 20px',
}

export const hr: React.CSSProperties = {
  borderColor: '#e6e6e9',
  margin: '28px 0 16px',
}

export const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#8a8a8f',
  margin: '0 0 6px',
}

export const unsubscribe: React.CSSProperties = {
  fontSize: '12px',
  color: '#8a8a8f',
  margin: 0,
}
