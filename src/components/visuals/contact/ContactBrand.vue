<template>
  <section class="relative z-[1]">
    <img :src="logoUrl" alt="Eduardo A. A." class="w-[110px] object-contain invert-light" />
    <p
      class="mt-2.5 mb-0 text-[0.84rem] text-[color-mix(in_srgb,var(--color-ice)_82%,transparent)]"
    >
      {{ t.contact.role }}
    </p>
    <p class="mt-3 mb-0 max-w-[220px] text-[0.82rem] leading-[1.55] text-[var(--color-muted)]">
      {{ t.contact.copy }}
    </p>

    <div class="mt-[18px] flex flex-wrap gap-2.5" :aria-label="t.contact.socialAria">
      <a
        v-for="link in socialLinks"
        :key="link.label"
        class="focus-ring grid size-[34px] place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-ice)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] text-[0.68rem] font-extrabold text-[color-mix(in_srgb,var(--color-ice)_82%,transparent)]"
        :href="link.href"
        :aria-label="link.label"
      >
        {{ link.short }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import logoUrl from '@/assets/logo.png'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const socialLinks = computed(() => t.value.contact.socialLinks)
</script>
