/**
 * Export controls: PNG download, SVG download, and copy-to-clipboard as an
 * image. Manages its own transient busy / "copied" feedback so the parent only
 * has to provide the async actions.
 */
import { useEffect, useRef, useState } from 'react'

type Action = 'png' | 'svg' | 'copy'

interface ExportBarProps {
  onExportPng: () => Promise<void>
  onExportSvg: () => Promise<void>
  onCopy: () => Promise<void>
  /** Hide the copy button where the clipboard image API is unavailable. */
  copySupported: boolean
  /** Disabled until the first highlight has rendered. */
  disabled: boolean
}

export function ExportBar({
  onExportPng,
  onExportSvg,
  onCopy,
  copySupported,
  disabled,
}: ExportBarProps) {
  const [pending, setPending] = useState<Action | null>(null)
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(copiedTimer.current), [])

  async function run(action: Action, fn: () => Promise<void>) {
    if (pending || disabled) return
    setPending(action)
    try {
      await fn()
      if (action === 'copy') {
        setCopied(true)
        window.clearTimeout(copiedTimer.current)
        copiedTimer.current = window.setTimeout(() => setCopied(false), 1600)
      }
    } catch (error) {
      console.error(`${action} export failed:`, error)
    } finally {
      setPending(null)
    }
  }

  const busy = pending !== null || disabled

  return (
    <div className="flex items-center gap-2">
      {copySupported && (
        <button
          type="button"
          onClick={() => run('copy', onCopy)}
          disabled={busy}
          className="rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-200 transition hover:border-neutral-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? 'Copied!' : pending === 'copy' ? 'Copying…' : 'Copy'}
        </button>
      )}
      <button
        type="button"
        onClick={() => run('svg', onExportSvg)}
        disabled={busy}
        className="rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-200 transition hover:border-neutral-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending === 'svg' ? 'Exporting…' : 'SVG'}
      </button>
      <button
        type="button"
        onClick={() => run('png', onExportPng)}
        disabled={busy}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending === 'png' ? 'Exporting…' : 'Export PNG'}
      </button>
    </div>
  )
}
