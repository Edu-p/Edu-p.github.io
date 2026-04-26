<template>
  <div class="stack-panel">
    <UiText as="p" variant="eyebrow">{{ t.about.stackEyebrow }}</UiText>
    <div class="stack-group">
      <div v-for="group in techGroups" :key="group.title" class="stack">
        <span class="stack-title">{{ group.title }}</span>
        <div class="stack-tags">
          <UiTag v-for="tech in group.items" :key="tech" variant="tech">{{ tech }}</UiTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const techGroups = computed(() => t.value.about.techGroups)
</script>
