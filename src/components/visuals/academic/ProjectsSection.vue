<template>
  <section
    id="projetos"
    class="relative z-[1] scroll-mt-[92px] pb-[76px] max-[640px]:pb-[62px]"
    aria-labelledby="projects-title"
  >
    <div class="container">
      <ScrollReveal class-name="academic-reveal academic-reveal--projects" :threshold="0.12">
        <UiCard
          tag="section"
          variant="panel"
          class="h-[-webkit-fill-available] p-[22px] max-[640px]:p-[18px]"
          aria-labelledby="projects-title"
        >
          <header class="mb-5 flex flex-wrap items-center gap-3.5">
            <span
              class="grid h-[30px] min-w-[30px] place-items-center rounded-md border border-[color-mix(in_srgb,var(--color-electric)_32%,transparent)] text-[0.68rem] font-black tracking-[0.08em] text-[var(--color-electric)]"
              aria-hidden="true"
              ><UiIcon name="multi_agents" size="sm"
            /></span>
            <h3
              id="projects-title"
              class="m-0 text-base font-bold uppercase text-[var(--color-ice)]"
            >
              {{ t.academic.projectsTitle }}
            </h3>

            <div
              v-if="hasMultiplePages"
              class="ml-auto flex items-center gap-2 max-[1180px]:ml-0 max-[1180px]:w-full max-[1180px]:justify-end"
              aria-label="Project carousel controls"
            >
              <button
                class="focus-ring grid size-[34px] cursor-pointer place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-electric)_34%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_72%,transparent)] p-0 text-[var(--color-electric)] transition-[border-color,background,color,opacity,transform] duration-180 disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:-translate-y-px hover:not-disabled:border-[color-mix(in_srgb,var(--color-electric)_72%,transparent)] hover:not-disabled:bg-[var(--color-electric)] hover:not-disabled:text-white [&_.ui-icon]:rotate-180"
                type="button"
                :disabled="currentPage === 0"
                aria-label="Previous projects"
                @click="previousPage"
              >
                <UiIcon name="arrow_forward" size="sm" />
              </button>
              <span
                class="min-w-[34px] text-center text-[0.72rem] font-extrabold text-[color-mix(in_srgb,var(--color-ice)_68%,transparent)]"
                >{{ currentPage + 1 }}/{{ totalPages }}</span
              >
              <button
                class="focus-ring grid size-[34px] cursor-pointer place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-electric)_34%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_72%,transparent)] p-0 text-[var(--color-electric)] transition-[border-color,background,color,opacity,transform] duration-180 disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:-translate-y-px hover:not-disabled:border-[color-mix(in_srgb,var(--color-electric)_72%,transparent)] hover:not-disabled:bg-[var(--color-electric)] hover:not-disabled:text-white"
                type="button"
                :disabled="currentPage === totalPages - 1"
                aria-label="Next projects"
                @click="nextPage"
              >
                <UiIcon name="arrow_forward" size="sm" />
              </button>
            </div>
          </header>

          <Transition :name="projectTransitionName" mode="out-in">
            <div
              :key="currentPage"
              class="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-[640px]:grid-cols-1"
            >
              <UiCard
                v-for="project in visibleProjects"
                :key="project.title"
                tag="article"
                variant="project"
                class="group relative grid min-h-[178px] grid-cols-[46px_minmax(0,1fr)_auto] items-start gap-3.5 px-[18px] py-5 max-[1180px]:min-h-0"
                :interactive="Boolean(project.href)"
                :class="{
                  'focus-ring': project.href,
                  'cursor-default': !project.href,
                }"
                :href="project.href"
                :target="project.href ? '_blank' : undefined"
                :rel="project.href ? 'noreferrer' : undefined"
              >
                <UiMark :label="project.title" size="sm" aria-hidden="true" />
                <span class="grid min-w-0 gap-2">
                  <strong class="text-base leading-[1.24] font-semibold text-[var(--color-ice)]">
                    {{ project.title }}
                  </strong>
                  <small
                    class="text-[0.74rem] leading-[1.25] font-bold text-[var(--color-electric)]"
                  >
                    {{ project.period }}
                  </small>
                  <span
                    class="text-[0.78rem] leading-[1.55] text-[color-mix(in_srgb,var(--color-ice)_72%,transparent)]"
                  >
                    {{ project.summary }}
                  </span>
                  <span class="mt-0.5 flex flex-wrap gap-1.5 [&_.ui-tag]:text-[0.66rem]">
                    <UiTag v-for="skill in project.skills" :key="skill" variant="view">{{
                      skill
                    }}</UiTag>
                  </span>
                </span>
                <span
                  v-if="project.href"
                  class="self-end text-[var(--color-electric)] transition-transform duration-180 group-hover:translate-x-[3px]"
                  aria-hidden="true"
                  ><UiIcon name="arrow_forward" size="sm"
                /></span>
                <span
                  v-if="project.href"
                  class="absolute -m-px size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0_0_0_0)]"
                  >{{ t.academic.viewProject }}</span
                >
              </UiCard>
            </div>
          </Transition>
        </UiCard>
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ScrollReveal from '@/components/visuals/common/ScrollReveal.vue'
import UiCard from '@/components/ui/UiCard.vue'
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
const pageDirection = ref<'next' | 'previous'>('next')
let mobileQuery: MediaQueryList | null = null
let tabletQuery: MediaQueryList | null = null

const totalPages = computed(() => Math.max(1, Math.ceil(projects.value.length / pageSize.value)))
const hasMultiplePages = computed(() => totalPages.value > 1)
const projectTransitionName = computed(() =>
  pageDirection.value === 'previous' ? 'project-page-back' : 'project-page',
)
const visibleProjects = computed(() => {
  const start = currentPage.value * pageSize.value
  return projects.value.slice(start, start + pageSize.value)
})

function updatePageSize(event?: MediaQueryListEvent) {
  const isMobile =
    event?.media === '(max-width: 640px)' ? event.matches : Boolean(mobileQuery?.matches)
  const isTablet =
    event?.media === '(max-width: 1180px)' ? event.matches : Boolean(tabletQuery?.matches)
  pageSize.value = isMobile ? 2 : isTablet ? 4 : 4
}

function clampPage() {
  currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
}

function nextPage() {
  pageDirection.value = 'next'
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value - 1)
}

function previousPage() {
  pageDirection.value = 'previous'
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
