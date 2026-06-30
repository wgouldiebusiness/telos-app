import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from '@react-email/components'

/**
 * TRANSACTIONAL email template (React Email).
 *
 * Sent 1:1 to a person right after they join the waitlist. This is the
 * Resend "Emails" product — kept separate from the marketing audience side.
 * Lives in the codebase so the copy is versioned and reviewable.
 */
export interface WaitlistConfirmationProps {
  name?: string
}

export default function WaitlistConfirmation({ name }: WaitlistConfirmationProps) {
  const greeting = name ? `Hi ${name},` : 'Hi there,'

  return (
    <Html>
      <Head />
      <Preview>You&rsquo;re on the Telos AI waitlist.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>TELOS&nbsp;AI</Text>
          <Heading style={h1}>You&rsquo;re on the list.</Heading>

          <Text style={text}>{greeting}</Text>
          <Text style={text}>
            Thanks for joining the Telos&nbsp;AI waitlist. We build and manage
            custom software and intelligent systems for service businesses, and
            we&rsquo;ll be in touch the moment there&rsquo;s a slot worth your
            time.
          </Text>
          <Text style={text}>
            No noise in the meantime &mdash; just a note when it matters.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            Telos&nbsp;AI &middot; Bristol, UK &middot; telosai.co.uk
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

/* ── Inline styles (email clients require inline / table-safe CSS) ── */
const body: React.CSSProperties = {
  backgroundColor: '#f5f5f7',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '40px 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '14px',
  maxWidth: '480px',
  margin: '0 auto',
  padding: '40px 40px 32px',
}

const brand: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.18em',
  color: '#7868e6',
  margin: '0 0 24px',
}

const h1: React.CSSProperties = {
  fontSize: '26px',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: '#1d1d1f',
  margin: '0 0 20px',
  lineHeight: 1.1,
}

const text: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.65,
  color: '#3a3a3c',
  margin: '0 0 16px',
}

const hr: React.CSSProperties = {
  borderColor: '#e6e6e9',
  margin: '28px 0 16px',
}

const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#8a8a8f',
  margin: 0,
}
