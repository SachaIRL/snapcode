/**
 * Tasteful background presets for the area around the code card.
 *
 * Phase 1 ships a small starter set; Phase 2 expands this into the full
 * curated gallery. Each `css` value is assignable directly to `background`.
 */
import type { BackgroundPreset } from './types'

export const backgrounds: BackgroundPreset[] = [
  {
    id: 'sunset',
    label: 'Sunset',
    css: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    css: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
  },
  {
    id: 'grape',
    label: 'Grape',
    css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'mint',
    label: 'Mint',
    css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    id: 'slate',
    label: 'Slate',
    css: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  {
    id: 'none',
    label: 'None',
    css: 'transparent',
  },
]

export const backgroundsById = new Map<string, BackgroundPreset>(
  backgrounds.map((b) => [b.id, b]),
)
