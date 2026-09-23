# Chameleon Website Media Guide

This directory is a source archive, not a folder that should be published wholesale. The website should use a small, curated set of files copied into `assets/demos/` or `assets/images/` after visual review and integrity checks.

Last reviewed: 23 September 2026.

## Selection principle

Use media only when it helps explain one of these stories:

1. **Observation–action delay:** evidence appears early and is unavailable at decision time.
2. **Camo-Dataset:** Clean Plate, Shell Game, and Seasonings should each have one concise real-robot example.
3. **Public benchmark generalization:** use at most one representative clip per benchmark family.
4. **Mechanistic evidence:** figures should explain separability, addressability, or prospectiveness.

Do not add media simply because it exists in this folder. Prefer a small number of clear examples over a complete experiment dump.

## Light inventory

The uploaded folder currently contains approximately 59 MB and 658 files. The main groups are:

- 275 non-empty MP4 files
- 150 JSONL trace files
- 52 JSON result or metric files
- 7 MP3 narration files
- 5 PNG images
- 2 PowerPoint files
- 1 ZIP archive plus an expanded `simulators/` copy
- macOS `__MACOSX`, AppleDouble, and `.DS_Store` metadata

The simulator material covers:

- MIKASA-Robo: RememberColor, ShellGameTouch, and Intercept variants
- MemoryBench: put-block-back, rearrange-block, and reopen-drawer variants
- LIBERO-10: task result JSON files

## Recommended first-round candidates

### 1. Evaluation figure — use

`chameleon_benchmarks.png`

- Valid PNG, 3432 × 3431.
- Directly supports the public benchmark results section.
- Recommended placement: Evaluation, after the compact numerical result cards.
- Before publishing, confirm that every baseline label and protocol note matches the final paper version.

### 2. Chameleon artwork — optional decorative use

`ChatGPT Image 2026年6月5日 14_33_09.png`

- Valid image with a blue/purple/gold chameleon.
- Visually compatible with the current website palette.
- Suitable for a small brand accent, section break, or poster—not as scientific evidence.
- Keep provenance clear because this is AI-generated artwork.

### 3. Brain artwork — optional, low priority

`ChatGPT Image 2026年6月4日 15_14_17.png`

- Valid watercolor brain illustration.
- Could support the human-memory analogy in Motivation or Mechanistic Evidence.
- Avoid making it a central scientific diagram; the paper uses neuroscience as functional inspiration, not as a biological implementation claim.

### 4. MIKASA simulator snippets — secondary demo strip only

The usable samples inspected under `simulators/simulators/mikasa_rollout/` are generally 256 × 128 and roughly 1.5–5.7 seconds long.

Possible representatives:

- `mikasa_5task_latest/RememberColor3-v0/videos/RememberColor3-v0_trial000_success1.mp4`
- `mikasa_5task_latest/RememberColor5-v0/videos/RememberColor5-v0_trial000_success1.mp4`
- `mikasa_5task_latest/RememberColor9-v0/videos/RememberColor9-v0_trial000_success1.mp4`
- `mikasa_5task_latest/ShellGameTouch-v0/videos/ShellGameTouch-v0_trial000_success1.mp4`
- `mikasa_5task_latest/InterceptMedium-v0/videos/InterceptMedium-v0_trial000_success1.mp4`
- `shellgametouch_latest/videos/ShellGameTouch-v0_trial029_success1.mp4`

These are too small and short for the Hero. If used, place them in a compact “Public benchmark examples” carousel and upscale carefully without claiming that they are Camo-Dataset real-robot footage.

### 5. Narration audio — retain for editing, do not expose directly

- `1.mp3` through `6.mp3`: approximately 30–50 seconds each.
- `merged_1780581250458.mp3`: approximately 229 seconds.

These appear to be supplementary-video narration. Keep them for reconstructing a final video, but do not add audio players to the project homepage unless there is a clear accessibility or presentation need.

## Not ready for website use

### Uploaded files that appear truncated

The following files fail integrity or decode checks and should not be published in their current form:

- `supplementary video [自动保存的].mp4`
- `supplementary_fixed.mp4`
- `supplementary_fixed2.mp4`
- `supplementary video final.mp4` — metadata is readable, but decoding reports a partial file
- `supplementary video [自动保存的].pptx`
- `supplementary video.pptx`
- `simulators.zip`
- `ChatGPT Image 2026年6月5日 14_21_48.png`

Several MemoryBench MP4 files also have uniform power-of-two file sizes and fail with `moov atom not found`, which is consistent with partial uploads. Re-upload originals before selecting them.

### Missing or unsuitable material

- LIBERO-10 currently provides result JSON files but no usable rollout videos in the uploaded copy.
- Real-robot Clean Plate, Shell Game, and Seasonings videos are not available as individually verified clips.
- `ai_chip_highres_transparent.png` is valid but generic and does not explain Chameleon's memory mechanism; leave it unused unless a later visual concept specifically requires it.

## Keep out of the published repository

Do not publish these directly:

- `__MACOSX/`, AppleDouble `._*`, and `.DS_Store` files
- raw JSONL traces
- redundant seeds, epochs, smoke tests, and checkpoint variants
- duplicate success rollouts
- full metric dumps when the paper already reports the relevant aggregate
- unsuccessful rollouts unless they are intentionally presented as a clearly labelled failure analysis
- autosaved PowerPoint and video variants
- the original ZIP after an approved subset has been extracted

## Proposed website media structure

```text
assets/
  demos/
    camo/
      clean-plate.mp4
      shell-game.mp4
      seasonings.mp4
    benchmarks/
      memorybench.mp4
      libero-10.mp4
      mikasa-shell-game.mp4
  images/
    evaluation/
      public-benchmarks.png
    artwork/
      chameleon.png
      brain.png
```

Only copy approved files into this structure. The current `video/` folder should remain an untracked local source archive.

## Proposed page use

### Hero

Use one edited real-robot montage, ideally 12–20 seconds, covering the evidence event, delay, aliased decision point, and correct action. Do not use a simulator rollout or the truncated supplementary video as the Hero.

### Camo-Dataset carousel

Use exactly three primary real-robot clips:

1. Clean a specified plate
2. Play shell game
3. Add various seasonings

Each clip should make the hidden variable and decision point visually understandable. Additional variations should not become separate top-level slides.

### Public benchmark examples

Use at most one short representative clip each for MemoryBench, LIBERO-10, and MIKASA-Robo. This can be a secondary compact carousel below the main Camo-Dataset demos.

### Evaluation

Use `chameleon_benchmarks.png` or rebuild it as a responsive web-native chart. Do not show every raw metric JSON file.

### Mechanistic Evidence

Prefer the paper's actual probe plots and trace interventions. The brain artwork may be used only as a decorative supporting image.

## Export requirements for approved videos

- MP4 with H.264 video
- 16:9 where possible
- 720p or 1080p
- `faststart` enabled for browser streaming
- muted by default; captions required if narration is important
- approximately 12–25 seconds for primary demos
- ideally below 15–20 MB per file
- no private paths, debug overlays, or personally identifying information

Suggested conversion pattern:

```bash
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 23 -preset medium \
  -movflags +faststart -an output.mp4
```

## Next material needed

Please re-upload or copy complete versions of:

- the final supplementary video
- one real-robot success clip for each Camo-Dataset task
- one representative MemoryBench clip
- one representative LIBERO-10 clip

After those files pass decode checks, update this guide with an explicit approved shortlist before editing the live website.

