// ─────────────────────────────────────────────────────────────
// Expert agent benchmarks: head-to-head against each niche's
// documented competitor standard.
//
// Usage:  node scripts/agent-benchmarks.mjs
//
// Requires ANTHROPIC_API_KEY in the environment. Without it the script
// prints what it WOULD run and exits 0, so it is safe in CI and safe to
// run before the key exists. With the key, each agent answers a realistic
// task from its niche, and a separate judge pass scores the reply against
// the competitor's documented capability (researched July 2026) plus the
// house mechanical rules. An agent passes when it reaches or exceeds the
// bar (score 8/10 or higher) and breaks no mechanical rule.
//
// No dependencies: reads the registry source directly and calls the
// Anthropic REST API with fetch, the same house pattern as the app.
// ─────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODEL = process.env.EXPERTS_MODEL || 'claude-sonnet-5'
const API_KEY = process.env.ANTHROPIC_API_KEY

// ── Reconstruct each agent's full system prompt from the registry source ──
const src = readFileSync(join(ROOT, 'src/agents/experts/registry.ts'), 'utf8')
const policy = src.split('const SHARED_POLICY = `')[1].split('`')[0]
const slugs = [...src.matchAll(/^\s{4}slug: '([a-z-]+)',$/gm)].map(m => m[1])
const bodies = src.split('systemPrompt: `').slice(1).map(s => s.split('`,')[0])
const prompts = Object.fromEntries(
  slugs.map((slug, i) => [slug, bodies[i].replace('${SHARED_POLICY}', policy)])
)

// ── Benchmark tasks: one realistic job per niche, judged against the
//    competitor's documented standard for that same job. ──
const BENCHMARKS = [
  {
    slug: 'receptionist',
    task: 'I run a two-chair dental practice in Bath. Reception is one person who is often with patients. Write our complete call handling flow including what happens when she cannot answer.',
    standard:
      "Smith.ai's documented AI receptionist standard: 24/7 answering, lead capture on every call, appointment booking, and a written call summary to the owner. A winning answer covers greeting script, capture, qualification, booking offer, the failure path when nobody answers, and the follow-up SLA, all word-for-word usable.",
  },
  {
    slug: 'missed-call',
    task: 'I am a self-employed electrician in Leeds. I miss maybe 10 calls a week when I am on jobs. Give me the complete text-back system: messages, timing, and how I know if it is working.',
    standard:
      "Podium's documented standard: instant text-back after a missed call, a conversation that moves to booking, and automated review requests afterwards. A winning answer includes the exact first text, the full timed sequence with a stop rule, segment handling, a reply SLA, and the five measurement numbers.",
  },
  {
    slug: 'content',
    task: 'Build me a month of content for my mobile dog grooming business in Cardiff. I have a phone, no editing skills, and about two hours a week.',
    standard:
      "Jasper's documented standard: brand-voice-consistent, complete campaign artefacts covering plan, create, adapt, activate. A winning answer is a dated month plan with written captions and hooks (not category names), shot lists doable on a phone, and a sustainable rhythm of 2 to 3 posts a week.",
  },
  {
    slug: 'analyst',
    task: 'My cleaning business: March revenue 9200 profit 2100, April revenue 10100 profit 1900, May revenue 11300 profit 1650. Two new starters in April. What is going on and what should I do?',
    standard:
      "The documented standard of Power BI Copilot or Julius AI: restate the data cleanly and describe the trend. A winning answer goes further: names the margin compression, decomposes the likely causes (labour cost of new starters versus utilisation), shows the arithmetic inline, and ends with one decision or experiment with a threshold.",
  },
  {
    slug: 'pipeline',
    task: 'I install kitchens. I send about 8 quotes a month, average 14 grand, and roughly half just go silent. Design my complete follow-up system.',
    standard:
      "Instantly.ai and HubSpot's documented standard: multi-step sequences with automation plumbing. A winning answer supplies what those tools cannot: every chase message written in full, timed for a 14k considered purchase, a quote-presentation step, qualification wording, and the easy-no close-off.",
  },
  {
    slug: 'leads',
    task: 'New gardening business in Sheffield, month two, three customers so far. I have 500 pounds for marketing. Where do my next 20 customers come from?',
    standard:
      "Apollo.io documents AI campaigns for B2B; Checkatrade and Bark sell local leads; Podium documents webchat capture. A winning answer sequences channels by return on effort for a local consumer trade (Google Business Profile, reviews, referrals before paid), carries honest arithmetic for the 500 pounds, includes paste-ready artefacts, and ties every lead source to an instant-response plan.",
  },
  {
    slug: 'web',
    task: 'My roofing company website gets around 400 visits a month but 2 or 3 enquiries. Tear it down: what is almost certainly wrong and what do I fix first?',
    standard:
      "Unbounce's documented standard: AI copy, A/B testing, and benchmarks from 57 million conversions. A winning answer applies a concrete teardown rubric to the likely failures at under 1 percent conversion, ranks fixes by revenue impact with effort ratings, gives the headline formula and above-the-fold inventory, and treats response speed as part of the site.",
  },
]

