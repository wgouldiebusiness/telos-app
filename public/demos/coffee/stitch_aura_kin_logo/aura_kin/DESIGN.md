---
name: Aura & Kin
colors:
  surface: '#fff8f4'
  surface-dim: '#e9d7c4'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e4'
  surface-container: '#fdebd7'
  surface-container-high: '#f7e5d1'
  surface-container-highest: '#f1e0cc'
  on-surface: '#231a0e'
  on-surface-variant: '#4f4441'
  inverse-surface: '#392f21'
  inverse-on-surface: '#ffeedc'
  outline: '#817470'
  outline-variant: '#d3c3be'
  surface-tint: '#725950'
  primary: '#110402'
  on-primary: '#ffffff'
  primary-container: '#2d1b14'
  on-primary-container: '#9d8177'
  inverse-primary: '#e0c0b4'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#080806'
  on-tertiary: '#ffffff'
  tertiary-container: '#20201d'
  on-tertiary-container: '#898783'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fddbd0'
  primary-fixed-dim: '#e0c0b4'
  on-primary-fixed: '#291710'
  on-primary-fixed-variant: '#584239'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f4'
  on-background: '#231a0e'
  surface-variant: '#f1e0cc'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in the "New Minimalist" movement, blending high-fashion editorial aesthetics with a warm, tactile serenity. It aims to evoke a sense of quiet luxury, professional excellence, and restorative calm. 

The visual language avoids the coldness of traditional minimalism by utilizing a palette of organic, skin-toned neutrals and soft textures. The interface functions as a secondary element to high-fidelity photography, using generous negative space to signal exclusivity. Every interaction should feel deliberate and unhurried, reflecting the high-end salon experience where time is the ultimate luxury.

## Colors

The palette is derived from natural, earthy materials and precious metals. 

- **Primary (Deep Chocolate):** Used for typography and primary structural elements to provide grounding and contrast.
- **Secondary (Champagne Gold):** Reserved for subtle accents, interactive states, and decorative borders to signify premium quality.
- **Tertiary (Soft Cream):** The primary background color, providing a softer, more inviting canvas than pure white.
- **Neutral (Taupe/Warm Grey):** Used for secondary text, dividers, and disabled states to maintain a soft visual hierarchy.

## Typography

This design system employs a classic serif-and-sans pairing to balance tradition with modernity.

- **Headlines:** Utilize *Playfair Display* for its high-contrast strokes and elegant terminals. It should be typeset with slightly tighter letter-spacing for large displays to create an editorial feel.
- **Body & Interface:** Utilize *Hanken Grotesk*. This typeface provides a clean, airy, and contemporary contrast to the serif headings. 
- **Character:** Use uppercase styling with increased letter-spacing for labels and small buttons to enhance the "luxury boutique" aesthetic.

## Layout & Spacing

The layout follows a **fixed-grid** model on desktop to maintain precise control over white space, transitioning to a fluid model on mobile devices.

- **Philosophy:** Emphasize verticality and breathing room. Section gaps are intentionally large to separate different "experiences" or "stories" within the page.
- **Grid:** A 12-column grid is used for desktop. Elements often offset from the grid to create asymmetrical, editorial-style layouts common in high-end fashion magazines.
- **Breakpoints:** 
  - Mobile: < 768px (4 columns, 24px margins)
  - Tablet: 768px - 1024px (8 columns, 40px margins)
  - Desktop: > 1024px (12 columns, 64px margins)

## Elevation & Depth

This design system prioritizes flat, layered surfaces over heavy shadows to maintain a clean, minimalist profile.

- **Tonal Layering:** Depth is primarily communicated through subtle color shifts between the background and container surfaces (e.g., a slightly darker taupe surface on a cream background).
- **Soft Diffusion:** When shadows are necessary for functional clarity (like a booking modal), use extremely soft, large-radius shadows with low opacity (3-5%) tinted with the Primary color (#2D1B14).
- **Glassmorphism:** Use subtle backdrop blurs (8px to 12px) for navigation bars to allow photography to bleed through, creating a sense of immersion.

## Shapes

The shape language is sophisticated and restrained. While modern UI often leans into heavy rounding, this design system uses **Soft (Level 1)** rounding to maintain a sense of architectural structure and precision.

- **Hard Lines:** Primary image containers and large section blocks should use 0px radius (Sharp) to mirror editorial layouts.
- **Interactive Elements:** Buttons and input fields use a 0.25rem (4px) radius to provide just enough softness for touch-comfort without appearing "bubbly" or casual.

## Components

### Buttons
Primary buttons are solid Deep Chocolate with Cream text, using an uppercase Label-sm font style. Secondary buttons use a fine 1px Gold border with transparent backgrounds (ghost buttons).

### Input Fields
Inputs are minimalist—bottom borders only (1px Taupe) that transition to Gold on focus. Labels should float above the line in a smaller weight.

### Cards
Cards do not use borders or heavy shadows. Instead, they rely on image-first layouts and generous internal padding (32px+). Typography within cards should be centered to reinforce the boutique feel.

### Chips
Used for service categories (e.g., "Hair," "Nails"). These are pill-shaped with a light Taupe background and Primary text, used sparingly to avoid clutter.

### Image Treatment
All imagery should have a slight warm grain filter or consistent color grading to match the cream/chocolate palette. Use "Object-fit: cover" with ample margins to treat photos as art pieces rather than just content.