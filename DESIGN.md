---
name: Steel & Orchid
colors:
  surface: '#f8f9fe'
  surface-dim: '#d9dade'
  surface-bright: '#f8f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f8'
  surface-container: '#edeef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e7'
  on-surface: '#191c1f'
  on-surface-variant: '#41474f'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff0f5'
  outline: '#717880'
  outline-variant: '#c1c7d0'
  surface-tint: '#206393'
  primary: '#1c6090'
  on-primary: '#ffffff'
  primary-container: '#3c79ab'
  on-primary-container: '#fdfcff'
  inverse-primary: '#96ccff'
  secondary: '#735664'
  on-secondary: '#ffffff'
  secondary-container: '#fed8e9'
  on-secondary-container: '#795c6a'
  tertiary: '#7d5400'
  on-tertiary: '#ffffff'
  tertiary-container: '#9a6c17'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cee5ff'
  primary-fixed-dim: '#96ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004a75'
  secondary-fixed: '#fed8e9'
  secondary-fixed-dim: '#e1bdcd'
  on-secondary-fixed: '#2a1520'
  on-secondary-fixed-variant: '#593f4c'
  tertiary-fixed: '#ffddb0'
  tertiary-fixed-dim: '#f6bc62'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#614000'
  background: '#f8f9fe'
  on-background: '#191c1f'
  surface-variant: '#e1e2e7'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 1.5rem
  margin: 2rem
  container-max: 1280px
---

## Brand & Style

This design system embodies the "Expert Generalist" persona: a blend of analytical rigor and empathetic adaptability. The aesthetic is categorized as **Corporate / Modern** with a distinct **Minimalist** influence, prioritizing clarity and high-fidelity spacing over decorative elements.

The personality is professional yet approachable, utilizing the stability of Steel Blue to anchor the user experience while employing soft pink accents to introduce warmth and contemporary flair. The UI should evoke a sense of calm efficiency, feeling expansive and meticulously organized. Surfaces are treated with subtle tints to avoid the starkness of pure white, creating a more sophisticated, multi-dimensional environment.

## Colors

The color strategy utilizes **Steel Blue** (oklch 60% 0.12 250) as the primary functional color for actions, navigation, and structural emphasis. To balance the coolness of the blue, **Soft Pink** (oklch 88% 0.06 340) serves as the secondary and accent color, used for high-interest highlights and soft visual breaks.

Backgrounds should rarely be pure white. Instead, use the `surface` tints to differentiate content areas:

- **Main App Background:** `surface-neutral`
- **Sidebars/Navigation:** `surface-tint-blue`
- **Special Callouts/Cards:** `surface-tint-pink`

Success states are intentionally mapped to higher-chroma light pink tones to maintain the "Expert Generalist" aesthetic, diverging from traditional green to create a unique, branded feedback loop.

## Typography

This design system uses **Manrope** exclusively to maintain a modern, balanced, and trustworthy appearance. As a variable font, Manrope allows for precise weight adjustments to ensure legibility across different background tints.

- **Headlines:** Use tighter letter spacing and heavier weights (700-800) to create a strong visual anchor.
- **Body Text:** Use `body-md` for standard reading experiences, ensuring ample line height (1.6) for better comprehension.
- **Labels:** Utilize `label-lg` with uppercase styling and increased tracking for metadata, categories, and small headers within cards.

## Layout & Spacing

The layout philosophy follows a **fixed-grid** model for desktop, centered within a max-width container of 1280px. This ensures that content remains readable and focused. For smaller viewports, the system transitions to a fluid model with a 12-column grid.

Spacing follows an 8pt rhythmic scale, but with a "high-fidelity" approach—meaning generous margins and padding are preferred to prevent density fatigue.

- Use `lg` (2.5rem) spacing between major sections.
- Use `md` (1.5rem) for internal card padding.
- Horizontal alignment is critical; ensure text and icons are strictly aligned to the left edge of the grid columns to project precision.

## Elevation & Depth

To maintain the clean, professional look, depth is communicated through **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

- **Level 0 (Base):** `surface-neutral` or `surface-tint-blue`.
- **Level 1 (Cards/Floating Elements):** Use a white background with an extremely soft, tinted shadow: `0 4px 20px oklch(30% 0.04 250 / 0.06)`. This creates a subtle lift without feeling "heavy."
- **Level 2 (Modals/Dropdowns):** Increase shadow spread and slightly increase opacity: `0 12px 40px oklch(30% 0.04 250 / 0.1)`.
- **Interaction:** On hover, cards should transition from Level 1 to a slightly more pronounced shadow and a 2px upward translation to provide tactile feedback.

## Shapes

The "Expert Generalist" identity is reinforced through **Rounded** shapes (0.5rem base radius). This specific level of roundedness strikes the balance between the clinical precision of sharp corners and the overly casual nature of pill shapes.

- **Small Components (Checkboxes, Tags):** Use `rounded-sm` (0.25rem).
- **Standard Components (Buttons, Inputs, Cards):** Use `rounded-md` (0.5rem).
- **Large Components (Modals, Feature Sections):** Use `rounded-lg` (1rem).
- **Icons:** Icons should utilize a consistent stroke weight (1.5px to 2px) with slightly rounded terminals to match the typography and container shapes.

## Components

### Buttons

- **Primary:** Solid Steel Blue (`primary-base`) with white text. High-fidelity padding: `12px 24px`.
- **Secondary:** Soft Pink (`accent-base`) with Steel Blue text. Used for supporting actions.
- **Ghost:** Transparent background with Steel Blue text and a 1px border of `oklch(60% 0.12 250 / 0.2)`.

### Input Fields

- Background: White.
- Border: 1px solid `oklch(55% 0.03 250 / 0.2)`.
- Focus State: 2px solid Steel Blue with a subtle Soft Pink outer glow.

### Chips & Tags

- Use the `surface-tint-pink` for the background and `primary-dark` for the text. This highlights the "generalist" versatility of the system.

### Cards

- Standard cards use Level 1 elevation. For "Success" or "Status" cards, use a 4px left-side border in Soft Pink to denote state without overwhelming the design.

### Navigation

- Sidebar navigation should use `surface-tint-blue`. Active states are indicated by a Steel Blue vertical bar on the left and a Soft Pink background tint on the item itself.
