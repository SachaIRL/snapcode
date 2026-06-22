/**
 * Dev-only helper used to generate the README example images.
 *
 * It accepts `POST /save { name, dataUrl }` from the running app and writes the
 * decoded PNG into `examples/`. This exists so exports can be captured straight
 * from the real app (pixel-identical to what users get) without piping image
 * bytes through anything else. Run it, generate the images, then stop it — it
 * is not part of the app or the build.
 *
 *   node scripts/save-image-server.mjs
 */
import { createServer } from 'node:http'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PORT = 5179
const examplesDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'examples',
)

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const server = createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors).end()
    return
  }
  if (req.method !== 'POST' || req.url !== '/save') {
    res.writeHead(404, cors).end()
    return
  }

  let body = ''
  req.on('data', (chunk) => (body += chunk))
  req.on('end', async () => {
    try {
      const { name, dataUrl } = JSON.parse(body)
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '')
      await mkdir(examplesDir, { recursive: true })
      const file = join(examplesDir, `${name}.png`)
      await writeFile(file, Buffer.from(base64, 'base64'))
      const bytes = Buffer.byteLength(base64, 'base64')
      console.log(`saved ${name}.png (${Math.round(bytes / 1024)} KB)`)
      res.writeHead(200, { 'Content-Type': 'application/json', ...cors })
      res.end(JSON.stringify({ ok: true, bytes }))
    } catch (err) {
      console.error('save failed:', err)
      res.writeHead(500, { 'Content-Type': 'application/json', ...cors })
      res.end(JSON.stringify({ ok: false, error: String(err) }))
    }
  })
})

server.listen(PORT, () =>
  console.log(`save-image-server on http://localhost:${PORT}`),
)
