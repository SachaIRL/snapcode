/** Default settings + sample code so the app looks alive on first load. */
import type { SnapSettings } from './types'

export const SAMPLE_CODE = `// Greet everyone in the room.
type Person = {
  name: string
  role: "host" | "guest"
}

function greet(people: Person[]): string {
  const hosts = people.filter((p) => p.role === "host")
  const names = people.map((p) => p.name).join(", ")

  return hosts.length > 0
    ? \`Welcome \${names} — hosted by \${hosts[0].name}!\`
    : \`Welcome \${names}!\`
}

greet([
  { name: "Ada", role: "host" },
  { name: "Grace", role: "guest" },
])
`

export const DEFAULT_SETTINGS: SnapSettings = {
  code: SAMPLE_CODE,
  language: 'typescript',
  theme: 'github-dark',
  background: 'grape',
  padding: 32,
  showChrome: true,
}
