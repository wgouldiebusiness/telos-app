// ─────────────────────────────────────────────────────────────
// Telos Chatbot — its own brain. No external AI, no API key, no cost.
//
// This is the bot's full knowledge of the business, hand-loaded from the
// website and the product build. It matches a visitor's message against
// the FAQ list by keywords, weighting more specific (longer) phrases
// higher so it picks the best answer. Anything it cannot answer
// confidently goes to "book a meeting".
//
// To teach it something new: add an entry to `faqs`. To change a fact:
// edit it once here. British English. No em dashes. No invented stats.
// ─────────────────────────────────────────────────────────────

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || 'https://telosai.co.uk/contact'

export const GREETING =
  'Hi, I am Telos. Ask me anything about what we build, our pricing, how it works, or how we could help your business.'

const FALLBACK =
  `That is a great question, and the best way to get a proper answer for your business is a quick chat. You can book a free 15 minute meeting here: ${BOOKING_URL} — no pressure, no pitch.`

interface Faq {
  keywords: string[]
  answer: string
}

const faqs: Faq[] = [
  // ── Pricing ──
  {
    keywords: ['how much', 'price', 'pricing', 'cost', 'fee', 'fees', 'expensive', 'budget', 'per month', 'monthly cost', 'afford'],
    answer: `Plans start from £100 a month (Starter, one custom agent), around £250 a month for Growth (multiple agents working together), and Bespoke from about £1,000 a month for full custom infrastructure. Every plan also includes a one-off build fee, scoped and agreed before we start. The right fit is confirmed on a short call. Want to book one? ${BOOKING_URL}`,
  },
  {
    keywords: ['build fee', 'setup fee', 'one off', 'one-off', 'upfront cost', 'what does the fee', 'installation cost'],
    answer: 'The one-off build fee covers designing, building, testing, and installing your system. It is scoped and agreed upfront so there are no surprises. The monthly fee then covers maintenance, monitoring, and ongoing support.',
  },
  {
    keywords: ['starter', 'cheapest', 'basic plan', 'entry', 'one agent', 'single agent'],
    answer: 'The Starter plan is from £100 a month: one custom AI agent, built around your highest-value problem and wired into your existing tools, with a monthly performance report and email support.',
  },
  {
    keywords: ['growth plan', 'multiple agents', 'middle plan'],
    answer: 'The Growth plan is from around £250 a month: two or more agents working together for more coverage, with a live dashboard and priority support. The exact price depends on the number of agents.',
  },
  {
    keywords: ['bespoke', 'enterprise', 'custom infrastructure', 'big build', 'full system'],
    answer: 'Bespoke is full custom AI infrastructure built from the ground up for your business, from around £1,000 a month. It is priced to your requirements and agreed on your call.',
  },

  // ── Setup, process, timeline ──
  {
    keywords: ['how long', 'setup', 'set up', 'timeline', 'how fast', 'how quickly', 'go live', 'turnaround', 'time to build', 'when can'],
    answer: 'Most builds are live within two weeks. We handle everything and you approve it before anything goes live.',
  },
  {
    keywords: ['how does it work', 'how it works', 'process', 'what are the steps', 'what happens', 'next steps', 'getting started', 'get started'],
    answer: `It is four simple steps: a free 15 minute call to learn your business, then we design the system and tell you the full cost, then we build and install it, then we manage and improve it every month. The first step is just a chat: ${BOOKING_URL}`,
  },

  // ── What Telos does / services ──
  {
    keywords: ['what do you', 'what does telos', 'services', 'what can you', 'what you offer', 'what you do', 'do you do', 'what is telos', 'products'],
    answer: 'We build custom AI agents for service businesses: AI receptionists, website chat assistants, lead follow-up, CRM automation, missed-call recovery, lead generation, conversion websites, and content and social. Everything is custom coded for your business.',
  },
  {
    keywords: ['receptionist', 'answer calls', 'answer the phone', 'phone', 'take calls', 'reception'],
    answer: 'Our AI receptionist answers calls, qualifies enquiries, and books appointments around the clock, in your voice. No missed calls and no cold leads from a busy afternoon.',
  },
  {
    keywords: ['missed call', 'missed-call', 'no answer', 'text back', 'sms back', 'callback'],
    answer: 'Missed-call recovery means the moment a call goes unanswered, an intelligent text goes out within seconds to recover the lead and offer to book them in.',
  },
  {
    keywords: ['chat', 'chatbot', 'website assistant', 'live chat', 'web chat'],
    answer: 'Our website chat assistant answers questions in your voice and turns visitors into booked clients, day and night. The chat you are using now is a simple example of what we build.',
  },
  {
    keywords: ['follow up', 'follow-up', 'pipeline', 'crm', 'nurture', 'chase leads', 'lead management'],
    answer: 'Lead follow-up and CRM automation means every lead is captured, organised, and followed up at the right time with the right message, so nothing slips and your pipeline keeps moving.',
  },
  {
    keywords: ['lead generation', 'find leads', 'outreach', 'get more clients', 'new clients', 'prospecting'],
    answer: 'Lead generation is systematic, targeted outreach built around your ideal client, feeding new enquiries straight into your pipeline.',
  },
  {
    keywords: ['website', 'site', 'web design', 'landing page'],
    answer: 'We build fast, conversion-focused websites wired into your agents from day one, built to work rather than just look impressive.',
  },
  {
    keywords: ['content', 'social', 'social media', 'posts', 'instagram', 'facebook', 'marketing content'],
    answer: 'We produce on-brand content and social posts in your voice and publish them on your behalf, so your presence stays active whether you have time or not.',
  },
  {
    keywords: ['review', 'reviews', 'google review', 'reputation'],
    answer: 'We can automatically text happy customers a Google review link after a job, so your rating grows on autopilot.',
  },
  {
    keywords: ['quote', 'quotes', 'invoice', 'invoices', 'chase payment', 'overdue', 'unpaid'],
    answer: 'For trades and service businesses we build agents that follow up on quotes and chase unpaid invoices politely and automatically, in your voice.',
  },

  // ── Differentiator ──
  {
    keywords: ['chatgpt', 'off the shelf', 'off-the-shelf', 'different', 'difference', 'why not just', 'template', 'generic', 'why you', 'why telos'],
    answer: 'Off-the-shelf tools are generic and make you fit the software. We build custom systems trained on your business, your voice, and your clients, so it works the way you already do.',
  },

  // ── Founder / about ──
  {
    keywords: ['who are you', 'who is william', 'who runs', 'founder', 'about you', 'about telos', 'your story', 'background', 'experience', 'who built'],
    answer: 'Telos AI was founded by William Gouldsmith, a Chartered Physiotherapist with experience across the NHS, private practice, and sport. He ran his own clinic, automated his own admin first, and built Telos to do the same for other service businesses.',
  },

  // ── Practicalities ──
  {
    keywords: ['technical', 'do i need to', 'coding', 'know how', 'difficult', 'complicated', 'hard to use', 'tech savvy'],
    answer: 'Not at all. You tell us how your business works and what you want handled, and we build and manage everything. You just approve it before it goes live.',
  },
  {
    keywords: ['contract', 'lock in', 'lock-in', 'cancel', 'commitment', 'minimum term', 'tied in', 'notice period'],
    answer: 'No minimum contract. Plans run monthly and you can cancel with reasonable notice. We earn your business by delivering, not by locking you in.',
  },
  {
    keywords: ['integrate', 'integration', 'tools', 'software', 'crm', 'calendar', 'whatsapp', 'works with', 'connect to', 'existing'],
    answer: 'We integrate with the tools you already use: booking systems, CRMs, email, WhatsApp, calendars, and more. We map your setup on the call and build around it.',
  },
  {
    keywords: ['data', 'gdpr', 'security', 'secure', 'privacy', 'safe', 'data protection'],
    answer: 'We take data protection seriously and handle everything in line with UK GDPR. For the specifics of how your data would be handled, the best answer is a quick call.',
  },
  {
    keywords: ['business', 'work with', 'industry', 'clinic', 'dentist', 'physio', 'trade', 'plumber', 'electrician', 'salon', 'gym', 'fitness', 'coach', 'suitable', 'right for', 'work for'],
    answer: 'We work with UK service businesses: clinics, trades, fitness studios, salons, coaches, and similar. If your business runs on bookings and client relationships, it is a good fit. Tell us about yours on a quick call.',
  },
  {
    keywords: ['where are you', 'based', 'location', 'area', 'london', 'england', 'uk'],
    answer: 'We are UK based and work with UK service businesses.',
  },
  {
    keywords: ['results', 'guarantee', 'roi', 'return on investment', 'proof', 'case study', 'case studies', 'testimonial'],
    answer: 'We are in our early client phase and will share real, verified results as clients give permission. We never invent numbers or guarantee specific outcomes. What we do build is a system that recovers leads and saves you admin time.',
  },
  {
    keywords: ['support', 'help', 'maintenance', 'after build', 'ongoing', 'who manages'],
    answer: 'We manage and improve your system every month: monitoring it, fixing anything that needs adjusting, and developing it as your business grows. You own the results, we do the upkeep.',
  },

  // ── Booking / contact ──
  {
    keywords: ['book', 'meeting', 'call', 'discovery', 'speak to', 'talk to', 'sign up', 'contact', 'email', 'get in touch', 'reach you', 'arrange'],
    answer: `Brilliant. You can book a free 15 minute meeting with William here: ${BOOKING_URL}. It is a relaxed chat to see what is possible, no pressure. You can also email william.gouldsmith@telosai.co.uk.`,
  },
]

const GREETING_WORDS = ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'yo', 'hiya', 'sup']
const THANKS_WORDS = ['thanks', 'thank you', 'cheers', 'ta ', 'appreciate']

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Return the bot's reply to a visitor message. Pure, deterministic, free. */
export function answer(message: string): string {
  const text = normalise(message)
  if (!text) return GREETING

  // Short pure greetings.
  const words = text.split(' ')
  if (words.length <= 3 && GREETING_WORDS.some(w => words.includes(w))) {
    return GREETING
  }
  // Thanks.
  if (THANKS_WORDS.some(w => text.includes(w.trim())) && words.length <= 4) {
    return `You are very welcome. If anything else comes up just ask, or book a meeting here: ${BOOKING_URL}`
  }

  // Score each FAQ. A matched keyword is worth its word count, so a specific
  // phrase like "how much" (2) outranks a generic single word like "gym" (1).
  let best: Faq | null = null
  let bestScore = 0
  for (const faq of faqs) {
    let score = 0
    for (const kw of faq.keywords) {
      const k = normalise(kw)
      if (text.includes(k)) score += k.split(' ').length
    }
    if (score > bestScore) {
      bestScore = score
      best = faq
    }
  }

  return best && bestScore > 0 ? best.answer : FALLBACK
}
