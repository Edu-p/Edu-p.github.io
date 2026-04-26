<template>
  <div class="site-shell">
    <NavBar />
    <main class="content-layer">
      <HomeSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import HomeSection from '@/components/sections/HomeSection.vue'
</script>
