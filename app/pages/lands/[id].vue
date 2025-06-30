<script setup lang='ts'>
import { useLandingPageApi } from '~/apis/useLandingPageApi'

const route = useRoute('lands-id')

definePageMeta({
  layout: 'none',
})
const {
  data: landingPageResponse,
} = await useLandingPageApi.getInfoById({
  query: {
    landingPageId: route.params.id,
  },
  ssr: true,
})
</script>

<template>
  <div>
    <div
      class="tiptap"
      v-html="landingPageResponse?.landingPage?.html"
    />
  </div>
</template>
