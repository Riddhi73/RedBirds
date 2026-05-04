---
name: RedBirds
colors:
  surface: "#11131b"
  surface-dim: "#11131b"
  surface-bright: "#373942"
  surface-container-lowest: "#0c0e16"
  surface-container-low: "#191b23"
  surface-container: "#1d1f27"
  surface-container-high: "#282a32"
  surface-container-highest: "#32343d"
  on-surface: "#e1e2ed"
  on-surface-variant: "#c3c6d7"
  inverse-surface: "#e1e2ed"
  inverse-on-surface: "#2e3039"
  outline: "#8d90a0"
  outline-variant: "#434655"
  surface-tint: "#b4c5ff"
  primary: "#b4c5ff"
  on-primary: "#002a78"
  primary-container: "#2563eb"
  on-primary-container: "#eeefff"
  inverse-primary: "#0053db"
  secondary: "#4cd7f6"
  on-secondary: "#003640"
  secondary-container: "#03b5d3"
  on-secondary-container: "#00424e"
  tertiary: "#ffb596"
  on-tertiary: "#581e00"
  tertiary-container: "#bc4800"
  on-tertiary-container: "#ffede6"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#dbe1ff"
  primary-fixed-dim: "#b4c5ff"
  on-primary-fixed: "#00174b"
  on-primary-fixed-variant: "#003ea8"
  secondary-fixed: "#acedff"
  secondary-fixed-dim: "#4cd7f6"
  on-secondary-fixed: "#001f26"
  on-secondary-fixed-variant: "#004e5c"
  tertiary-fixed: "#ffdbcd"
  tertiary-fixed-dim: "#ffb596"
  on-tertiary-fixed: "#360f00"
  on-tertiary-fixed-variant: "#7d2d00"
  background: "#11131b"
  on-background: "#e1e2ed"
  surface-variant: "#32343d"
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 42px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: "700"
    lineHeight: "1.3"
    letterSpacing: "0"
  body:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: "400"
    lineHeight: "1.7"
    letterSpacing: "0"
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built on the pillars of digital sovereignty and technical precision. It targets high-stakes decision-makers in enterprise IT and infrastructure, evoking a sense of impenetrable security combined with agile response capabilities.

The aesthetic leans into a **High-Tech Minimalism** influenced by **Glassmorphism**. By utilizing a deep, monochromatic foundation punctuated by high-vibrancy neon accents, the UI mimics a sophisticated command center. Design elements should feel like precision instruments: sharp, responsive, and data-dense, yet legible. The use of translucent surfaces and subtle glow effects suggests depth and layered security.

## Colors

The palette is anchored by a deep obsidian background to maximize contrast for technical data. The "Electric Blue" serves as the primary action color, symbolizing reliability and corporate strength, while "Cyber Teal" acts as a secondary accent for status indicators and high-tech flair.

For functional UI states, utilize low-opacity versions of the accent colors for hover states or background washes. Borders should utilize a subtle 10-15% opacity of the secondary text color to maintain a clean, "ghost" aesthetic without visual clutter.

## Typography

This design system employs a dual-typeface strategy to balance technical edge with professional readability. **Space Grotesk Bold** is reserved for headings, providing a geometric, futuristic character that mirrors architectural precision.

**Inter Regular** is the workhorse for all body copy and interface labels. The specific 1.7 line-height is mandatory for body text to ensure high legibility in data-heavy cybersecurity environments. For small labels or metadata, use Inter Medium in uppercase with increased letter spacing to enhance the "instrumentation" feel.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop environments to maintain a controlled, high-density dashboard feel. A 12-column grid system is used with 24px gutters.

Spacing is based on an 8px rhythmic scale. Components should prioritize generous internal padding—specifically the 14px/28px ratio for primary actions—to ensure touch targets are clear and the interface feels premium. Use "lg" and "xl" spacing for section verticality to prevent the dark theme from feeling claustrophobic.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism and Tonal Layers** rather than traditional drop shadows. Since the background is nearly black, light-based shadows are ineffective.

1.  **Level 0 (Base):** #0A0F1E.
2.  **Level 1 (Cards/Sections):** A slightly lighter fill (approx. 4% white overlay) with a 1px stroke at 10% opacity.
3.  **Level 2 (Modals/Popovers):** Semi-transparent background (70% opacity) with a 20px backdrop blur and a Cyber Teal "glow" border (20% opacity) to simulate active energy.

All transitions between these states must use a `0.2s ease` timing to maintain a snappy, responsive feel.

## Shapes

The design system utilizes a **Rounded** shape language with a base radius of 8px (0.5rem). This softens the technical aesthetic, making the sophisticated security tools feel approachable and modern.

Apply the 8px radius consistently to buttons, input fields, and card containers. For nested elements (like tags inside a card), use a smaller 4px radius to maintain visual harmony. Large containers or decorative background elements may occasionally use 16px (rounded-lg) to create a clear visual hierarchy.

## Components

### Buttons

- **Primary CTA:** Uses the left-to-right gradient (#2563EB to #06B6D4). Text is white. On hover, the gradient should slightly brighten or increase in saturation.
- **Secondary:** Ghost style with an Electric Blue border and text.
- **Transition:** All buttons must transition over 0.2s.

### Inputs & Forms

- **Fields:** Background should be a darker shade of the primary background or a 5% white tint.
- **Border:** 1px stroke in #94A3B8 (secondary text) at low opacity.
- **Focus State:** Border color changes to Cyber Teal with a subtle outer glow.

### Cards & Modules

- Use the Level 1 elevation (subtle fill + stroke).
- Headings within cards should always use Space Grotesk at H3 or smaller sizes.

### Status Chips

- Compact units with 4px radius.
- Use Cyber Teal for "Secure/Active" and high-contrast red for "Threat Detected."

### Navigation

- Sidebar or Header should use a backdrop blur effect when scrolling over content to maintain the glassmorphic theme.
