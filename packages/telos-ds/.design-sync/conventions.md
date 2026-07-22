# Telos AI design system

Telos AI builds and manages custom software, automation, and AI agents for
ambitious service businesses. The look is calm, modern and confident: dark by
default, Inter throughout, a purple accent, plenty of space, one clear action
per screen. Restraint like Apple or Linear, aimed at small-business owners.
British English in all copy, and never any em dashes.

## Setup

Import the stylesheet once at the app root, then use the components:

```jsx
import 'telos-ds/styles.css'
import { BrandScope, Backdrop, Eyebrow, Heading, Button } from 'telos-ds'
```

Everything renders on a dark background. Put content on a `Backdrop` (the
near-black surface with the accent glow) or your own dark surface. The
components do not need a provider to work, but the accent colour is set by
the nearest `BrandScope`.

## Theming: one accent token, three brands

The accent is a single CSS variable, `--tls-accent`. Wrap a subtree in
`BrandScope` to switch it. Nothing else changes.

- `<BrandScope brand="telos">`  → purple (#7868E6) — the default, main Telos AI
- `<BrandScope brand="websites">` → red (#E8352A) — Telos Websites
- `<BrandScope brand="media">` → teal (#00D4B4) — Telos Media

So a Websites landing page is the same components in red; a Media page is teal.

## Components

Compose designs from these exported components (import from `telos-ds`), never
hand-rolled markup:

- Layout / brand: `BrandScope`, `Backdrop`, `Card` (glass surface)
- Type: `Heading` (level: display | h1 | h2 | h3), `Eyebrow` (uppercase kicker)
- Actions: `Button` (variant: primary | secondary | ghost; size: sm | md | lg),
  `Chip` (selectable pill), `Badge` (accent tag)
- Forms: `TextField`, `Textarea`, `Select`
- Flows: `StepIndicator` (multi-step progress), `SuccessPanel` (confirmation)
- Docs: `TocNav` (sticky table-of-contents rail)

## Styling idiom

Style with the components and their props first. For your own layout glue,
use the design tokens (CSS variables), never invented colours or fonts. The
real names live in `styles/tokens.css` (bound here as the stylesheet). Key
tokens:

- Accent: `--tls-accent`, `--tls-accent-2` (hover), `--tls-accent-dim` (tints)
- Surfaces: `--tls-bg`, `--tls-surface`, `--tls-border`
- Text: `--tls-text`, `--tls-text-2` (secondary), `--tls-text-muted`
- Type: `--tls-font` (Inter), headings are weight 800 with tight tracking
- Radii: `--tls-radius-md`, `--tls-radius-lg`, `--tls-radius-pill` (980px pills)

Do not introduce Space Grotesk, serifs, a mono face, an orange accent, or a
light/cream background. The brand is Inter + dark + the accent token.

## One idiomatic example

```jsx
<BrandScope brand="telos">
  <Backdrop style={{ padding: '64px', maxWidth: 560, margin: '0 auto' }}>
    <Eyebrow accent>Waitlist</Eyebrow>
    <Heading level="h1" style={{ margin: '14px 0 24px' }}>
      Be first in line when a build opens up.
    </Heading>
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField label="Email" required type="email" placeholder="you@company.com" />
        <Button variant="primary" size="lg">Join the waitlist →</Button>
      </div>
    </Card>
  </Backdrop>
</BrandScope>
```
