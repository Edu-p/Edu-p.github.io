<template>
  <section class="academic-panel publications-panel" aria-labelledby="publications-title">
    <header class="panel-title">
      <span class="panel-icon" aria-hidden="true"><UiIcon name="description" size="sm" /></span>
      <h3 id="publications-title">{{ t.academic.publications }}</h3>
    </header>

    <article v-for="paper in papers" :key="paper.title" class="publication-card">
      <div class="conference-card">
        <strong>{{ paper.venue }}</strong>
        <UiTag variant="view" class="color-blue">{{ paper.topic }}</UiTag>
      </div>

      <div class="publication-main">
        <h4>{{ paper.title }}</h4>
        <p>{{ paper.summary }}</p>
      </div>

      <div class="publication-actions">
        <p>{{ paper.authors }}</p>
        <a
          v-if="paper.paperHref"
          class="resource-link focus-ring"
          :href="paper.paperHref"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true"><UiIcon name="article" size="sm" /></span>
          <span>{{ t.academic.readPaper }}</span>
          <span aria-hidden="true"></span>
        </a>
        <span
          v-else
          class="resource-link resource-link--disabled"
          role="link"
          aria-disabled="true"
          tabindex="0"
          :title="t.academic.paperUnavailable"
          :aria-label="`${t.academic.readPaper}: ${t.academic.paperUnavailable}`"
        >
          <span aria-hidden="true"><UiIcon name="article" size="sm" /></span>
          <span>{{ t.academic.readPaper }}</span>
          <span class="resource-tooltip" role="tooltip">{{ t.academic.paperUnavailable }}</span>
        </span>
        <a
          v-if="paper.codeHref"
          class="resource-link focus-ring"
          :href="paper.codeHref"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true"><UiIcon name="code" size="sm" /></span>
          <span>{{ t.academic.viewCode }}</span>
          <span aria-hidden="true"></span>
        </a>
        <span
          v-else
          class="resource-link resource-link--disabled"
          role="link"
          aria-disabled="true"
          tabindex="0"
          :title="t.academic.codeUnavailable"
          :aria-label="`${t.academic.viewCode}: ${t.academic.codeUnavailable}`"
        >
          <span aria-hidden="true"><UiIcon name="code" size="sm" /></span>
          <span>{{ t.academic.viewCode }}</span>
          <span class="resource-tooltip" role="tooltip">{{ t.academic.codeUnavailable }}</span>
        </span>
      </div>
    </article>

    <a class="all-publications focus-ring" href="#contato">
      <span>{{ t.academic.allPublications }}</span>
      <span aria-hidden="true"></span>
    </a>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiTag from '@/components/ui/UiTag.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const papers = computed(() =>
  t.value.academic.papers.map((paper) => ({
    ...paper,
    codeHref: 'codeHref' in paper ? paper.codeHref : undefined,
    paperHref: 'paperHref' in paper ? paper.paperHref : undefined,
  })),
)
</script>
