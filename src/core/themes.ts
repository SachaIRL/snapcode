/**
 * Curated list of Shiki themes exposed in the UI.
 *
 * Each entry lazy-loads its theme registration via a dynamic import, so a theme
 * is only pulled into the bundle (as a separate chunk) when it's actually used.
 */
import type { ThemeId, ThemeMeta } from './types'

export const themes: ThemeMeta[] = [
  {
    id: 'github-dark',
    label: 'GitHub Dark',
    appearance: 'dark',
    load: () => import('@shikijs/themes/github-dark'),
  },
  {
    id: 'github-light',
    label: 'GitHub Light',
    appearance: 'light',
    load: () => import('@shikijs/themes/github-light'),
  },
  {
    id: 'nord',
    label: 'Nord',
    appearance: 'dark',
    load: () => import('@shikijs/themes/nord'),
  },
  {
    id: 'dracula',
    label: 'Dracula',
    appearance: 'dark',
    load: () => import('@shikijs/themes/dracula'),
  },
  {
    id: 'vitesse-dark',
    label: 'Vitesse Dark',
    appearance: 'dark',
    load: () => import('@shikijs/themes/vitesse-dark'),
  },
  {
    id: 'vitesse-light',
    label: 'Vitesse Light',
    appearance: 'light',
    load: () => import('@shikijs/themes/vitesse-light'),
  },
  {
    id: 'one-dark-pro',
    label: 'One Dark Pro',
    appearance: 'dark',
    load: () => import('@shikijs/themes/one-dark-pro'),
  },
  {
    id: 'catppuccin-mocha',
    label: 'Catppuccin Mocha',
    appearance: 'dark',
    load: () => import('@shikijs/themes/catppuccin-mocha'),
  },
]

export const themesById = new Map<ThemeId, ThemeMeta>(
  themes.map((t) => [t.id, t]),
)
