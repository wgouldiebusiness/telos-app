import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Link,
} from '@react-email/components'
import * as s from './shared'

/**
 * Nurture email 3 of 4 (day 8): the soft case for action.
 * One concrete idea about what a weak web presence costs. No hard sell.
 * Scheduled at signup via lib/resend/nurture.ts.
 */
export interface WaitlistCaseProps {
  name?: string
}

export default function WaitlistCase({ name }: WaitlistCaseProps) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return (
    <Html>
      <Head />
      <Preview>A missed call never costs you just one job.</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Text style={s.brand}>TELOS&nbsp;AI</Text>
          <Heading style={s.h1}>The maths on a missed call.</Heading>

          <Text style={s.text}>{greeting}</Text>
          <Text style={s.text}>
            One thought worth having, whether or not you ever work with us.
          </Text>
          <Text style={s.text}>
            When a call goes unanswered, you don&rsquo;t lose one job. You lose
            that job, plus every referral that customer would have sent you,
            plus the review they&rsquo;d have left. They don&rsquo;t call back.
            They ring the next business on the list.
          </Text>
          <Text style={s.text}>
            A receptionist to catch those calls costs around &pound;22,000 a
            year. The systems we install answer every call, text back every
            missed one, and chase every quote, from &pound;100 a month. That
            gap is the whole reason Telos exists.
          </Text>
          <Text style={s.text}>
            No action needed. But if you want to see what this looks like in
            practice, the{' '}
            <Link href="https://telosai.co.uk/websites" style={{ color: '#7868e6' }}>
              demo sites
            </Link>{' '}
            are still there.
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
