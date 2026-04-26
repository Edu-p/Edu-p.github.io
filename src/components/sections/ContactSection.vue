<template>
  <footer
    id="contato"
    class="relative z-[1] border-t border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-void)_94%,black)] py-[34px] pb-7"
    aria-labelledby="contact-title"
  >
    <div
      class="container relative overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,var(--color-ice)_8%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-panel)_34%,transparent),color-mix(in_srgb,black_38%,transparent)),color-mix(in_srgb,var(--color-void)_92%,transparent)] px-5 pt-[22px] pb-3.5 max-[720px]:px-4 max-[720px]:pt-5"
    >
      <div
        class="relative grid grid-cols-[minmax(260px,1fr)_minmax(180px,0.56fr)_minmax(220px,0.64fr)] items-start gap-12 max-[1120px]:grid-cols-2 max-[720px]:grid-cols-1 max-[720px]:gap-6"
      >
        <ContactBrand />
        <ContactNav />
        <ContactAction />
        <ContactNetwork />
      </div>

      <p
        class="relative z-[1] mt-[22px] mb-0 text-center text-[0.82rem] text-[color-mix(in_srgb,var(--color-ice)_46%,transparent)]"
      >
        {{ t.contact.copyright }}
      </p>
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
