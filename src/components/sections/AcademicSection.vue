<template>
  <section
    id="impacto"
    class="relative z-[1] overflow-hidden border-t border-[var(--border-subtle)] bg-[radial-gradient(circle_at_78%_12%,color-mix(in_srgb,var(--color-electric)_12%,transparent),transparent_30rem),color-mix(in_srgb,var(--color-void)_88%,black)] pt-[94px] pb-[18px] max-[640px]:pt-[76px]"
    aria-labelledby="academic-title"
  >
    <div class="container grid gap-[18px]">
      <ScrollReveal class-name="academic-reveal academic-reveal--hero" :threshold="0.12">
        <AcademicHero />
      </ScrollReveal>

      <ScrollReveal class-name="academic-reveal academic-reveal--grid" :threshold="0.08">
        <div class="flex flex-col items-start gap-4">
          <ScrollReveal class-name="academic-reveal academic-reveal--panel-a" :threshold="0.1">
            <PublicationsPanel />
          </ScrollReveal>

          <aside class="grid w-[-webkit-fill-available] grid-cols-2 gap-4 max-[1180px]:grid-cols-1">
            <ScrollReveal class-name="academic-reveal academic-reveal--panel-b" :threshold="0.12">
              <EducationPanel />
            </ScrollReveal>
            <ScrollReveal class-name="academic-reveal academic-reveal--panel-c" :threshold="0.14">
              <HighlightsPanel />
            </ScrollReveal>
          </aside>
        </div>
      </ScrollReveal>
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
import ScrollReveal from '@/components/visuals/common/ScrollReveal.vue'
</script>
