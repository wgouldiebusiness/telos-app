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
import * as s from './shared'

/**
 * Nurture email 1 of 4 (day 0): the confirmation.
 * Sent immediately after signup by lib/resend/transactional.tsx.
 * The follow-ups (days 3/8/14) are scheduled by lib/resend/nurture.tsx.
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
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={s.brand}>TELOS&nbsp;AI</Text>
          <Heading style={s.h1}>You&rsquo;re on the list.</Heading>

          <Text style={s.text}>{greeting}</Text>
          <Text style={s.text}>
            Thanks for joining the Telos&nbsp;AI waitlist. We build and manage
            custom software and intelligent systems for service businesses, and
            we&rsquo;ll be in touch the moment there&rsquo;s a slot worth your
            time.
          </Text>
          <Text style={s.text}>
            No noise in the meantime. Just a note when it matters.
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Telos&nbsp;AI &middot; Bristol, UK &middot; telosai.co.uk
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
