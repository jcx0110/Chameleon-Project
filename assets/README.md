# Assets Guide

This folder stores all static resources for the project page.

## Suggested structure

- `assets/images/`: paper figures and teaser images
- `assets/demos/`: demo covers, videos, and preview resources

## Required placeholders in `config/site-data.js`

- `paper.teaser`: optional teaser image path
- `images[].thumbnail`: gallery card image
- `images[].full`: full-resolution image or page
- `demos[].cover`: demo card cover
- `demos[].url`: destination URL for live demo or video

## Replace workflow

1. Put your files under `assets/images/` or `assets/demos/`.
2. Update corresponding paths in `config/site-data.js`.
3. Reload `index.html` to verify rendering.

If a file path is missing or invalid, the page will show a placeholder block instead of breaking layout.
