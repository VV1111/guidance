# Tools & Guides

Step-by-step guides for our lab's research tools — written steps, screenshots and short screen recordings.

**Read the guides: https://VV1111.github.io/guidance/**

| Guide | What it covers |
| --- | --- |
| [MOCHA+](https://VV1111.github.io/guidance/mocha/) | Vessel centerline tracing and editing, registration, cross-section contour labeling, centerline comparison |
| [dicom2nifti](https://VV1111.github.io/guidance/dicom2nifti/) | Converting DICOM folders to NIfTI (`.nii.gz`) |
| [ITK-SNAP DLS](https://VV1111.github.io/guidance/itksnap-dls/) | AI-assisted segmentation of intracranial arteries and plaque with nnInteractive |
| [CVA Atlas](https://VV1111.github.io/guidance/cva-atlas/) | The lab's cerebrovascular dataset catalog: connect, sign in, find, shelve, add, undo |

## Found a mistake?

Open an [issue](https://github.com/VV1111/guidance/issues), or use **Edit this page on GitHub** at the bottom of any page to suggest a change.

## Running the site locally

The site is built with [VitePress](https://vitepress.dev). Node.js 18 or later is required.

```bash
npm install
npm run dev     # http://localhost:5173/guidance/
```

Pages are Markdown files under `docs/`. Every push to `main` is built and published to GitHub Pages automatically.
