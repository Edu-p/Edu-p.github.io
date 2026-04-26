<template>
  <section id="sobre" class="about-section" aria-labelledby="about-title">
    <div class="container about-layout">
      <UiCard class="profile-panel reveal-on-scroll">
        <AboutHero />
        <AboutContactList />
        <AboutStack />
      </UiCard>

      <TimelineSection class="reveal-on-scroll timeline-panel" />
    </div>
  </section>
</template>

<script setup lang="ts">
import '@/styles/about.css'
import AboutContactList from '@/components/visuals/about/AboutContactList.vue'
import AboutHero from '@/components/visuals/about/AboutHero.vue'
import AboutStack from '@/components/visuals/about/AboutStack.vue'
import TimelineSection from '@/components/sections/TimelineSection.vue'
import UiCard from '@/components/ui/UiCard.vue'
</script>