// ── Mechanical rules every reply must pass regardless of judge score ──
const MECHANICAL = [
  ['no em dashes', r => !r.includes('—')],
  ['no markdown symbols', r => !/[*#`]/.test(r)],
  ['no prompt leakage', r => !['CONDUCT RULES (these override', 'ADVANCED PLAYBOOK:', 'COMPETITOR BAR (researched'].some(m => r.includes(m))],
  ['substantial (not a sketch)', r => r.length > 800],
]

async function ask(system, userContent, maxTokens = 2000) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userContent }],
    }),
  })
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}

const JUDGE_SYSTEM = `You are a strict benchmark judge. You are given a competitor's documented standard for a job, and a reply from an agent attempting that job. Score how well the reply reaches or exceeds the competitor standard.

Score 1 to 10:
- 10: clearly exceeds the documented standard; complete, specific, ready to use.
- 8 to 9: reaches the standard; a customer would not miss the competitor product for this job.
- 5 to 7: partially there; notable gaps versus the documented standard.
- 1 to 4: generic or incomplete; below the standard.

Penalise: vague category-level advice where the standard demands complete artefacts, invented precise statistics, ignoring the stated constraints of the user, and anything left as a sketch.

Reply with EXACTLY this format and nothing else:
SCORE: <number>
VERDICT: <one sentence on the decisive factor>`

async function main() {
  if (!API_KEY) {
    console.log('SKIP: ANTHROPIC_API_KEY is not set.')
    console.log(`Would benchmark ${BENCHMARKS.length} agents against their competitor bars using model ${MODEL}:`)
    for (const b of BENCHMARKS) console.log(`  - ${b.slug}: ${b.standard.split(':')[0]}`)
    console.log('Set the key and re-run: ANTHROPIC_API_KEY=... node scripts/agent-benchmarks.mjs')
    process.exit(0)
  }

  let passed = 0
  const results = []
  for (const b of BENCHMARKS) {
    const prompt = prompts[b.slug]
    if (!prompt) {
      results.push({ slug: b.slug, ok: false, note: 'prompt not found in registry' })
      continue
    }
    process.stdout.write(`${b.slug}: answering... `)
    const reply = await ask(prompt, b.task)

    const mechFails = MECHANICAL.filter(([, fn]) => !fn(reply)).map(([name]) => name)

    process.stdout.write('judging... ')
    const judged = await ask(
      JUDGE_SYSTEM,
      `COMPETITOR STANDARD:\n${b.standard}\n\nUSER TASK:\n${b.task}\n\nAGENT REPLY:\n${reply}`,
      300
    )
    const score = Number(judged.match(/SCORE:\s*(\d+)/)?.[1] ?? 0)
    const verdict = judged.match(/VERDICT:\s*(.+)/)?.[1]?.trim() ?? '(no verdict)'

    const ok = score >= 8 && mechFails.length === 0
    if (ok) passed++
    results.push({ slug: b.slug, ok, score, verdict, mechFails })
    console.log(ok ? 'PASS' : 'FAIL')
  }

  console.log('\n── Results vs competitor bars ──')
  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.slug.padEnd(12)} score=${r.score ?? '-'}  ${r.verdict ?? r.note ?? ''}`)
    if (r.mechFails?.length) console.log(`      mechanical failures: ${r.mechFails.join(', ')}`)
  }
  console.log(`\n${passed}/${BENCHMARKS.length} agents reach or exceed their competitor bar (model: ${MODEL})`)
  process.exit(passed === BENCHMARKS.length ? 0 : 1)
}

main().catch(err => {
  console.error('Benchmark run failed:', err.message)
  process.exit(1)
})
