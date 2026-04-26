<template>
  <div ref="rootRef" class="lazy-on-visible">
    <slot v-if="isVisible" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    rootMargin?: string
  }>(),
  {
    rootMargin: '420px 0px',
  },
)

const rootRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isVisible.value = true
      observer?.disconnect()
    },
    { rootMargin: props.rootMargin },
  )

  observer.observe(root)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
