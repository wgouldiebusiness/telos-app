---
name: Artisanal Brew & Grain
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#4f4442'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#817472'
  outline-variant: '#d3c3c0'
  surface-tint: '#705955'
  primary: '#100403'
  on-primary: '#ffffff'
  primary-container: '#2c1b18'
  on-primary-container: '#9b817c'
  inverse-primary: '#dec0bb'
  secondary: '#805433'
  on-secondary: '#ffffff'
  secondary-container: '#fdc399'
  on-secondary-container: '#794e2d'
  tertiary: '#050801'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c2112'
  on-tertiary-container: '#848974'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbdcd6'
  primary-fixed-dim: '#dec0bb'
  on-primary-fixed: '#281714'
  on-primary-fixed-variant: '#57423e'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#f4bb91'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#653d1e'
  tertiary-fixed: '#e0e5cc'
  tertiary-fixed-dim: '#c4c9b1'
  on-tertiary-fixed: '#191d0e'
  on-tertiary-fixed-variant: '#444937'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
  espresso: '#2C1B18'
  terracotta: '#BF5A36'
  sand: '#DCA57D'
  cream: '#F9F6F0'
  sage: '#6B705C'
  charcoal: '#1A1A1A'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 76px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
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
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system embodies a "neighborhood craft" aesthetic, blending the tactile warmth of a local coffee house with the refined precision of modern minimalism. The brand personality is authentic, warm, and intentional, focusing on the sensory experience of specialty coffee and fresh baking.

The design style is **Modern Tactile**. It prioritizes high-quality, editorial-style photography of textures (steamed milk, ground beans, flaking croissants) set against a backdrop of generous whitespace and structured, bold typography. The visual language balances the "unrefined" charm of organic textures with the "refined" structure of a systematic layout, ensuring the product feels both premium and accessible.

## Colors

The palette is rooted in earth-toned neutrals that evoke the raw ingredients of a café. 

- **Primary (Espresso):** A deep, near-black brown used for typography and primary structural elements to provide grounding and contrast.
- **Secondary (Sand):** A warm, toasted beige that serves as the bridge between the light backgrounds and dark accents, ideal for secondary buttons and dividers.
- **Tertiary (Sage):** A muted, herbal green inspired by botanical elements and artisanal menus, used sparingly for accents, success states, or seasonal highlights.
- **Neutral (Cream):** The foundation of the UI. This off-white hue prevents the clinical feel of pure white, adding a "paper-like" warmth to the background.

Use **Terracotta** as a high-action accent for specific call-to-actions or "Daily Special" indicators to draw the eye without breaking the organic harmony.

## Typography

The typographic strategy relies on a "High-Low" contrast pairing. 

**Headlines** utilize **Anton**, a bold, condensed sans-serif that commands attention and evokes vintage poster design. It should be used in all-caps for display moments to create a rhythmic, impactful hierarchy.

**Body Text** is set in **Hanken Grotesk**, providing a clean, modern, and highly legible counterpoint to the aggressive headlines. Its open apertures ensure readability in long-form content like coffee origin stories or brewing guides.

**Utility Labels** use **Space Grotesk** to inject a subtle technical/modernist feel into the navigation and metadata, keeping the interface feeling precise.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain an editorial feel, transitioning to a **Fluid Grid** for mobile.

- **Desktop:** 12-column grid with a 1280px max-width. Use generous 64px outer margins to frame the content like a premium magazine.
- **Mobile:** 4-column grid with 16px margins.
- **Spacing Rhythm:** Based on an 8px base unit. Section vertical spacing should be aggressive (e.g., 120px) to allow the "breathe-ability" requested in the design narrative. 

Content should be center-aligned in containers to emphasize the focus on individual craft items.

## Elevation & Depth

To maintain the "Modern Tactile" feel, depth is achieved through **Tonal Layering** and **Subtle Materiality** rather than heavy shadows.

- **Surfaces:** Use slightly different shades of Cream and Sand to distinguish between the page background and card containers.
- **Outlines:** Implement low-contrast borders (1px) using a slightly darker version of the Sand tone (#DCA57D at 30% opacity) for input fields and cards.
- **Shadows:** When necessary for interactivity (e.g., a hovered button), use a single "soft-diffused" shadow: `0px 10px 30px rgba(44, 27, 24, 0.08)`. This adds a gentle lift without looking digital or synthetic.
- **Overlays:** Use semi-transparent Espresso (#2C1B18 at 40% opacity) for image text-protection overlays to ensure legibility of light typography over photography.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding removes the "sharpness" of a corporate grid while maintaining a disciplined, professional structure. 

- **Buttons & Inputs:** Use the standard `rounded` (4px).
- **Cards & Images:** Use `rounded-lg` (8px) to soften the large visual assets.
- **Iconography:** Use thick strokes (2px) with slightly rounded caps to match the character of the typography.

## Components

- **Buttons:** 
    - *Primary:* Solid Espresso background with Cream text. High-contrast, no rounding beyond the 4px base. 
    - *Secondary:* Outlined Espresso or solid Sand background.
- **Input Fields:** Bottom-border only for a "menu-style" feel, or fully enclosed with a 1px soft-contrast border. Use Hanken Grotesk for placeholder text.
- **Cards:** No shadows. Use a subtle fill change (Cream to a slightly darker Sand) on hover. Images should occupy the top 60% of the card area.
- **Chips/Badges:** Use the Sage Green background with white text for dietary labels (e.g., "Vegan," "Gluten-Free") to leverage the fresh accent color.
- **Lists:** Clean, horizontal-ruled lists for menu items. Use Anton for the item name and price, and Hanken Grotesk for the description.
- **Photography:** Always use high-grain, warm-lit imagery. Avoid flat "studio" lighting; prefer natural, directional light that highlights steam, texture, and wood grain.