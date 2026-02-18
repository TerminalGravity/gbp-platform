# GBP Design System

**Greater Better People — Crowdfunded AI Agent Operations**

## Direction

**Personality:** Boldness & Clarity
**Foundation:** Neutral (zinc/black)
**Depth:** Subtle borders + glow effects
**Character:** Web3 native, cyberpunk-influenced, professional edge

## Tokens

### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

### Colors

```
// Core
--background: #000000
--background-subtle: #0a0a0a
--surface: #111111 (cards)
--surface-hover: #161616
--surface-active: #1a1a1a

// Borders
--border: rgba(255, 255, 255, 0.08)
--border-subtle: rgba(255, 255, 255, 0.04)
--border-strong: rgba(255, 255, 255, 0.12)

// Text
--foreground: #ffffff
--foreground-secondary: #a1a1aa (zinc-400)
--foreground-muted: #71717a (zinc-500)
--foreground-faint: #52525b (zinc-600)

// Accent (Primary)
--accent: #00ff88
--accent-dim: #00cc6a
--accent-glow: rgba(0, 255, 136, 0.15)
--accent-text: #000000 (on accent)

// Secondary Accent
--accent-2: #00ccff (cyan)
--accent-2-glow: rgba(0, 204, 255, 0.15)

// Status
--status-live: #ff4757
--status-live-glow: rgba(255, 71, 87, 0.2)
--status-success: #00ff88
--status-warning: #ffd93d
--status-info: #00ccff

// Gradient
--gradient-primary: linear-gradient(135deg, #00ff88 0%, #00ccff 100%)
```

### Radius
Scale: 4px, 6px, 8px, 12px, 16px
- Buttons: 8px
- Cards: 12px
- Modals: 16px
- Pills/badges: 9999px (full round)

### Typography

```
Font: 'Inter', system-ui, sans-serif
Mono: 'JetBrains Mono', 'SF Mono', monospace

Scale:
- xs: 11px
- sm: 13px
- base: 14px
- md: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 32px
- 4xl: 42px
- 5xl: 56px
- 6xl: 72px

Weights:
- normal: 400
- medium: 500
- semibold: 600
- bold: 700
- extrabold: 800

Line Heights:
- tight: 1.1
- snug: 1.25
- normal: 1.5
- relaxed: 1.6
```

### Shadows

```
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5)
--shadow: 0 4px 12px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5)
--shadow-glow: 0 0 20px rgba(0, 255, 136, 0.3)
--shadow-glow-hover: 0 0 30px rgba(0, 255, 136, 0.4)
```

### Transitions

```
--transition-fast: 100ms ease
--transition: 150ms ease
--transition-slow: 300ms ease
--transition-spring: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

## Patterns

### Button - Primary

```
Height: 44px (touch), 40px (desktop), 36px (compact)
Padding: 14px 24px
Radius: 8px
Font: 14px, 600 weight
Background: var(--accent)
Color: var(--accent-text)
Border: none
Hover: var(--accent-dim)
Active: scale(0.98)
```

### Button - Secondary

```
Height: same as primary
Padding: 14px 24px
Radius: 8px
Font: 14px, 600 weight
Background: transparent
Color: var(--accent)
Border: 1px solid var(--accent)
Hover: background var(--accent), color var(--accent-text)
```

### Button - Ghost

```
Height: same as primary
Padding: 14px 24px
Radius: 8px
Font: 14px, 500 weight
Background: transparent
Color: var(--foreground)
Border: 1px solid var(--border)
Hover: background var(--surface), border var(--border-strong)
```

### Card

```
Background: var(--surface)
Border: 1px solid var(--border)
Radius: 12px
Padding: 20px (default), 24px (large)
Hover: border-color var(--border-strong)
Active state: border-color var(--accent)
```

### Input / Text Field

```
Height: 44px
Padding: 12px 16px
Radius: 8px
Background: var(--surface)
Border: 1px solid var(--border)
Color: var(--foreground)
Placeholder: var(--foreground-muted)
Focus: border-color var(--accent), outline none
```

### Badge / Status Pill

```
Height: 24px
Padding: 4px 10px
Radius: 9999px
Font: 12px, 600 weight
Background: status color with 0.2 opacity
Color: status color
```

### Live Badge

```
Display: inline-flex, align center
Gap: 6px
Background: var(--status-live)
Color: white
Include: pulsing dot (animation: pulse 1s infinite)
```

### Progress Bar

```
Height: 8px
Background: var(--surface)
Radius: 4px
Fill: var(--accent) or var(--accent-2) for secondary
Overflow: hidden
```

### Stream Viewer Layout

```
Grid: 1fr 320px (main | sidebar)
Main: position relative, background black
Sidebar: background var(--surface), border-left
Responsive: stack on mobile (grid-cols-1)
```

### Stat Display

```
Container: text-center
Value: text-4xl, font-bold, gradient-text
Label: text-sm, var(--foreground-muted), margin-top 4px
```

### Table

```
Width: 100%
Border-collapse: collapse
Header: 
  - Background: var(--accent-glow)
  - Color: var(--accent)
  - Padding: 16px 20px
  - Font: 14px, 600 weight
  - Text-align: left
Cell:
  - Padding: 16px 20px
  - Border-bottom: 1px solid var(--border)
  - Font: 14px
```

### Navigation

```
Position: fixed, top 0, full width, z-50
Background: rgba(0, 0, 0, 0.8)
Backdrop-filter: blur(12px)
Border-bottom: 1px solid var(--border)
Padding: 16px 24px
Content: max-width 1280px, margin auto
```

### Section Spacing

```
Hero: padding-top 128px, padding-bottom 80px
Section: padding-y 80px
Content max-width: 1280px
Content padding-x: 24px
```

## Animation

### Pulse (Live indicator)

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Glow Pulse (Accent elements)

```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50% { box-shadow: 0 0 30px var(--accent-glow); }
}
```

## Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Black background | Web3 native aesthetic, contrast for data | 2026-02-11 |
| #00ff88 accent | Crypto-native green, high energy, unique | 2026-02-11 |
| Borders-only depth | Clean, technical, information-forward | 2026-02-11 |
| Inter font | Modern, excellent readability, free | 2026-02-11 |
| 12px card radius | Soft but not childish | 2026-02-11 |
| 8px button radius | Balanced, modern | 2026-02-11 |
| Glow effects | Cyberpunk feel, draws attention | 2026-02-11 |
| Gradient text | Hero elements only, brand identity | 2026-02-11 |
| 44px touch targets | Mobile-first, accessibility | 2026-02-11 |

## Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Accessibility

- Minimum contrast: 4.5:1 for text
- Focus states: visible ring or border
- Touch targets: minimum 44px
- Reduced motion: respect prefers-reduced-motion
- Semantic HTML: proper heading hierarchy
