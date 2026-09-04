# papercrane blog

The papercrane writing surface. One post so far.

## Posts

| Post | Published |
| --- | --- |
| [Senba](src/app/posts/benchmarking-senba/page.tsx) — how Senba was fine-tuned from MarS-FM, what the training cost, and how it performed on 28 mdCATH validation proteins | 2026-08-25 |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

Next.js App Router, hand-written CSS modules for the post, Tailwind v4 tokens
for the surrounding chrome. No database, no analytics, no client-side state.

## How the Senba post is built

`src/app/posts/benchmarking-senba/` is self-contained:

| File | What it holds |
| --- | --- |
| `page.tsx` | The article. Prose, the weight-interpolation equation, and the `BlogPosting` structured data. |
| `data.ts` | Every number in the post and its figures, transcribed from the frozen run receipts. |
| `figures.tsx` | Three inline-SVG figures drawn from `data.ts`. No charting library. |
| `post.module.css` | The post's own dark theme, which also retints the site header through `body:has(.page) > header`. |

The figures are plain SVG on purpose: they are server-rendered, they carry
`<title>`/`<desc>` for screen readers, they scroll horizontally on narrow
screens instead of shrinking to nothing, and they add nothing to the client
bundle.

## Typeface

The post sets [CLT Ronzino](https://www.collletttivo.it/) by Collletttivo,
self-hosted from `public/fonts/ronzino/` under the SIL Open Font License 1.1
(`public/fonts/ronzino/LICENSE.txt`). The site chrome uses Instrument Serif and
IBM Plex Mono via `next/font`.

## Related

- The Senba model release, with weights, receipts and protocols:
  <https://huggingface.co/vkali08/senba>
- MarS-FM, the source model Senba adapts:
  <https://github.com/valence-labs/mars-fm>
- mdCATH, the dataset the adaptation pairs come from:
  <https://huggingface.co/datasets/compsciencelab/mdCATH>
