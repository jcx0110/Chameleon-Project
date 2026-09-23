# Chameleon Website Assets

Static media used by the Chameleon project page lives here.

## Current structure

- `papers/2603.24576v2.pdf` — canonical archived paper
- `favicon-chameleon.png` — cropped chameleon-head favicon for browser tabs and saved links
- `images/chameleon-mascot.png` — lightweight transparent brand mascot used in the site header
- `videos/supplementary-video-final.mp4` — hero and overview demo (web-optimized copy of the final supplementary video)
- `videos/video1 - teaser.mp4` — previous teaser, retained as a legacy asset

## Adding dataset demos

1. Put the new videos under `assets/videos/` (or create `assets/demos/`).
2. Open `config/site-data.js`.
3. Find the matching item in `SITE_DATA.demos`.
4. Set `mediaType` to `"video"` and set `src` to the local asset path.
5. Optionally set a poster image with `poster`.

The circular carousel, controls, touch gestures, and video pause/play behavior are handled by `script.js`.

## Content sources

- Page copy and reported values are derived from the archived v2 paper.
- `PAPER_CONTEXT.md` contains the compact working reference for future edits.
- The PDF is authoritative when a number or claim needs to be checked.
