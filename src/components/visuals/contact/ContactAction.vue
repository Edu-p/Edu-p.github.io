<template>
  <section class="contact-column">
    <UiButton href="https://www.linkedin.com/in/eduardo-ale-amorim" target="_blank" rel="noreferrer" variant="ghost" arrow>{{ t.contact.talk }}</UiButton>
  </section>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
