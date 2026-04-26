<template>
  <footer id="contato" class="contact-section" aria-labelledby="contact-title">
    <div class="container contact-shell">
      <div class="contact-grid">
        <ContactBrand />
        <ContactNav />
        <ContactAction />
        <ContactNetwork />
      </div>

      <p class="copyright">{{ t.contact.copyright }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import '@/styles/contact.css'
import ContactAction from '@/components/visuals/contact/ContactAction.vue'
import ContactBrand from '@/components/visuals/contact/ContactBrand.vue'
import ContactNav from '@/components/visuals/contact/ContactNav.vue'
import ContactNetwork from '@/components/visuals/contact/ContactNetwork.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
