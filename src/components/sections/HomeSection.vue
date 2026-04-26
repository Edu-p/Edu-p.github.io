<template>
  <section id="inicio" class="hero-section" aria-labelledby="hero-title">
    <NeuralField class="field" />

    <div class="container hero-grid">
      <HeroContent />
      <HeroVisual />
    </div>
  </section>

  <LazyOnVisible>
    <AboutSection />
  </LazyOnVisible>
  <LazyOnVisible>
    <ImpactSection />
  </LazyOnVisible>
  <LazyOnVisible>
    <ContactSection />
  </LazyOnVisible>

</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import '@/styles/home.css'
import HeroContent from '@/components/visuals/home/HeroContent.vue'
import HeroVisual from '@/components/visuals/HeroVisual.vue'
import LazyOnVisible from '@/components/visuals/common/LazyOnVisible.vue'

const NeuralField = defineAsyncComponent(() => import('@/components/visuals/NeuralField.vue'))
const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const ImpactSection = defineAsyncComponent(() => import('@/components/sections/ImpactSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/components/sections/ContactSection.vue'))
</script>
