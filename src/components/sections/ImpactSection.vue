<template>
  <section id="impacto" class="academic-section" aria-labelledby="academic-title">
    <div class="container academic-layout">
      <AcademicHero class="academic-reveal academic-reveal--hero" />

      <div class="academic-grid academic-reveal academic-reveal--grid">
        <PublicationsPanel class="academic-reveal academic-reveal--panel-a" />

        <aside class="academic-side">
          <EducationPanel class="academic-reveal academic-reveal--panel-b" />
          <HighlightsPanel class="academic-reveal academic-reveal--panel-c" />
        </aside>
      </div>
    </div>
  </section>

  <ProjectsSection />
</template>

<script setup lang="ts">
import '@/styles/academic.css'
import AcademicHero from '@/components/visuals/academic/AcademicHero.vue'
import EducationPanel from '@/components/visuals/academic/EducationPanel.vue'
import HighlightsPanel from '@/components/visuals/academic/HighlightsPanel.vue'
import ProjectsSection from '@/components/visuals/academic/ProjectsSection.vue'
import PublicationsPanel from '@/components/visuals/academic/PublicationsPanel.vue'
</script>
