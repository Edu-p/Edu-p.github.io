<template>
  <TopBar />
  <main class="wrapper">
    <SmoothScroll className="scroll-reveal" id="Home">
      <HomeSection />
    </SmoothScroll>
    <ResumeSection />
    <SmoothScroll className="scroll-reveal" id="Projects">
      <ProjectSection />
    </SmoothScroll>
    <SmoothScroll className="scroll-reveal" id="Skills">
      <SkillsComponent />
    </SmoothScroll>
    <SmoothScroll className="scroll-reveal" id="Footer">
      <FooterComponent />
    </SmoothScroll>
  </main>
</template>
<script lang="ts">
import TopBar from './Topbar/TopbarComponent.vue'
import HomeSection from './Home/HomeSection.vue'
import ResumeSection from './Resume/ResumeSection.vue'
import ProjectSection from './Project/ProjectSection.vue'
import SkillsComponent from './Skills/SkillsComponent.vue'
import SmoothScroll from './SmoothScroll/SmoothScroll.vue'
import FooterComponent from './Footer/FooterComponent.vue'


export default {
  name: 'IndexPage',
  components: {
    SmoothScroll,
    TopBar,
    HomeSection,
    ResumeSection,
    ProjectSection,
    FooterComponent,
    SkillsComponent
  }
}
</script>
<style>
main .wrapper {
  padding-top: 76px;
}

@media screen and (max-width: 920px) {
  main .wrapper {
    padding-top: 0;
  }

}
</style>