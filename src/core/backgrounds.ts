/**
 * Curated background presets for the area around the code card.
 * Each `css` value is assignable directly to the `background` property.
 */
import type { BackgroundPreset } from './types'

export const backgrounds: BackgroundPreset[] = [
  {
    id: 'grape',
    label: 'Grape',
    css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    css: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
  },
  {
    id: 'flamingo',
    label: 'Flamingo',
    css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    css: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
  },
  {
    id: 'mint',
    label: 'Mint',
    css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    id: 'peach',
    label: 'Peach',
    css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    css: 'linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'ember',
    label: 'Ember',
    css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    id: 'twilight',
    label: 'Twilight',
    css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    css: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    css: '#0d1117',
  },
  {
    id: 'paper',
    label: 'Paper',
    css: '#f5f5f4',
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
