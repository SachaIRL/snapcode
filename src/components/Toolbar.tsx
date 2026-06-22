/**
 * The control surface: theme, language, background, padding, and window chrome.
 * Reads from and writes to the single centralized settings object.
 */
import { backgrounds } from '../core/backgrounds'
import { languages } from '../core/languages'
import { themes } from '../core/themes'
import type { LanguageId, SnapSettings, ThemeId } from '../core/types'
import { Field, SelectControl, Slider, Toggle, type Option } from './controls'

const themeOptions: Option<ThemeId>[] = themes.map((t) => ({
  value: t.id,
  label: t.label,
}))

const languageOptions: Option<LanguageId>[] = languages.map((l) => ({
  value: l.id,
  label: l.label,
}))

interface ToolbarProps {
  settings: SnapSettings
  update: <K extends keyof SnapSettings>(key: K, value: SnapSettings[K]) => void
}

export function Toolbar({ settings, update }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
      <div className="w-44">
        <Field label="Theme">
          <SelectControl
            value={settings.theme}
            options={themeOptions}
            onChange={(v) => update('theme', v)}
          />
        </Field>
      </div>

      <div className="w-40">
        <Field label="Language">
          <SelectControl
            value={settings.language}
            options={languageOptions}
            onChange={(v) => update('language', v)}
          />
        </Field>
      </div>

      <Field label="Background">
        <BackgroundSwatches
          value={settings.background}
          onChange={(v) => update('background', v)}
        />
      </Field>

      <div className="w-48">
        <Field label="Padding">
          <Slider
            value={settings.padding}
            min={0}
            max={128}
            step={8}
            suffix="px"
            onChange={(v) => update('padding', v)}
          />
        </Field>
      </div>

      <Field label="Window">
        <div className="flex h-[38px] items-center gap-2">
          <Toggle
            checked={settings.showChrome}
            onChange={(v) => update('showChrome', v)}
          />
          <span className="text-sm text-neutral-400">Chrome</span>
        </div>
      </Field>
    </div>
  )
}

/** Row of clickable background previews. */
function BackgroundSwatches({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {backgrounds.map((bg) => {
        const selected = bg.id === value
        const isNone = bg.id === 'none'
        return (
          <button
            key={bg.id}
            type="button"
            title={bg.label}
            aria-label={bg.label}
            aria-pressed={selected}
            onClick={() => onChange(bg.id)}
            className={`h-8 w-8 rounded-lg transition ${
              selected
                ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-neutral-900'
                : 'ring-1 ring-neutral-700 hover:ring-neutral-500'
            } ${isNone ? 'snap-swatch-none' : ''}`}
            style={isNone ? undefined : { background: bg.css }}
          />
        )
      })}
    </div>
  )
}
