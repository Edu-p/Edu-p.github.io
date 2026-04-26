<template>
  <div class="mt-7">
    <UiText as="p" variant="eyebrow">{{ t.about.stackEyebrow }}</UiText>
    <div class="flex gap-3 max-[1200px]:flex-col">
      <UiCard
        v-for="group in techGroups"
        :key="group.title"
        variant="flat"
        class="mt-3 bg-[color-mix(in_srgb,var(--color-void)_58%,transparent)] p-3.5"
      >
        <span
          class="mb-2.5 block text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-electric)]"
        >
          {{ group.title }}
        </span>
        <div class="flex flex-wrap gap-2">
          <UiTag v-for="tech in group.items" :key="tech" variant="tech">{{ tech }}</UiTag>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiTag from '@/components/ui/UiTag.vue'
import UiText from '@/components/ui/UiText.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const techGroups = computed(() => t.value.about.techGroups)
</script>
