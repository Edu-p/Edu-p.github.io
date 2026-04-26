<template>
  <section id="timeline" class="timeline-section" aria-labelledby="timeline-title">
    <UiText as="p" variant="eyebrow">{{ t.timeline.eyebrow }}</UiText>
    <UiText id="timeline-title" as="h2" variant="section-title" class="timeline-title">
      {{ t.timeline.title }}
    </UiText>

    <div class="timeline-controls timeline-controls--desktop" :aria-label="t.timeline.controls">
      <button class="timeline-control timeline-control--prev focus-ring" type="button" :disabled="currentPage === 0" :aria-label="t.timeline.previous" @click="previousPage">
        <UiIcon name="arrow_forward" size="sm" aria-hidden="true" />
      </button>
      <button class="timeline-control timeline-control--next focus-ring" type="button" :disabled="currentPage === totalPages - 1" :aria-label="t.timeline.next" @click="nextPage">
        <UiIcon name="arrow_forward" size="sm" aria-hidden="true" />
      </button>
    </div>

    <ol class="timeline-list">
      <li v-for="(item, index) in visibleTimeline" :key="item.company" class="timeline-item" :style="{ '--delay': `${index * 80}ms` }">
        <div class="period">{{ item.period }}</div>

        <div class="company-mark" aria-hidden="true">
          <UiMark :label="item.company" size="lg" />
        </div>

        <UiCard tag="article" class="role-card" interactive>
          <div class="role-main">
            <div>
              <h3>{{ item.role }}</h3>
              <p>
                <strong>{{ item.company }}</strong>
                <span>{{ item.location }}</span>
              </p>
            </div>
          </div>

          <p class="role-summary">{{ item.summary }}</p>

          <div class="role-tags">
            <UiTag v-for="tag in item.tags" :key="tag" variant="view">{{ tag }}</UiTag>
          </div>
        </UiCard>
      </li>
    </ol>

    <button v-if="!isDesktop && visibleCount < timeline.length" class="show-more focus-ring" type="button" @click="showMore">
      {{ t.timeline.showMore }}
    </button>
  </section>
</template>

<script setup lang="ts">
import '@/styles/timeline.css'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiMark from '@/components/ui/UiMark.vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const timeline = computed(() => t.value.timeline.items)

const pageSize = 3
const currentPage = ref(0)
const visibleCount = ref(pageSize)
const isDesktop = ref(false)
let mediaQuery: MediaQueryList | null = null

const totalPages = computed(() => Math.ceil(timeline.value.length / pageSize))

const visibleTimeline = computed(() => {
  if (isDesktop.value) {
    const start = currentPage.value * pageSize
    return timeline.value.slice(start, start + pageSize)
  }

  return timeline.value.slice(0, visibleCount.value)
})

function updateMediaMode(event?: MediaQueryListEvent) {
  isDesktop.value = event?.matches ?? Boolean(mediaQuery?.matches)
  currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
}

function nextPage() {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value - 1)
}

function previousPage() {
  currentPage.value = Math.max(currentPage.value - 1, 0)
}

function showMore() {
  visibleCount.value = Math.min(visibleCount.value + pageSize, timeline.value.length)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1201px)')
  updateMediaMode()
  mediaQuery.addEventListener('change', updateMediaMode)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateMediaMode)
})
</script>

