import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components'
import * as s from './shared'

/**
 * Nurture email 4 of 4 (day 14): the direct ask.
 * One clear invitation to book a call, and a clean way out.
 * Scheduled at signup via lib/resend/nurture.ts.
 */
export interface WaitlistCallProps {
  name?: string
}

export default function WaitlistCall({ name }: WaitlistCallProps) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return (
    <Html>
      <Head />
      <Preview>Fifteen minutes, no pitch. Worth a chat?</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={s.brand}>TELOS&nbsp;AI</Text>
          <Heading style={s.h1}>Want to talk it through?</Heading>

          <Text style={s.text}>{greeting}</Text>
          <Text style={s.text}>
            You joined the Telos waitlist a couple of weeks back. If a better
            website or fewer missed calls is still on your mind, the quickest
            way forward is a 15 minute call.
          </Text>
          <Text style={s.text}>
            We&rsquo;ll look at your business, tell you exactly what we&rsquo;d
            build and what it would cost, and you leave with clarity either
            way. No pressure and no pitch. If it&rsquo;s not a fit, I&rsquo;ll
            say so.
          </Text>

          <Button href="https://telosai.co.uk/contact" style={s.button}>
            Book a 15 minute call
          </Button>

          <Text style={s.text}>
            And if now&rsquo;s not the time, no hard feelings. This is the last
            email in this little series, so you won&rsquo;t hear from me again
            unless something genuinely worth your time comes up.
          </Text>
          <Text style={s.text}>Will</Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Telos&nbsp;AI &middot; Bristol, UK &middot; telosai.co.uk
          </Text>
          <Text style={s.unsubscribe}>
            Not useful? Just reply &ldquo;no thanks&rdquo; and I&rsquo;ll stop
            emailing.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
