/** Centralized, typed settings state for the whole editor. */
import { useCallback, useState } from 'react'
import { DEFAULT_SETTINGS } from '../core/defaults'
import type { SnapSettings } from '../core/types'

export interface UseSettings {
  settings: SnapSettings
  /** Update a single setting in a type-safe way. */
  update: <K extends keyof SnapSettings>(key: K, value: SnapSettings[K]) => void
}

export function useSettings(
  initial: SnapSettings = DEFAULT_SETTINGS,
): UseSettings {
  const [settings, setSettings] = useState<SnapSettings>(initial)

  const update = useCallback<UseSettings['update']>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { settings, update }
}
