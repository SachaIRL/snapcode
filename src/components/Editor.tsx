/** Plain-textarea code input. Intentionally lightweight for v1. */
import type { KeyboardEvent } from 'react'

const TAB = '  '

interface EditorProps {
  code: string
  onChange: (code: string) => void
}

export function Editor({ code, onChange }: EditorProps) {
  // Make Tab insert spaces (and Shift+Tab outdent) instead of moving focus —
  // table stakes for anything you'd actually paste code into.
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const ta = e.currentTarget
    const { selectionStart: start, selectionEnd: end } = ta

    if (e.shiftKey) {
      // Outdent: remove up to TAB.length spaces before the caret on its line.
      const lineStart = code.lastIndexOf('\n', start - 1) + 1
      const indent = code.slice(lineStart).match(/^ +/)?.[0].length ?? 0
      const remove = Math.min(TAB.length, indent)
      if (remove === 0) return
      const next = code.slice(0, lineStart) + code.slice(lineStart + remove)
      onChange(next)
      queueMicrotask(() => {
        ta.selectionStart = ta.selectionEnd = Math.max(
          lineStart,
          start - remove,
        )
      })
      return
    }

    const next = code.slice(0, start) + TAB + code.slice(end)
    onChange(next)
    queueMicrotask(() => {
      ta.selectionStart = ta.selectionEnd = start + TAB.length
    })
  }

  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      className="h-full w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm text-neutral-200 outline-none focus:border-neutral-600"
      placeholder="Paste your code here…"
    />
  )
}
