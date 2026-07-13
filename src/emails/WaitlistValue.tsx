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
 * Nurture email 2 of 4 (day 3): show, don't tell.
 * Points the reader at the live demo sites so they can judge the work
 * themselves. Scheduled at signup via lib/resend/nurture.ts.
 */
export interface WaitlistValueProps {
  name?: string
}

export default function WaitlistValue({ name }: WaitlistValueProps) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return (
    <Html>
      <Head />
      <Preview>Four demo sites you can scroll like a customer would.</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={s.brand}>TELOS&nbsp;AI</Text>
          <Heading style={s.h1}>Easier to show you than tell you.</Heading>

          <Text style={s.text}>{greeting}</Text>
          <Text style={s.text}>
            Quick one. Rather than explain what Telos builds, have a look at
            four demo sites we put live: a coffee shop, a pizza restaurant, a
            salon, and a professional services firm. Scroll them the way a
            customer would.
          </Text>

          <Button href="https://telosai.co.uk/websites" style={s.button}>
            See the demo sites
          </Button>

          <Text style={s.text}>
            Every one is designed from scratch, built to get a visitor to book
            or call, and wired into AI agents that answer and follow up while
            the owner is busy working. No templates anywhere.
          </Text>
          <Text style={s.text}>
            If one of them looks a bit like your trade, that&rsquo;s roughly
            what your site could be.
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
