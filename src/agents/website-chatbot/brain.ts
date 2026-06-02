// ─────────────────────────────────────────────────────────────
// Telos Chatbot — its own brain. No external AI, no API key, no cost.
//
// It matches a visitor's message against the FAQ list below by keywords.
// Best match wins. If nothing matches confidently, it warmly points them
// to book a meeting. Edit the FAQs in ONE place: the `faqs` array.
// ─────────────────────────────────────────────────────────────

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || 'https://telosai.co.uk/contact'

export const GREETING =
  'Hi, I am Telos. Ask me anything about what we build, our pricing, or how we could help your business.'

// Sent when the bot is not confident it can answer — this is the desired
// behaviour for anything unsure or specific to the visitor's own business.
const FALLBACK =
  `That is a great question, and the best way to get a proper answer for your business is a quick chat. You can book a free 15 minute meeting here: ${BOOKING_URL} — no pressure, no pitch.`

interface Faq {
  // Any of these phrases appearing in the message counts as a hit.
  keywords: string[]
  answer: string
}

const faqs: Faq[] = [
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'expensive', 'budget', 'per month', 'monthly'],
    answer: `Plans start from £100 a month, with Growth around £250 a month and Bespoke priced on the build. Every plan includes a one-off build fee, scoped and agreed before we start. The exact fit is agreed on a short call. Want to book one? ${BOOKING_URL}`,
  },
  {
    keywords: ['how long', 'setup', 'set up', 'timeline', 'how fast', 'how quickly', 'live', 'turnaround', 'time to'],
    answer: 'Most builds are live within two weeks. We handle everything and you approve it before anything goes live.',
  },
  {
    keywords: ['contract', 'lock in', 'lock-in', 'cancel', 'commitment', 'minimum term', 'tied in', 'notice'],
    answer: 'No minimum contract. Plans run monthly and you can cancel with reasonable notice. We earn your business by delivering, not by locking you in.',
  },
  {
    keywords: ['what do you', 'what does telos', 'services', 'what can you', 'offer', 'build', 'do you do', 'what is telos'],
    answer: 'We build custom AI agents for service businesses: AI receptionists, website chat assistants, lead follow-up, CRM automation, and missed-call recovery. Everything is custom coded for your business.',
  },
  {
    keywords: ['chatgpt', 'off the shelf', 'off-the-shelf', 'different', 'difference', 'why not just', 'template'],
    answer: 'Off-the-shelf tools are generic and make you fit the software. We build custom systems trained on your business, your voice, and your clients, so it works the way you already do.',
  },
  {
    keywords: ['technical', 'do i need to', 'coding', 'know how', 'difficult', 'complicated', 'hard to'],
    answer: 'Not at all. You tell us how your business works and what you want handled, and we build and manage everything. You just approve it before it goes live.',
  },
  {
    keywords: ['what kind of business', 'who do you work', 'industry', 'clinic', 'trade', 'salon', 'gym', 'suitable for', 'right for'],
    answer: 'We work with UK service businesses: clinics, trades, fitness studios, salons, and similar. If your business runs on bookings and client relationships, it is a good fit.',
  },
  {
    keywords: ['build fee', 'setup fee', 'one off', 'one-off', 'upfront', 'what does the fee'],
    answer: 'The one-off build fee covers designing, building, testing, and installing your system. It is scoped and agreed upfront so there are no surprises. The monthly fee then covers maintenance, monitoring, and support.',
  },
  {
    keywords: ['book', 'meeting', 'call', 'discovery', 'speak to', 'talk to', 'get started', 'sign up', 'contact', 'email'],
    answer: `Brilliant. You can book a free 15 minute meeting with William here: ${BOOKING_URL}. It is a relaxed chat to see what is possible, no pressure.`,
  },
  {
    keywords: ['where are you', 'uk', 'based', 'location', 'area', 'london', 'england'],
    answer: 'We are UK based and work with UK service businesses.',
  },
  {
    keywords: ['results', 'guarantee', 'roi', 'return', 'proof', 'case study', 'case studies'],
    answer: 'We are in our early client phase and will share real, verified results as clients give permission. We do not invent numbers or guarantee specific outcomes. What we can do is build a system that recovers leads and saves you admin time.',
  },
]

const GREETING_WORDS = ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'yo', 'hiya']
const THANKS_WORDS = ['thanks', 'thank you', 'cheers', 'ta', 'appreciate']

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Return the bot's reply to a visitor message. Pure, deterministic, free. */
export function answer(message: string): string {
  const text = normalise(message)
  if (!text) return GREETING

  // Short pure greetings.
  if (text.split(' ').length <= 3 && GREETING_WORDS.some(w => text.split(' ').includes(w))) {
    return GREETING
  }
  // Thanks.
  if (THANKS_WORDS.some(w => text.includes(w)) && text.split(' ').length <= 4) {
    return `You are very welcome. If anything else comes up, just ask, or book a meeting here: ${BOOKING_URL}`
  }

  // Score each FAQ by how many of its keywords appear in the message.
  let best: Faq | null = null
  let bestScore = 0
  for (const faq of faqs) {
    let score = 0
    for (const kw of faq.keywords) {
      if (text.includes(normalise(kw))) score++
    }
    if (score > bestScore) {
      bestScore = score
      best = faq
    }
  }

  return best && bestScore > 0 ? best.answer : FALLBACK
}
