# Tactical Ops - Visual Brand Guide

## Brand Identity

**Mission:** Privacy-first project management for operators who refuse to compromise.

**Personality:** Confident, technical, no-nonsense, slightly military-inspired

**Visual Theme:** Command center aesthetics meet modern minimalism

---

## Color Palette

### Primary Colors

```css
Dark Background:     #0a0e27  (RGB: 10, 14, 39)
Dark Alt Background: #141829  (RGB: 20, 24, 41)
Border:              #1a1f3a  (RGB: 26, 31, 58)
```

### Accent Colors

```css
Orange Primary:      #ff6b35  (RGB: 255, 107, 53)
Orange Light:        #ff8c42  (RGB: 255, 140, 66)
Orange Glow:         rgba(255, 107, 53, 0.3)
```

### Text Colors

```css
Text Primary:        #e0e0e0  (RGB: 224, 224, 224)
Text Secondary:      #a0a0a0  (RGB: 160, 160, 160)
Text Inverse:        #0a0e27  (Dark on light backgrounds)
```

### Usage Guidelines

**Backgrounds:**
- Primary screens: Dark (#0a0e27)
- Cards/panels: Dark Alt (#141829)
- Borders: Border (#1a1f3a)

**Accents:**
- CTAs, highlights: Orange Primary (#ff6b35)
- Hover states: Orange Light (#ff8c42)
- Glows, shadows: Orange Glow (rgba)

**Text:**
- Headings, body: Text Primary (#e0e0e0)
- Secondary info: Text Secondary (#a0a0a0)
- On orange buttons: Text Inverse (#0a0e27)

---

## Typography

### Primary Font: Monospace

**Desktop:**
```css
font-family: 'Courier New', Courier, monospace;
```

**Why Monospace?**
- Technical, command-line aesthetic
- Evokes terminal/hacker vibes
- Readable at all sizes
- Widely available (no web font needed)

### Font Sizes

```css
Hero Title:          clamp(3rem, 10vw, 6rem)
Section Title:       clamp(2rem, 5vw, 3.5rem)
Subsection:          1.5rem
Body Large:          1.2rem
Body:                1rem
Body Small:          0.9rem
Caption:             0.8rem
```

### Font Weights

```
Normal:              400
Bold:                700
```

### Letter Spacing

```css
Titles (Uppercase):  4-8px
Buttons:             2px
Body:                Normal (0)
```

---

## Logo

### Primary Logo

```
TACTICAL OPS
```

**Specifications:**
- All caps
- Monospace font
- Orange (#ff6b35)
- Letter spacing: 8px
- Accompanied by tactical icon (optional)

### Logo Usage

**Do:**
✓ Use on dark backgrounds
✓ Maintain letter spacing
✓ Keep uppercase
✓ Use orange or white only

**Don't:**
✗ Change font
✗ Use lowercase
✗ Add shadows or effects
✗ Use on low-contrast backgrounds
✗ Distort or stretch

### Logo Variations

1. **Primary:** Orange text on dark
2. **Inverse:** White text on orange
3. **Monochrome:** White on dark (when color not available)

### Minimum Size
- Digital: 120px width
- Print: 1 inch width

---

## Icons & Graphics

### Icon Style

**Characteristics:**
- Simple, geometric
- 2px stroke weight
- Sharp corners (not rounded)
- Minimal detail
- Orange or white only

**Examples:**
```
🎯 Target (goals/precision)
🔒 Lock (privacy/security)
⚡ Lightning (speed)
🔓 Unlock (open source)
📱 Device (cross-platform)
```

### Graphic Elements

**Glowing Effects:**
```css
box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
```

**Gradients:**
```css
background: linear-gradient(135deg, #0a0e27 0%, #141829 50%, #0a0e27 100%);
background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, transparent 100%);
```

**Border Styles:**
```css
border: 2px solid #1a1f3a;         /* Subtle */
border: 2px solid #ff6b35;         /* Accent */
border: 2px dashed #ff6b35;        /* Interactive */
```

---

## UI Components

### Buttons

**Primary Button:**
```css
background: #ff6b35;
color: #0a0e27;
padding: 18px 40px;
border-radius: 8px;
font-weight: bold;
text-transform: uppercase;
letter-spacing: 2px;
transition: all 0.3s ease;

/* Hover */
background: #ff8c42;
transform: translateY(-2px);
box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
```

**Secondary Button:**
```css
background: transparent;
color: #ff6b35;
border: 2px solid #ff6b35;
padding: 18px 40px;
border-radius: 8px;
font-weight: bold;
text-transform: uppercase;
letter-spacing: 2px;

/* Hover */
background: rgba(255, 107, 53, 0.1);
```

### Cards

```css
background: rgba(20, 24, 41, 0.5);
backdrop-filter: blur(10px);
border: 2px solid #1a1f3a;
border-radius: 12px;
padding: 40px;

/* Hover */
border-color: #ff6b35;
transform: translateY(-5px);
box-shadow: 0 10px 40px rgba(255, 107, 53, 0.2);
```

### Inputs

```css
background: #0a0e27;
border: 1px solid #1a1f3a;
border-radius: 8px;
color: #e0e0e0;
padding: 12px 16px;

/* Focus */
border-color: #ff6b35;
outline: none;
box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
```

---

## Layout & Spacing

### Spacing Scale

```css
xs:  8px
sm:  16px
md:  24px
lg:  32px
xl:  48px
2xl: 64px
3xl: 96px
```

### Grid

```css
Container Max-width: 1200px
Column Gap: 40px
Row Gap: 40px
```

### Breakpoints

```css
Mobile:  0-768px
Tablet:  769px-1024px
Desktop: 1025px+
```

---

## Imagery

### Photography Style

**Characteristics:**
- Dark, moody
- High contrast
- Tactical/military themes
- Command centers
- Technology focus
- Minimal people (focus on tools/screens)

**Color Treatment:**
- Desaturate slightly
- Increase contrast
- Add orange tint to highlights

### Screenshots

**Best Practices:**
- Show actual product
- Dark theme always
- Highlight key features with orange arrows/circles
- Add subtle drop shadow
- High resolution (2x for Retina)

**Format:**
```
Dimensions: 1200x675px (16:9)
Format: PNG (for UI screenshots)
Background: Transparent or gradient
```

---

## Animation Guidelines

### Principles

1. **Subtle:** Don't distract from content
2. **Fast:** 0.2-0.3s for most interactions
3. **Smooth:** Use easing functions
4. **Purposeful:** Every animation has a reason

### Common Animations

**Fade In:**
```css
opacity: 0 → 1
duration: 0.3s
easing: ease-in-out
```

**Slide Up:**
```css
transform: translateY(20px) → translateY(0)
opacity: 0 → 1
duration: 0.5s
easing: ease-out
```

**Scale Up:**
```css
transform: scale(0.9) → scale(1)
opacity: 0 → 1
duration: 0.3s
easing: ease-out
```

**Hover Lift:**
```css
transform: translateY(0) → translateY(-5px)
duration: 0.2s
easing: ease-out
```

### Framer Motion Examples

```jsx
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Stagger children
variants={{
  container: { staggerChildren: 0.1 }
}}
```

---

## Social Media Assets

### Profile Picture

- Square: 400x400px
- Logo on dark background
- Orange glow effect
- Minimum 200px for smaller platforms

### Cover Image (Twitter)

- Dimensions: 1500x500px
- Feature: Logo + tagline
- Dark background with gradient
- Orange accents

### Open Graph Image

- Dimensions: 1200x630px
- Include: Logo, tagline, key visual
- Ensure text readable at small sizes
- Test on Twitter, Facebook, LinkedIn

### Instagram Posts

- Square: 1080x1080px
- Maintain dark theme
- Large, readable text
- Orange accents
- Consistent style across feed

---

## Marketing Materials

### Presentation Slides

**Template:**
- Dark background (#0a0e27)
- Orange headers (#ff6b35)
- Minimal text (bullet points)
- Large screenshots
- Consistent footer with logo

### One-Pager

**Sections:**
1. Logo + tagline
2. Problem statement
3. Solution (3 key points)
4. Features (icons + text)
5. Tech stack
6. CTA + QR code

**Format:** PDF, print-ready

### Stickers/Swag

**Designs:**
- Logo only (simple)
- "Privacy First" badge
- Tactical themed illustrations
- Orange on dark or white on transparent

---

## Accessibility

### Contrast Ratios

**Text:**
- Large text (18pt+): Minimum 3:1
- Normal text: Minimum 4.5:1

**Our Palette:**
- Orange (#ff6b35) on Dark (#0a0e27): ✓ 7.2:1
- Text Primary (#e0e0e0) on Dark (#0a0e27): ✓ 12.3:1
- Text Secondary (#a0a0a0) on Dark (#0a0e27): ✓ 6.8:1

### Interactive Elements

- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly

---

## Brand Voice

### Tone

**We sound:**
- Confident (not arrogant)
- Technical (not jargon-heavy)
- Direct (not rude)
- Authentic (not corporate)

**We don't sound:**
- Salesy
- Buzzword-filled
- Apologetic
- Generic

### Writing Style

**Do:**
✓ Short sentences
✓ Active voice
✓ Clear benefits
✓ Honest about limitations
✓ Technical when appropriate

**Don't:**
✗ Marketing fluff
✗ Empty promises
✗ Passive voice
✗ Unnecessary jargon

### Example Copy

**Good:**
"Your data. Your machine. Zero tracking."

**Bad:**
"Leverage our cutting-edge, AI-powered, cloud-native solution to synergize your workflow and unlock unprecedented productivity gains."

---

## File Naming Conventions

### Marketing Assets

```
tactical-ops-[type]-[variant]-[size].[ext]

Examples:
tactical-ops-logo-primary-400x400.png
tactical-ops-screenshot-kanban-board-1200x675.png
tactical-ops-social-twitter-cover-1500x500.jpg
```

### Social Media Posts

```
YYYYMMDD-[platform]-[topic].[ext]

Examples:
20250115-twitter-launch-announcement.png
20250116-linkedin-privacy-focus.jpg
```

---

## Design Tools

### Recommended

- **Figma:** UI design, prototyping
- **Canva:** Quick social graphics
- **Photopea:** Free Photoshop alternative
- **Remove.bg:** Background removal
- **TinyPNG:** Image compression

### Resources

- **Unsplash:** Stock photos (tactical themes)
- **Flaticon:** Icons (geometric style)
- **Google Fonts:** Backup fonts if needed

---

## Quality Checklist

Before publishing any visual asset:

- [ ] Colors match brand palette
- [ ] Monospace font used correctly
- [ ] Sufficient contrast (accessibility)
- [ ] Consistent with existing materials
- [ ] High resolution (2x for digital)
- [ ] Optimized file size
- [ ] Tested on multiple devices
- [ ] Alt text written (web assets)
- [ ] Filename follows convention

---

## Evolution

This brand guide is living document. As Tactical Ops grows:

1. **Stay Consistent:** Core elements (colors, fonts) remain stable
2. **Iterate Thoughtfully:** Improve, don't reinvent
3. **Document Changes:** Update this guide
4. **Gather Feedback:** Listen to community

The brand should feel timeless, technical, and trustworthy.

---

**Remember:** The visual brand should reinforce the core message: Privacy. Simplicity. Quality.

Every design decision should serve that purpose.

🎯 Stay tactical. Stay focused.
