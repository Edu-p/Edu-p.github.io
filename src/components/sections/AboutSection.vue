<template>
  <section
    id="sobre"
    class="relative z-[1] border-t border-[var(--border-subtle)] bg-[radial-gradient(circle_at_12%_18%,color-mix(in_srgb,var(--color-electric)_10%,transparent),transparent_28rem),color-mix(in_srgb,var(--color-void)_88%,black)] py-24 max-[680px]:py-[72px]"
    aria-labelledby="about-title"
  >
    <div class="container grid gap-7">
      <ScrollReveal class-name="about-reveal">
        <UiCard class="p-7 max-[1200px]:p-6 max-[680px]:p-5">
          <AboutHero />
          <AboutContactList />
          <AboutStack />
        </UiCard>
      </ScrollReveal>

      <ScrollReveal class-name="about-reveal" :threshold="0.12">
        <TimelineSection class="px-7 py-24 max-[1200px]:p-6 max-[680px]:p-5" />
      </ScrollReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
import '@/styles/about.css'
import AboutContactList from '@/components/visuals/about/AboutContactList.vue'
import AboutHero from '@/components/visuals/about/AboutHero.vue'
import AboutStack from '@/components/visuals/about/AboutStack.vue'
import ScrollReveal from '@/components/visuals/common/ScrollReveal.vue'
import TimelineSection from '@/components/sections/TimelineSection.vue'
import UiCard from '@/components/ui/UiCard.vue'
</script>
