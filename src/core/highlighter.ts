/**
 * Shiki highlighter singleton.
 *
 * The highlighter is expensive to construct, so we create exactly one (as a
 * module-level promise) and reuse it for the lifetime of the app. Themes and
 * grammars are loaded lazily on first use and cached, so the initial bundle
 * stays small and we never re-register what we've already loaded.
 *
 * We use the pure-JavaScript RegExp engine (rather than the WASM Oniguruma
 * engine) so there's no `.wasm` asset to ship or fetch — the right trade-off
 * for a static, client-side web app. `forgiving: true` keeps a rare
 * unsupported grammar pattern from throwing at runtime.
 */
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { themesById } from './themes'
import { languagesById } from './languages'
import type { LanguageId, ThemeId } from './types'

let highlighterPromise: Promise<HighlighterCore> | null = null
const loadedThemes = new Set<ThemeId>()
const loadedLanguages = new Set<LanguageId>()

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [],
      langs: [],
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    })
  }
  return highlighterPromise
}

async function ensureTheme(
  highlighter: HighlighterCore,
  theme: ThemeId,
): Promise<void> {
  if (loadedThemes.has(theme)) return
  const meta = themesById.get(theme)
  if (!meta) throw new Error(`Unknown theme: ${theme}`)
  // The loader resolves to a Shiki theme module; cast to the exact input type
  // `loadTheme` accepts so `core/types.ts` stays free of Shiki imports.
  type ThemeInput = Parameters<HighlighterCore['loadTheme']>[0]
  await highlighter.loadTheme(meta.load() as ThemeInput)
  loadedThemes.add(theme)
}

async function ensureLanguage(
  highlighter: HighlighterCore,
  language: LanguageId,
): Promise<void> {
  if (loadedLanguages.has(language)) return
  const meta = languagesById.get(language)
  if (!meta) throw new Error(`Unknown language: ${language}`)
  type LangInput = Parameters<HighlighterCore['loadLanguage']>[0]
  await highlighter.loadLanguage(meta.load() as LangInput)
  loadedLanguages.add(language)
}

/**
 * Highlight `code` and return a complete `<pre class="shiki">…</pre>` HTML
 * string, with the theme and grammar loaded on demand. The returned markup
 * carries its own colors inline, so it renders identically wherever it's
 * injected — including into the export snapshot.
 */
export async function highlightToHtml(
  code: string,
  language: LanguageId,
  theme: ThemeId,
): Promise<string> {
  const highlighter = await getHighlighter()
  await Promise.all([
    ensureTheme(highlighter, theme),
    ensureLanguage(highlighter, language),
  ])
  return highlighter.codeToHtml(code, {
    lang: language,
    theme,
  })
}

/** Dispose the singleton (e.g. on hot-reload teardown). */
export function disposeHighlighter(): void {
  if (!highlighterPromise) return
  void highlighterPromise.then((h) => h.dispose())
  highlighterPromise = null
  loadedThemes.clear()
  loadedLanguages.clear()
}
