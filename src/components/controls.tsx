/**
 * Small, reusable control primitives for the toolbar. Kept intentionally plain
 * and dependency-free — just styled native inputs for accessibility.
 */
import type { ReactNode } from 'react'

/** Labelled wrapper that stacks a caption above its control. */
export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
        {label}
      </span>
      {children}
    </label>
  )
}

export interface Option<T extends string> {
  value: T
  label: string
}

/** Styled native <select>. */
export function SelectControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-700 bg-neutral-800 py-2 pr-8 pl-3 text-sm text-neutral-100 outline-none transition hover:border-neutral-600 focus:border-violet-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-neutral-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

/** Accessible on/off switch. */
export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-violet-600' : 'bg-neutral-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

/** Range slider with a live value readout. */
export function Slider({
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}: {
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="snap-range h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-neutral-700"
      />
      <span className="w-12 text-right font-mono text-xs text-neutral-400 tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  )
}
