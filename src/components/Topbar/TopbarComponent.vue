<template>
  <div class="topbar" :class="{ 'topbar-desktop': menuDesktop, 'topbar-mobile': !menuDesktop }">
    <DesktopMenu v-if="menuDesktop" :topics="topics" :activeIndex="activeIndex" :setActiveIndex="setActiveIndex" />
    <MobileMenu v-else :topics="topics" :activeIndex="activeIndex" :setActiveIndex="setActiveIndex" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DesktopMenu from "./Components/DesktopMenu.vue";
import MobileMenu from "./Components/MobileMenu.vue";

export default defineComponent({
  name: "TopbarComponent",
  components: {
    DesktopMenu,
    MobileMenu
  },
  data() {
    return {
      activeIndex: 0,
      menuDesktop: true,
      topics: [
        { name: "Inicio", index: 0, href: "#Home" },
        { name: "Curriculo", index: 1, href: "#Resume" },
        { name: "Projetos", index: 2, href: "#Projects" },
        { name: "Skills", index: 3, href: "#Skills" },
      ],
    };
  },
  methods: {
    setActiveIndex(idx: number) {
      this.activeIndex = idx;
    },
    handleResize() {
      const width = window.innerWidth;
      this.menuDesktop = width >= 920;
    },
    onScroll() {
      if (window.scrollY === 0) {
        this.activeIndex = 0;
        return;
      }
      const sectionIds = this.topics.map((t) => t.href.replace("#", ""));
      let maxPercent = 0;
      let active = 0;
      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight || document.documentElement.clientHeight;
          const visible = Math.max(
            0,
            Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
          );
          const percent = visible / Math.min(rect.height, vh);
          if (percent > maxPercent) {
            maxPercent = percent;
            active = idx;
          }
        }
      });
      this.activeIndex = active;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (!window.location.hash || window.location.hash === "#") {
      window.location.hash = "#Home";
      window.scrollTo(0, 0);
    }
    window.addEventListener("scroll", this.onScroll);
    this.onScroll();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.onScroll);
  },
});
</script>

<style>
.topbar {
  justify-self: anchor-center;
  width: 80%;
}

.topbar-desktop {
  position: fixed;
  justify-self: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 25px;
}

.topbar-mobile {
  position: sticky;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  padding: 10px;
  backdrop-filter: saturate(180%) blur(20px);
  justify-items: right;
}
</style>