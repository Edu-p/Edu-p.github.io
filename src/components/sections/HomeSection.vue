<template>
  <section
    id="inicio"
    class="relative min-h-[100svh] overflow-hidden pb-[42px] pt-[148px] max-[720px]:pt-[120px]"
    aria-labelledby="hero-title"
  >
    <div
      class="container relative z-[1] grid items-end gap-[clamp(32px,5vw,64px)] [grid-template-columns:minmax(0,0.98fr)_minmax(420px,1.02fr)] max-[1180px]:items-center max-[1180px]:grid-cols-1"
    >
      <HeroContent />
      <HeroVisual />
    </div>

    <div class="container relative z-[1]">
      <HeroTechStrip />
    </div>
  </section>

  <LazyOnVisible>
    <AboutSection />
  </LazyOnVisible>
  <LazyOnVisible>
    <AcademicSection />
  </LazyOnVisible>
  <LazyOnVisible>
    <ContactSection />
  </LazyOnVisible>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import '@/styles/home.css'
import HeroContent from '@/components/visuals/home/HeroContent.vue'
import HeroTechStrip from '@/components/visuals/home/HeroTechStrip.vue'
import HeroVisual from '@/components/visuals/HeroVisual.vue'
import LazyOnVisible from '@/components/visuals/common/LazyOnVisible.vue'

const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const AcademicSection = defineAsyncComponent(
  () => import('@/components/sections/AcademicSection.vue'),
)
const ContactSection = defineAsyncComponent(
  () => import('@/components/sections/ContactSection.vue'),
)
</script>
