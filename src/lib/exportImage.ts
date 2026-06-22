/**
 * html-to-image wrapper for turning the preview card DOM node into a crisp,
 * downloadable image.
 *
 * The output quality of this app lives or dies here, so a few things matter:
 *
 *  - Fonts must be fully loaded before capture, or text silently falls back to
 *    a system font in the exported image. We `await document.fonts.ready`.
 *  - `getFontEmbedCSS()` is expensive (it parses + inlines @font-face rules), so
 *    we compute it once and reuse the result across exports via `fontEmbedCSS`.
 *  - `pixelRatio: 2` renders at 2× so the asset is sharp on high-DPI screens;
 *    the device's own ratio isn't enough for a file people will share.
 *  - `cacheBust: true` avoids stale embedded assets.
 */
import { toBlob, toPng, toSvg, getFontEmbedCSS } from 'html-to-image'

let cachedFontEmbedCSS: string | null = null

/** Compute the embedded-font CSS once, then reuse it for every export. */
async function getCachedFontEmbedCSS(node: HTMLElement): Promise<string> {
  if (cachedFontEmbedCSS === null) {
    cachedFontEmbedCSS = await getFontEmbedCSS(node)
  }
  return cachedFontEmbedCSS
}

/** Invalidate the font-embed cache (call if the bundled fonts change). */
export function resetFontEmbedCache(): void {
  cachedFontEmbedCSS = null
}

export interface ExportOptions {
  /** Device-independent scale factor. 2 = retina-sharp, 3 = poster-sharp. */
  pixelRatio?: number
}

async function prepare(node: HTMLElement, pixelRatio: number) {
  await document.fonts.ready
  const fontEmbedCSS = await getCachedFontEmbedCSS(node)
  return { pixelRatio, cacheBust: true, fontEmbedCSS }
}

/** Render `node` to a PNG data URL. */
export async function exportPng(
  node: HTMLElement,
  { pixelRatio = 2 }: ExportOptions = {},
): Promise<string> {
  const options = await prepare(node, pixelRatio)
  return toPng(node, options)
}

/** Render `node` to an SVG data URL (vector wrapper around the DOM). */
export async function exportSvg(
  node: HTMLElement,
  { pixelRatio = 2 }: ExportOptions = {},
): Promise<string> {
  const options = await prepare(node, pixelRatio)
  return toSvg(node, options)
}

/**
 * Render `node` to a PNG and write it to the clipboard as an image.
 * Must be called from a user gesture (button click / keyboard shortcut).
 */
export async function copyPngToClipboard(
  node: HTMLElement,
  { pixelRatio = 2 }: ExportOptions = {},
): Promise<void> {
  const options = await prepare(node, pixelRatio)
  const blob = await toBlob(node, options)
  if (!blob) throw new Error('Failed to render image for the clipboard')
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
}

/** Whether copying an image to the clipboard is supported in this browser. */
export function isClipboardImageSupported(): boolean {
  return (
    typeof ClipboardItem !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.clipboard?.write
  )
}

/** A sensible, collision-free default filename. */
export function defaultFilename(ext: string): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .slice(0, 19)
  return `snapcode-${stamp}.${ext}`
}

/** Trigger a browser download for a data URL. */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
