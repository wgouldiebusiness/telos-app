---
name: Reliant Integrity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#131f00'
  on-tertiary-container: '#6c8f24'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#c8f17a'
  tertiary-fixed-dim: '#add461'
  on-tertiary-fixed: '#131f00'
  on-tertiary-fixed-variant: '#364e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
  gutter: 24px
  margin-desktop: 80px
---

## Brand & Style
The design system is centered on the concept of "Informed Confidence." It targets homeowners and property managers who value reliability over flashiness. The brand personality is dependable, expert, and composed. 

The visual style is **Corporate / Modern** with strong **Minimalist** influences. It avoids high-pressure sales elements like countdown timers or aggressive red accents. Instead, it uses expansive whitespace, high-quality photography of actual work, and a systematic layout to demonstrate organized professionalism. The goal is to evoke a sense of relief and security—the feeling of knowing a problem is in capable hands.

## Colors
The palette is anchored by a deep Navy (Primary) to establish authority and trust. Soft White (Secondary) serves as the primary background color, providing a clinical sense of cleanliness and room for content to breathe. 

Sage Green (Tertiary) is used sparingly as an accent for "Success" states, call-to-action highlights, and trust indicators (like verified badges or positive review stars). Muted Slate (Neutral) handles secondary text and UI borders to maintain low-contrast transitions. This combination avoids the "emergency" feel of typical service industries, replacing it with a premium, consultative atmosphere.

## Typography
The typography system prioritizes legibility and structure. **Manrope** is used for headings to provide a modern, slightly geometric look that feels contemporary and approachable. **Inter** is the workhorse for body copy and UI labels, chosen for its exceptional readability in data-heavy or instructional contexts.

Line heights are intentionally generous (1.75x for body text) to ensure that service descriptions and reviews are easy to scan. Captions and small labels use an uppercase treatment with increased letter spacing to provide a subtle architectural feel to the information hierarchy.

## Layout & Spacing
This design system utilizes a **Fixed Grid** on desktop (1280px max-width) and a **Fluid Grid** on mobile. The spacing philosophy is "Wide & Open." Sections are separated by significant vertical padding to prevent the interface from feeling cluttered or overwhelming—qualities often associated with "budget" services.

A 12-column grid is standard, with components like service cards typically spanning 4 columns and review testimonials spanning 6. On mobile, the layout collapses to a single column with a standard 16px side margin, maintaining the same vertical rhythm to preserve the premium feel.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. Most surfaces are flat, with a 1px border in a light slate gray (`#E2E8F0`) to define boundaries.

When elevation is required (e.g., a service booking modal or a hovering card), a very soft, highly diffused ambient shadow is used: `0 10px 25px -5px rgba(15, 23, 42, 0.05)`. This subtle lift suggests quality without breaking the minimalist aesthetic. Background blurs (12px) are used behind navigation bars to maintain context while scrolling through high-resolution imagery.

## Shapes
The shape language is **Soft** and disciplined. A 4px (0.25rem) base radius is applied to most UI elements including input fields and secondary buttons. Large components like service cards or hero images use a 8px (0.5rem) radius.

This slight rounding removes the clinical "edge" of sharp corners but avoids the playful, consumer-app look of high-radius or pill-shaped buttons. It strikes a balance between professional precision and modern friendliness.

## Components
### Buttons
*   **Primary:** Solid Navy background with White text. No gradients.
*   **Secondary:** Ghost style with a 1px Slate border and Navy text.
*   **Tertiary/CTA:** Sage Green background for high-priority actions like "Book Now," used only once per view.

### Cards
Service and review cards use a white background with a subtle 1px border. There is no shadow in the default state; a soft shadow appears only on hover to indicate interactivity. Padding inside cards is a generous 32px.

### Inputs
Text fields use a light gray background (`#F1F5F9`) with a 1px bottom border that turns Navy on focus. Labels always sit above the field in the `label-caps` style for clarity.

### Trust Indicators
A specific "Review Chip" component is defined: a small, Sage Green-tinted badge containing a star icon and the rating number, always positioned near the service title or professional's bio.

### Lists
Service checklists use a Sage Green checkmark icon. The text is slightly indented to create a clear vertical line of "completion," reinforcing the idea of a thorough, professional job.