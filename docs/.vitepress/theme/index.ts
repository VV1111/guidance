import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import StepVideo from './components/StepVideo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StepVideo', StepVideo)
  },
} satisfies Theme
