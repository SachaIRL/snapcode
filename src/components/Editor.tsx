/** Plain-textarea code input. Intentionally lightweight for v1. */
interface EditorProps {
  code: string
  onChange: (code: string) => void
}

export function Editor({ code, onChange }: EditorProps) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      className="h-full w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm text-neutral-200 outline-none focus:border-neutral-600"
      placeholder="Paste your code here…"
    />
  )
}
