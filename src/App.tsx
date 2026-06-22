import { useRef, useState } from 'react'
import { Editor } from './components/Editor'
import { PreviewCard } from './components/PreviewCard'
import { ExportBar } from './components/ExportBar'
import { useSettings } from './lib/useSettings'
import { useHighlightedHtml } from './lib/useHighlightedHtml'
import { defaultFilename, downloadDataUrl, exportPng } from './lib/exportImage'

function App() {
  const { settings, update } = useSettings()
  const { html, isLoading } = useHighlightedHtml(
    settings.code,
    settings.language,
    settings.theme,
  )

  const cardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  async function handleExportPng() {
    const node = cardRef.current
    if (!node) return
    setIsExporting(true)
    try {
      const dataUrl = await exportPng(node, { pixelRatio: 2 })
      downloadDataUrl(dataUrl, defaultFilename('png'))
    } catch (error) {
      console.error('PNG export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-3">
        <h1 className="text-lg font-semibold tracking-tight">SnapCode</h1>
        <ExportBar
          onExportPng={handleExportPng}
          busy={isLoading || isExporting}
        />
      </header>

      <main className="grid flex-1 gap-6 p-6 lg:grid-cols-2">
        {/* Editor */}
        <section className="flex min-h-[300px] flex-col">
          <Editor code={settings.code} onChange={(c) => update('code', c)} />
        </section>

        {/* Live preview */}
        <section className="flex items-center justify-center overflow-auto rounded-lg bg-neutral-900/50 p-6">
          <PreviewCard html={html} settings={settings} exportRef={cardRef} />
        </section>
      </main>
    </div>
  )
}

export default App
