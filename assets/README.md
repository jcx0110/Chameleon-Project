# Chameleon Website Assets

Static media used by the Chameleon project page lives here.

## Current structure

- `papers/2603.24576v2.pdf` — canonical archived paper
- `favicon-chameleon.png` — tightly framed full-chameleon favicon for browser tabs and saved links
- `images/chameleon-mascot.png` — lightweight transparent brand mascot used in the site header
- `images/chameleon-ink-splatter.svg` — transparent mottled ink texture used across headings and ambient color fields
- `videos/supplementary-video-final.mp4` — hero and overview demo (web-optimized copy of the final supplementary video)
- `videos/video1 - teaser.mp4` — previous teaser, retained as a legacy asset

## Demos

- `demos/real/` — Camo-Dataset real-robot rollouts (720p, H.264, muted) with a poster `.jpg` each. Cut from the team's processed clips; the speed-up is labelled in `config/site-data.js`.
- `demos/sim/{memorybench,libero-10,mikasa-robo}/` — one successful rollout per task, third-person half of the original side-by-side render, with posters.
- `images/camo/` — frames cropped from paper Figure 3, used in the Camo-Dataset section.

To add or replace a rollout, drop the file in the matching folder and edit `realDemos` or `simBenchmarks` in `config/site-data.js`. Phase timings for a real-robot episode go in its `phases` array (start second of each timeline segment, in the web clip); without it the task's `draftPhases` fractions are used.

## Content sources

- Page copy and reported values are derived from the archived v2 paper.
- `PAPER_CONTEXT.md` contains the compact working reference for future edits.
- The PDF is authoritative when a number or claim needs to be checked.
