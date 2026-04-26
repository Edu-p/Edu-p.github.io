<template>
  <div class="ui-avatar" :class="`ui-avatar--${size}`">
    <div v-if="orbit" class="ui-avatar__ring" aria-hidden="true"></div>
    <div class="ui-avatar__frame">
      <img :src="src" :alt="alt" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    size?: 'lg' | 'md'
    orbit?: boolean
  }>(),
  {
    size: 'lg',
    orbit: true,
  },
)
</script>

<style scoped>
.ui-avatar {
  position: relative;
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  overflow: visible;
}

.ui-avatar--lg {
  width: 320px;
}

.ui-avatar--md {
  width: 180px;
}

.ui-avatar__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    repeating-radial-gradient(
      circle,
      color-mix(in srgb, var(--color-electric) 42%, transparent) 0 1px,
      transparent 1px 18px
    ),
    radial-gradient(
      circle,
      color-mix(in srgb, var(--color-electric) 18%, transparent),
      transparent 64%
    );
}

.ui-avatar::before,
.ui-avatar::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  content: "";
  border-radius: 50%;
  background: var(--color-electric);
  box-shadow: 0 0 18px color-mix(in srgb, var(--color-electric) 70%, transparent);
}

.ui-avatar::before {
  animation: avatar-orbit-a 9000ms linear infinite;
}

.ui-avatar::after {
  animation: avatar-orbit-b 12000ms linear infinite reverse;
}

.ui-avatar__frame {
  position: relative;
  z-index: 1;
  width: 69%;
  height: 69%;
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--color-electric) 34%, transparent);
  border-radius: 50%;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-panel) 70%, black), var(--color-void)),
    radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--color-electric) 24%, transparent), transparent 68%);
  box-shadow:
    0 16px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 color-mix(in srgb, white 6%, transparent);
}

.ui-avatar__frame img {
  position: absolute;
  left: 49%;
  bottom: 0;
  z-index: 1;
  width: 104%;
  height: auto;
  max-width: none;
  border-radius: 53%;
  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.3));
  transform: translateX(-50%);
}

@keyframes avatar-orbit-a {
  from {
    transform: rotate(0deg) translateX(42%) translate(-50%, -50%);
  }

  to {
    transform: rotate(360deg) translateX(42%) translate(-50%, -50%);
  }
}

@keyframes avatar-orbit-b {
  from {
    transform: rotate(130deg) translateX(34%) translate(-50%, -50%);
  }

  to {
    transform: rotate(490deg) translateX(34%) translate(-50%, -50%);
  }
}
</style>
