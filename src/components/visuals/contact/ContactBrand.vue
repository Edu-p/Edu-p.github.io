<template>
  <section class="brand-column">
    <img :src="logoUrl" alt="Eduardo A. A." class="brand-logo" />
    <p class="brand-role">{{ t.contact.role }}</p>
    <p class="brand-copy">{{ t.contact.copy }}</p>

    <div class="social-row" :aria-label="t.contact.socialAria">
      <a
        v-for="link in socialLinks"
        :key="link.label"
        class="social-link focus-ring"
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
