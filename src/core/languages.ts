/**
 * Supported languages, each lazy-loading its Shiki TextMate grammar on demand.
 */
import type { LanguageId, LanguageMeta } from './types'

export const languages: LanguageMeta[] = [
  {
    id: 'typescript',
    label: 'TypeScript',
    load: () => import('@shikijs/langs/typescript'),
  },
  { id: 'tsx', label: 'TSX', load: () => import('@shikijs/langs/tsx') },
  {
    id: 'javascript',
    label: 'JavaScript',
    load: () => import('@shikijs/langs/javascript'),
  },
  { id: 'jsx', label: 'JSX', load: () => import('@shikijs/langs/jsx') },
  {
    id: 'python',
    label: 'Python',
    load: () => import('@shikijs/langs/python'),
  },
  { id: 'rust', label: 'Rust', load: () => import('@shikijs/langs/rust') },
  { id: 'go', label: 'Go', load: () => import('@shikijs/langs/go') },
  { id: 'java', label: 'Java', load: () => import('@shikijs/langs/java') },
  { id: 'json', label: 'JSON', load: () => import('@shikijs/langs/json') },
  { id: 'html', label: 'HTML', load: () => import('@shikijs/langs/html') },
  { id: 'css', label: 'CSS', load: () => import('@shikijs/langs/css') },
  { id: 'bash', label: 'Shell', load: () => import('@shikijs/langs/bash') },
  { id: 'sql', label: 'SQL', load: () => import('@shikijs/langs/sql') },
  {
    id: 'markdown',
    label: 'Markdown',
    load: () => import('@shikijs/langs/markdown'),
  },
  { id: 'yaml', label: 'YAML', load: () => import('@shikijs/langs/yaml') },
]

export const languagesById = new Map<LanguageId, LanguageMeta>(
  languages.map((l) => [l.id, l]),
)
