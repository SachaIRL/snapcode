/**
 * The single exportable node.
 *
 * Everything that should appear in the final image — background, padding,
 * window chrome, rounded corners, the highlighted code — lives inside the one
 * element this component attaches `exportRef` to (`#snap-preview-card`). The
 * exporter rasterizes exactly that node, so what you see here is what you get.
 */
import type { RefObject } from 'react'
import { backgroundsById } from '../core/backgrounds'
import type { SnapSettings } from '../core/types'

interface PreviewCardProps {
  /** Pre-highlighted `<pre class="shiki">…</pre>` markup from Shiki. */
  html: string
  settings: SnapSettings
  /** Attached to the exportable node so the exporter can capture it. */
  exportRef: RefObject<HTMLDivElement | null>
}

/** Pull the theme's background color out of Shiki's inline-styled output. */
const BG_COLOR_RE = /background-color:\s*([^;"]+)/i

export function PreviewCard({ html, settings, exportRef }: PreviewCardProps) {
  const background =
    backgroundsById.get(settings.background)?.css ?? 'transparent'
  const codeBackground = BG_COLOR_RE.exec(html)?.[1] ?? '#1e1e1e'

  return (
    <div
      id="snap-preview-card"
      ref={exportRef}
      className="snap-preview"
      style={{ background, padding: settings.padding }}
    >
      <div className="snap-window" style={{ background: codeBackground }}>
        {settings.showChrome && (
          <div className="snap-chrome">
            <span className="snap-dot" style={{ background: '#ff5f56' }} />
            <span className="snap-dot" style={{ background: '#ffbd2e' }} />
            <span className="snap-dot" style={{ background: '#27c93f' }} />
          </div>
        )}
        <div className="snap-code" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
