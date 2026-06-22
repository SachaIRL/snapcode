/**
 * Shared types for SnapCode's framework-agnostic core.
 *
 * This module (and everything else under `core/`) must stay free of React or
 * any DOM-framework imports so the highlighting + settings contract can be
 * reused by a future headless/CLI export path.
 */

/** IDs of the curated Shiki themes. Kept in sync with `themes.ts`. */
export type ThemeId =
  | 'github-dark'
  | 'github-light'
  | 'nord'
  | 'dracula'
  | 'vitesse-dark'
  | 'vitesse-light'
  | 'one-dark-pro'
  | 'catppuccin-mocha'

/** IDs of the supported languages. Kept in sync with `languages.ts`. */
export type LanguageId =
  | 'typescript'
  | 'tsx'
  | 'javascript'
  | 'jsx'
  | 'python'
  | 'rust'
  | 'go'
  | 'java'
  | 'json'
  | 'html'
  | 'css'
  | 'bash'
  | 'sql'
  | 'markdown'
  | 'yaml'

export interface ThemeMeta {
  id: ThemeId
  label: string
  /** Whether the theme is dark or light — used to pick sensible UI defaults. */
  appearance: 'dark' | 'light'
  /** Lazy loader for the Shiki theme registration (dynamic import). */
  load: () => Promise<unknown>
}

export interface LanguageMeta {
  id: LanguageId
  label: string
  /** Lazy loader for the Shiki TextMate grammar (dynamic import). */
  load: () => Promise<unknown>
}

export interface BackgroundPreset {
  id: string
  label: string
  /** Any valid CSS `background` value (solid color or gradient). */
  css: string
}

/**
 * The single, centralized settings object that fully describes a SnapCode
 * card. All editor controls read from and write to this.
 */
export interface SnapSettings {
  code: string
  language: LanguageId
  theme: ThemeId
  /** ID of a preset in `backgrounds.ts`. */
  background: string
  /** Outer padding around the code card, in pixels. */
  padding: number
  /** Show the macOS-style title bar with traffic-light dots. */
  showChrome: boolean
}
