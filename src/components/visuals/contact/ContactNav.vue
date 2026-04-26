<template>
  <nav class="link-column" :aria-label="t.contact.footerNavAria">
    <h2 id="contact-title">{{ t.contact.navigation }}</h2>
    <a v-for="item in navigationLinks" :key="item.label" :href="item.href" class="footer-link focus-ring">
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const navigationLinks = computed(() => t.value.contact.navigationLinks)
</script>
