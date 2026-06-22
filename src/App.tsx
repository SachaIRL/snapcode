import { useRef, useState } from 'react'
import { Editor } from './components/Editor'
import { PreviewCard } from './components/PreviewCard'
import { ExportBar } from './components/ExportBar'
import { Toolbar } from './components/Toolbar'
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
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white">
            S
          </span>
          <h1 className="text-lg font-semibold tracking-tight">SnapCode</h1>
        </div>
        <ExportBar
          onExportPng={handleExportPng}
          busy={isLoading || isExporting}
        />
      </header>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <Toolbar settings={settings} update={update} />

        <main className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Editor */}
          <section className="flex min-h-[340px] flex-col">
            <Editor code={settings.code} onChange={(c) => update('code', c)} />
          </section>

          {/* Live preview stage */}
          <section className="snap-stage flex min-h-[340px] items-center justify-center overflow-auto rounded-xl border border-neutral-800 p-8">
            <PreviewCard html={html} settings={settings} exportRef={cardRef} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
