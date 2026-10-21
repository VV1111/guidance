import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'

// ── Site settings: change these two lines if you rename the repo ─────────────
const GITHUB_USER = 'VV1111'
const REPO = 'guidance'
// Where step videos live. Default: a GitHub Release named "videos" in this repo.
// Upload .mp4 files to that release; reference them by file name in <StepVideo src="...">.
const VIDEO_BASE = `https://github.com/${GITHUB_USER}/${REPO}/releases/download/videos/`
// ────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  title: 'Tools & Guides',
  description: 'Step-by-step guides for in-house research tools: written steps, screenshots and screen recordings.',
  base: `/${REPO}/`,
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `/${REPO}/favicon.svg` }]],

  markdown: {
    config(md) {
      // ::: steps  ...numbered list...  :::  → clearly separated, numbered steps
      md.use(container, 'steps', {
        render(tokens: any[], idx: number) {
          return tokens[idx].nesting === 1 ? '<div class="steps">\n' : '</div>\n'
        },
      })
    },
  },

  themeConfig: {
    videoBase: VIDEO_BASE,
    siteTitle: 'Tools & Guides',

    nav: [
      { text: 'MOCHA+', link: '/mocha/' },
      { text: 'dicom2nifti', link: '/dicom2nifti/' },
      { text: 'ITK-SNAP DLS', link: '/itksnap-dls/' },
    ],

    sidebar: {
      '/mocha/': [
        {
          text: 'MOCHA+',
          items: [
            { text: 'Overview', link: '/mocha/' },
            { text: 'Loading data', link: '/mocha/loading' },
            { text: 'Preprocess: DICOM → NIfTI & registration', link: '/mocha/preprocess' },
            { text: '3D tracing', link: '/mocha/3d-tracing' },
            { text: '2D MPR editing', link: '/mocha/2d-editing' },
            { text: 'Contour labeling', link: '/mocha/contour-labeling' },
            { text: 'Compare centerlines', link: '/mocha/compare' },
          ],
        },
      ],
      '/dicom2nifti/': [
        { text: 'dicom2nifti', items: [{ text: 'User guide', link: '/dicom2nifti/' }] },
      ],
      '/itksnap-dls/': [
        { text: 'ITK-SNAP DLS', items: [{ text: 'User guide', link: '/itksnap-dls/' }] },
      ],
    },

    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
    editLink: {
      pattern: `https://github.com/${GITHUB_USER}/${REPO}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    lastUpdated: { text: 'Last updated' },
    socialLinks: [{ icon: 'github', link: `https://github.com/${GITHUB_USER}/${REPO}` }],
    docFooter: { prev: 'Previous', next: 'Next' },
  },
})
