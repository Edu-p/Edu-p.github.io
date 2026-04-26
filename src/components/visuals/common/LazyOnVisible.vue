<template>
  <div ref="rootRef" class="lazy-on-visible" :class="{ 'lazy-on-visible--pending': !isVisible }">
    <slot v-if="isVisible" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

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

onMounted(async () => {
  const root = rootRef.value
  if (!root) return

  if (typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    return
  }

  await nextTick()

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

<style scoped>
.lazy-on-visible--pending {
  min-height: 1px;
}
</style>
