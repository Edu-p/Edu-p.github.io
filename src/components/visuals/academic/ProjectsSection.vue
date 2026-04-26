<template>
  <section id="projetos" class="projects-section" aria-labelledby="projects-title">
    <div class="container">
      <section class="academic-panel projects-panel academic-reveal academic-reveal--projects" aria-labelledby="projects-title">
        <header class="panel-title projects-header">
          <span class="panel-icon" aria-hidden="true"><UiIcon name="apps" size="sm" /></span>
          <h3 id="projects-title">{{ t.academic.projectsTitle }}</h3>

          <div v-if="hasMultiplePages" class="project-carousel-controls" aria-label="Project carousel controls">
            <button
              class="project-carousel-button project-carousel-button--prev focus-ring"
              type="button"
              :disabled="currentPage === 0"
              aria-label="Previous projects"
              @click="previousPage"
            >
              <UiIcon name="arrow_forward" size="sm" />
            </button>
            <span class="project-carousel-count">{{ currentPage + 1 }}/{{ totalPages }}</span>
            <button
              class="project-carousel-button focus-ring"
              type="button"
              :disabled="currentPage === totalPages - 1"
              aria-label="Next projects"
              @click="nextPage"
            >
              <UiIcon name="arrow_forward" size="sm" />
            </button>
          </div>
        </header>

        <div class="projects-grid">
          <component
            :is="project.href ? 'a' : 'article'"
            v-for="project in visibleProjects"
            :key="project.title"
            class="project-card"
            :class="{ 'project-card--linked focus-ring': project.href, 'project-card--static': !project.href }"
            :href="project.href"
            :target="project.href ? '_blank' : undefined"
            :rel="project.href ? 'noreferrer' : undefined"
          >
            <UiMark :label="project.title" size="sm" aria-hidden="true" />
            <span class="project-content">
              <strong>{{ project.title }}</strong>
              <small>{{ project.period }}</small>
              <span>{{ project.summary }}</span>
              <span class="project-tags">
                <UiTag v-for="skill in project.skills" :key="skill" variant="view">{{ skill }}</UiTag>
              </span>
            </span>
            <span v-if="project.href" class="project-arrow" aria-hidden="true"><UiIcon name="arrow_forward" size="sm" /></span>
            <span v-if="project.href" class="sr-only">{{ t.academic.viewProject }}</span>
          </component>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiMark from '@/components/ui/UiMark.vue'
import UiTag from '@/components/ui/UiTag.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const projects = computed(() =>
  t.value.academic.projects.map((project) => ({
    ...project,
    href: 'href' in project ? project.href : undefined,
  })),
)

const currentPage = ref(0)
const pageSize = ref(4)
let mobileQuery: MediaQueryList | null = null
let tabletQuery: MediaQueryList | null = null

const totalPages = computed(() => Math.max(1, Math.ceil(projects.value.length / pageSize.value)))
const hasMultiplePages = computed(() => totalPages.value > 1)
const visibleProjects = computed(() => {
  const start = currentPage.value * pageSize.value
  return projects.value.slice(start, start + pageSize.value)
})

function updatePageSize(event?: MediaQueryListEvent) {
  const isMobile = event?.media === '(max-width: 640px)' ? event.matches : Boolean(mobileQuery?.matches)
  const isTablet = event?.media === '(max-width: 1180px)' ? event.matches : Boolean(tabletQuery?.matches)
  pageSize.value = isMobile ? 2 : isTablet ? 4 : 4
}

function clampPage() {
  currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
}

function nextPage() {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value - 1)
}

function previousPage() {
  currentPage.value = Math.max(currentPage.value - 1, 0)
}

watch([pageSize, projects], clampPage)

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 640px)')
  tabletQuery = window.matchMedia('(max-width: 1180px)')
  updatePageSize()
  mobileQuery.addEventListener('change', updatePageSize)
  tabletQuery.addEventListener('change', updatePageSize)
})

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', updatePageSize)
  tabletQuery?.removeEventListener('change', updatePageSize)
})
</script>
