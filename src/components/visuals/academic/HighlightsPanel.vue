<template>
  <section class="academic-panel highlights-panel" aria-labelledby="highlights-title">
    <header class="panel-title">
      <span class="panel-icon" aria-hidden="true"><UiIcon name="workspace_premium" size="sm" /></span>
      <h3 id="highlights-title">{{ t.academic.highlightsTitle }}</h3>
    </header>

    <div class="highlights-grid">
      <article v-for="highlight in highlights" :key="highlight.label" class="highlight-card">
        <span class="highlight-icon" aria-hidden="true">{{ highlight.icon }}</span>
        <strong>{{ highlight.value }}</strong>
        <small>{{ highlight.label }}</small>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const highlights = computed(() => t.value.academic.highlights)
</script>
