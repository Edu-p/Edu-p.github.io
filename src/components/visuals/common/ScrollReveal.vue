<template>
  <component
    :is="as"
    :id="id"
    ref="rootRef"
    :class="[{ 'scroll-reveal': true, visible: isVisible }, className]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: string
    className?: string
    threshold?: number
    rootMargin?: string
    id?: string
    once?: boolean
  }>(),
  {
    as: 'div',
    className: '',
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px',
    id: '',
    once: true,
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
      if (props.once) observer?.disconnect()
    },
    { threshold: props.threshold, rootMargin: props.rootMargin },
  )

  observer.observe(root)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

