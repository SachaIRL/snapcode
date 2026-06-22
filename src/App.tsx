import { useCallback, useEffect, useRef } from 'react'
import { Editor } from './components/Editor'
import { PreviewCard } from './components/PreviewCard'
import { ExportBar } from './components/ExportBar'
import { Toolbar } from './components/Toolbar'
import { useSettings } from './lib/useSettings'
import { useHighlightedHtml } from './lib/useHighlightedHtml'
import {
  copyPngToClipboard,
  defaultFilename,
  downloadDataUrl,
  exportPng,
  exportSvg,
  isClipboardImageSupported,
} from './lib/exportImage'

const PIXEL_RATIO = 2
const copySupported = isClipboardImageSupported()

function App() {
  const { settings, update } = useSettings()
  const { html, isLoading } = useHighlightedHtml(
    settings.code,
    settings.language,
    settings.theme,
  )

  const cardRef = useRef<HTMLDivElement>(null)

  const handleExportPng = useCallback(async () => {
    const node = cardRef.current
    if (!node) return
    const dataUrl = await exportPng(node, { pixelRatio: PIXEL_RATIO })
    downloadDataUrl(dataUrl, defaultFilename('png'))
  }, [])

  const handleExportSvg = useCallback(async () => {
    const node = cardRef.current
    if (!node) return
    const dataUrl = await exportSvg(node, { pixelRatio: PIXEL_RATIO })
    downloadDataUrl(dataUrl, defaultFilename('svg'))
  }, [])

  const handleCopy = useCallback(async () => {
    const node = cardRef.current
    if (!node) return
    await copyPngToClipboard(node, { pixelRatio: PIXEL_RATIO })
  }, [])

  // Cmd/Ctrl+S exports a PNG instead of saving the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!isLoading) void handleExportPng()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isLoading, handleExportPng])

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white">
            S
          </span>
          <h1 className="text-lg font-semibold tracking-tight">SnapCode</h1>
        </div>
        <ExportBar
          onExportPng={handleExportPng}
          onExportSvg={handleExportSvg}
          onCopy={handleCopy}
          copySupported={copySupported}
          disabled={isLoading}
        />
      </header>

      <div className="flex flex-1 flex-col gap-4 p-3 sm:gap-5 sm:p-5">
        <Toolbar settings={settings} update={update} />

        <main className="grid flex-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Editor */}
          <section className="flex min-h-[260px] flex-col sm:min-h-[340px]">
            <Editor code={settings.code} onChange={(c) => update('code', c)} />
          </section>

          {/* Live preview stage */}
          <section className="snap-stage flex min-h-[320px] items-center justify-center overflow-auto rounded-xl border border-neutral-800 p-4 sm:min-h-[340px] sm:p-8">
            <PreviewCard html={html} settings={settings} exportRef={cardRef} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
