/**
 * Export controls. Phase 1 ships PNG download; SVG + copy-to-clipboard land in
 * Phase 3.
 */
interface ExportBarProps {
  onExportPng: () => void
  /** Disabled until the first highlight has rendered / while exporting. */
  busy: boolean
}

export function ExportBar({ onExportPng, busy }: ExportBarProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onExportPng}
        disabled={busy}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? 'Exporting…' : 'Export PNG'}
      </button>
    </div>
  )
}
