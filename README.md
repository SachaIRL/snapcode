# SnapCode

Turn a snippet of source code into a beautiful, shareable image — the
open-source, no-login, self-hostable answer to carbon.now.sh and ray.so.

> **Status:** under active development. v1 is being built in phases.

SnapCode is a single-page web app: paste code, pick a theme and background, and
export an editor-grade, high-DPI image (PNG or SVG) or copy it straight to your
clipboard. Everything runs in your browser — no accounts, no backend, no
tracking.

## Why

The entire value of this project is how good the exported image looks, so the
two things that get disproportionate care are **editor-grade syntax
highlighting** (via [Shiki](https://shiki.style), which uses VS Code's TextMate
grammars) and **faithful, crisp image export**.

## Tech stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Shiki](https://shiki.style) for syntax highlighting
- [html-to-image](https://github.com/bubkoo/html-to-image) for export

## Development

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run lint`,
`npm run format`.

## License

[MIT](./LICENSE)
