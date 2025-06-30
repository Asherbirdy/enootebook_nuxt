import { useWindowSize as useWindowSizeCore } from '@vueuse/core'
import { computed } from 'vue'

export const useWindowSize = () => {
  const { width } = useWindowSizeCore()
  const mdWidth = 768
  const lgWidth = 1024
  const isMdSize = computed(() => width.value < mdWidth)
  const isLgSize = computed(() => width.value < lgWidth)
  return { isMdSize, isLgSize }
}
