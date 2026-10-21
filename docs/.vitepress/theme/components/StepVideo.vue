<script setup lang="ts">
/**
 * <StepVideo src="mocha-3d-create.mp4" title="Create a centerline in 3D" />
 *
 * src can be:
 *   - a file name            → prefixed with themeConfig.videoBase (GitHub Release "videos")
 *   - an absolute site path  → "/videos/x.mp4" (file under docs/public/videos/)
 *   - a full URL             → used as-is (mp4 on any host, or a YouTube link)
 * Renders nothing while src is empty, so placeholders can stay in the Markdown.
 *
 * <StepVideo src="/videos/itksnap-dls/draw-roi.mp4" title="..." loop />
 *   loop → plays like a GIF: autoplay, muted, looping (controls stay available).
 */
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const props = defineProps<{
  src?: string
  title?: string
  poster?: string
  note?: string
  loop?: boolean
}>()

const { theme } = useData()
const videoBase = computed(() => ((theme.value as any).videoBase as string) ?? '')

function resolve(p?: string): string {
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  if (p.startsWith('/')) return withBase(p)
  return videoBase.value.replace(/\/?$/, '/') + p
}

const url = computed(() => resolve(props.src))
const posterUrl = computed(() => resolve(props.poster))

const youtubeId = computed(() => {
  const m = url.value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  )
  return m ? m[1] : ''
})
</script>

<template>
  <figure v-if="url" class="step-video">
    <div v-if="youtubeId" class="step-video__frame">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${youtubeId}`"
        :title="title || 'Video'"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <video
      v-else
      :src="url"
      :poster="posterUrl || undefined"
      controls
      :preload="loop ? 'auto' : 'metadata'"
      :autoplay="loop"
      :loop="loop"
      :muted="loop"
      playsinline
    ></video>
    <figcaption v-if="title || note">
      <span v-if="title" class="step-video__title">{{ title }}</span>
      <span v-if="note" class="step-video__note">{{ note }}</span>
    </figcaption>
  </figure>
</template>
