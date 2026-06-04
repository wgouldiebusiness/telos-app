---
name: Heritage Hearth & Checkerboard
colors:
  surface: '#fef9f1'
  surface-dim: '#ded9d2'
  surface-bright: '#fef9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3eb'
  surface-container: '#f2ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e7e2da'
  on-surface: '#1d1c17'
  on-surface-variant: '#5a413d'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e8'
  outline: '#8e706b'
  outline-variant: '#e2beb9'
  surface-tint: '#b22a1d'
  primary: '#7e0000'
  on-primary: '#ffffff'
  primary-container: '#a11d12'
  on-primary-container: '#ffb3a7'
  inverse-primary: '#ffb4a8'
  secondary: '#4d6453'
  on-secondary: '#ffffff'
  secondary-container: '#cde6d1'
  on-secondary-container: '#516857'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca830'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#900e07'
  secondary-fixed: '#d0e9d4'
  secondary-fixed-dim: '#b4cdb8'
  on-secondary-fixed: '#0b2013'
  on-secondary-fixed-variant: '#364c3c'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fef9f1'
  on-background: '#1d1c17'
  surface-variant: '#e7e2da'
  checkerboard-red: '#CD212A'
  paper-white: '#FCF7EF'
  ink-black: '#1A1A1A'
  basil-green: '#1B3022'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Libre Franklin
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Libre Franklin
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  price-tag:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

This design system establishes a visual identity for an artisanal pizza brand that bridges the gap between mid-century Italian trattorias and modern high-end editorial design. The aesthetic is "New Classic"—leveraging the "old money" sophistication of traditional serif typography while injecting the energetic, high-contrast graphic language of retro advertising.

The style is **Modern-Retro Fusion**. It utilizes heavy whitespace and refined layouts associated with minimalism, but punctuates them with **Brutalist** graphic elements like thick borders and bold checkerboard patterns. The goal is to evoke the feeling of a sun-drenched Naples courtyard through a contemporary, design-forward lens.

**Key Visual Pillars:**
- **Editorial Layouts:** High-quality photography of charred crusts and fresh basil paired with expansive cream-colored negative space.
- **Graphic Accents:** Use of red-and-white checkerboard ribbons to define section breaks or digital "tablecloth" backgrounds.
- **Authentic Texture:** Subtle grain on background surfaces to mimic the feel of heavyweight paper menus or flour-dusted marble counters.

## Colors

The palette is rooted in the "Tricolore" but elevated through desaturation and warmth to achieve an "old money" patina. 

- **Primary (Pomodoro Red):** A deep, slightly brick-toned red used for hero typography and primary calls to action.
- **Secondary (Forest Green):** A dark, prestigious green representing fresh ingredients and botanical heritage, used for supporting accents and subtle backgrounds.
- **Neutral (Parchment):** The primary canvas color. Avoid pure `#FFFFFF` in favor of `#FCF7EF` to create a warm, tactile, and established feel.
- **Accents:** Gold is used sparingly for "Premium" offerings or badges of authenticity.

Color application should follow a 70/20/10 rule, where the parchment neutral dominates the background, red provides the graphic punch, and green offers grounding stability.

## Typography

The typography strategy relies on the tension between the classic and the technical.

- **Headlines:** Use **Playfair Display**. Its high-contrast strokes and elegant serifs communicate the "Old Money" Italian heritage. Large-scale headings should have tighter letter-spacing for a sophisticated, editorial look.
- **Body:** Use **Libre Franklin**. A clean, functional sans-serif that ensures high readability for menus and descriptions, providing a neutral balance to the expressive headlines.
- **Utility & Data:** Use **Space Grotesk**. This introduces the "Modern Twist." Its slightly quirky, geometric forms work perfectly for prices, nutrition labels, and button text, nodding to the technical precision of a pizza maker.

## Layout & Spacing

This design system uses a **Fixed-Fluid Hybrid Grid**. Content is contained within a 1280px max-width container on desktop to maintain an editorial feel, while smaller screens utilize a fluid 4-column structure.

- **Rhythm:** An 8px base unit drives all padding and margins.
- **The "Checkerboard Cut":** Use 32px or 48px height bands of red/white checkerboard patterns to separate major thematic sections (e.g., between the Hero and the Menu).
- **Whitespace:** Emphasize "Luxury Space." Margin sizes should be generous—especially around high-quality food photography—to allow the ingredients to "breathe."
- **Reflow:** On mobile, imagery should maintain a 4:5 or 1:1 aspect ratio to feel substantial and tactile, rather than becoming small thumbnails.

## Elevation & Depth

To maintain the "Modern Authentic" feel, the system avoids heavy drop shadows and digital glows.

- **Flat Layering:** Depth is achieved through color blocking and overlapping elements. For example, a pizza image may overlap a checkerboard border, or a serif headline may sit half-on and half-off a colored container.
- **Subtle Physicality:** Instead of shadows, use **1px Solid Outlines** in `basil-green` or `ink-black` to define cards and containers.
- **Floating Accents:** High-quality "cut-out" PNGs of ingredients (a single basil leaf, a sprinkle of flour) can sit at a higher Z-index with very soft, diffused ambient shadows to create a 3D "tabletop" effect.

## Shapes

The design system utilizes **Sharp (0px)** roundedness. 

The absence of rounded corners emphasizes the architectural and classic nature of the brand. It mimics the sharp edges of physical menus, newsprint, and vintage signage. 

**Exceptions:** 
- **Stickers/Badges:** Retro-style "Quality Guaranteed" or "Artisanal" badges should use a "scalloped" or "zigzag" edge rather than a simple circle or rounded rectangle to mimic vintage woodblock prints.
- **Illustrations:** Retro diagrams and icons should feature hand-drawn, slightly irregular lines to contrast with the rigid layout.

## Components

- **Buttons:** Rectangular, sharp-edged, and bold. Primary buttons use `primary-red` with white `label-caps` text. On hover, they should invert or shift to `ink-black`.
- **The "Menu Card":** A parchment-colored container with a thin 1px border. The price should be prominent in `Space Grotesk`.
- **Checkerboard Dividers:** Functional components used to indicate "Ordering" vs. "Storytelling" sections.
- **Retro Diagrams:** Use simplified, two-color illustrations for "how to order" or ingredient breakdowns, inspired by 1950s technical manuals.
- **Chips/Tags:** Small, sharp-edged boxes with `label-caps` typography, used for "Spicy," "Vegan," or "Chef's Choice."
- **Inputs:** Simple bottom-border only or 1px full-outline fields using the neutral-parchment background. No inner shadows; focus on clean typography for the user's input.
- **Cart Summary:** A sticky, high-contrast element that uses the `basil-green` to signify "action" and "freshness."