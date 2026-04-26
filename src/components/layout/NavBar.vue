<template>
  <header class="nav-wrap">
    <nav class="container nav" :aria-label="t.nav.aria">
      <a class="brand focus-ring" href="#inicio" :aria-label="t.nav.brandAria">
        <img :src="logoUrl" class="invert-light" alt="Eduardo A. A." width="116" height="36" />
      </a>

      <div class="mobile-actions">
        <button
          class="theme-button focus-ring"
          type="button"
          :aria-label="`${t.nav.theme}: ${themeToggleLabel}`"
          @click="toggleTheme"
        >
          <UiIcon :name="themeIcon" size="sm" />
        </button>

        <button
          class="language-button focus-ring language-button--mobile"
          type="button"
          :aria-label="t.nav.language"
          @click="toggleLocale"
        >
          {{ locale.toUpperCase() }}
        </button>

        <button
          class="menu-button focus-ring"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="main-menu"
          :aria-label="t.nav.menuAria"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span :class="{ active: isMenuOpen }"></span>
          <span :class="{ active: isMenuOpen }"></span>
          <span :class="{ active: isMenuOpen }"></span>
        </button>
      </div>

      <div id="main-menu" class="nav-panel" :class="{ open: isMenuOpen }">
        <a
          v-for="item in menuItems"
          :key="item.href"
          class="nav-link focus-ring"
          :class="{ active: activeHref === item.href }"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          :href="item.href"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="nav-actions">
        <button
          class="theme-button focus-ring"
          type="button"
          :aria-label="`${t.nav.theme}: ${themeToggleLabel}`"
          @click="toggleTheme"
        >
          <UiIcon :name="themeIcon" size="sm" />
        </button>

        <button
          class="language-button focus-ring language-button--desktop"
          type="button"
          :aria-label="t.nav.language"
          @click="toggleLocale"
        >
          {{ locale.toUpperCase() }}
        </button>

        <UiButton
          class="talk-button"
          href="https://www.linkedin.com/in/eduardo-ale-amorim"
          target="_blank"
          rel="noreferrer"
          variant="ghost"
          arrow
        >
          {{ t.nav.talk }}
        </UiButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import logoUrl from '@/assets/logo.png'
import UiButton from '@/components/ui/UiButton.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

type ThemeMode = 'dark' | 'light'

const THEME_STORAGE_KEY = 'eduardo-portfolio-theme'
const isMenuOpen = ref(false)
const activeHref = ref('#inicio')
const { locale, t, toggleLocale } = useI18n()
const savedTheme =
  typeof window !== 'undefined' ? window.localStorage.getItem(THEME_STORAGE_KEY) : null
const theme = ref<ThemeMode>(savedTheme === 'light' ? 'light' : 'dark')

const menuItems = computed(() => [
  { label: t.value.nav.items.home, href: '#inicio' },
  { label: t.value.nav.items.about, href: '#sobre' },
  { label: t.value.nav.items.journey, href: '#timeline' },
  { label: t.value.nav.items.academic, href: '#impacto' },
  { label: t.value.nav.items.projects, href: '#projetos' },
  { label: t.value.nav.items.contact, href: '#contato' },
])

const themeToggleLabel = computed(() =>
  theme.value === 'dark' ? t.value.nav.light : t.value.nav.dark,
)
const themeIcon = computed(() => (theme.value === 'dark' ? 'light_mode' : 'dark_mode'))

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

function applyTheme(nextTheme: ThemeMode) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  document.documentElement.dataset.theme = nextTheme
  window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
}

function updateActiveLink() {
  let nextActive = '#inicio'
  const offsetTop = 140

  for (const item of menuItems.value) {
    const section = document.querySelector<HTMLElement>(item.href)
    if (!section) continue
    if (section.getBoundingClientRect().top <= offsetTop) {
      nextActive = item.href
    }
  }

  activeHref.value = nextActive
}

watch(theme, applyTheme, { immediate: true })

onMounted(() => {
  updateActiveLink()
  window.addEventListener('scroll', updateActiveLink, { passive: true })
  window.addEventListener('resize', updateActiveLink)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveLink)
  window.removeEventListener('resize', updateActiveLink)
})
</script>

<style scoped>
.nav-wrap {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  backdrop-filter: blur(18px);
}

.nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  min-height: 76px;
}

.brand {
  display: inline-flex;
  align-items: center;
}

.brand img {
  width: 116px;
  height: auto;
  object-fit: contain;
}

.nav-panel {
  justify-self: center;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border: 1px solid color-mix(in srgb, var(--color-ice) 8%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-ink) 99%, transparent);
}

.nav-link {
  position: relative;
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  color: var(--color-muted);
  font-size: 0.84rem;
  font-weight: 600;
  transition:
    color 180ms ease,
    background 180ms ease,
    transform 180ms ease;
}

.nav-link:hover {
  color: var(--color-ice);
  background: color-mix(in srgb, var(--color-electric) 15%, transparent);
  transform: translateY(-1px);
}

.nav-link.active {
  color: var(--color-ice);
  background: color-mix(in srgb, var(--color-electric) 26%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-electric) 42%, transparent);
}

.menu-button {
  display: none;
}

.mobile-actions {
  display: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-button,
.language-button {
  display: inline-grid;
  min-width: 42px;
  height: 36px;
  cursor: pointer;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-electric) 36%, transparent);
  border-radius: 999px;
  color: var(--color-electric);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  background: color-mix(in srgb, var(--color-ink) 72%, transparent);
  transition:
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease;
}

.theme-button {
  width: 48px;
  min-width: 48px;
  padding: 0;
}

.theme-button :deep(.ui-icon) {
  font-size: 20px;
}

.theme-button:hover,
.language-button:hover {
  border-color: color-mix(in srgb, var(--color-electric) 72%, transparent);
  color: var(--color-ice);
  background: color-mix(in srgb, var(--color-electric) 16%, var(--color-ink));
}

@media (max-width: 920px) {
  .nav {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .nav-actions {
    display: none;
  }

  .talk-button {
    display: none;
  }

  .mobile-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-button {
    position: relative;
    z-index: 22;
    display: inline-grid;
    width: 44px;
    height: 44px;
    cursor: pointer;
    align-items: center;
    justify-items: end;
    background: transparent;
    border: none;
  }

  .menu-button span {
    position: absolute;
    height: 2px;
    width: 18px;
    border-radius: 999px;
    background: var(--color-ice);
    transition: transform 220ms var(--ease-snap);
    right: 25%;
  }

  .menu-button span:first-child {
    width: 10px;
    transform: translateY(-4px);
  }

  .menu-button span:nth-child(2).active {
    display: none;
  }

  .menu-button span:last-child {
    width: 10px;
    transform: translateY(4px);
  }

  .menu-button span:first-child.active {
    transform: rotate(45deg);
  }

  .menu-button span:last-child.active {
    transform: rotate(-45deg);
  }

  .nav-panel {
    position: fixed;
    top: 76px;
    right: 16px;
    left: 16px;
    display: grid;
    justify-items: stretch;
    gap: 4px;
    padding: 12px;
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-12px) scale(0.98);
    transition:
      opacity 180ms ease,
      transform 220ms var(--ease-snap);
  }

  .nav-panel.open {
    opacity: 1;
    pointer-events: auto;
    width: stretch;
    transform: translateY(0) scale(1);
  }

  .nav-link {
    justify-content: center;
    border-radius: 6px;
  }
}
</style>
