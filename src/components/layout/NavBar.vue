<template>
  <header class="fixed inset-x-0 top-0 z-20 backdrop-blur-[18px]">
    <nav
      class="container grid min-h-[76px] grid-cols-[auto_1fr_auto] items-center gap-6 max-[920px]:grid-cols-[auto_auto] max-[920px]:justify-between"
      :aria-label="t.nav.aria"
    >
      <a class="focus-ring inline-flex items-center" href="#inicio" :aria-label="t.nav.brandAria">
        <img
          :src="logoUrl"
          class="invert-light h-auto w-[116px] object-contain"
          alt="Eduardo A. A."
          width="116"
          height="36"
        />
      </a>

      <div class="hidden items-center gap-2.5 max-[920px]:flex">
        <button
          class="theme-button focus-ring inline-grid h-9 min-w-12 cursor-pointer place-items-center rounded-full px-0 text-[0.72rem] font-extrabold transition-colors"
          type="button"
          :aria-label="`${t.nav.theme}: ${themeToggleLabel}`"
          @click="toggleTheme"
        >
          <UiIcon :name="themeIcon" size="sm" />
        </button>

        <button
          class="language-button focus-ring inline-grid h-9 min-w-[42px] cursor-pointer place-items-center rounded-full text-[0.72rem] font-extrabold transition-colors"
          type="button"
          :aria-label="t.nav.language"
          @click="toggleLocale"
        >
          {{ locale.toUpperCase() }}
        </button>

        <button
          class="menu-button focus-ring relative z-[22] hidden h-11 w-11 cursor-pointer items-center justify-items-end border-0 bg-transparent max-[920px]:inline-grid"
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

      <div
        id="main-menu"
        class="nav-panel justify-self-center rounded-full max-[920px]:fixed max-[920px]:left-4 max-[920px]:right-4 max-[920px]:top-[76px] max-[920px]:grid max-[920px]:translate-y-[-12px] max-[920px]:scale-[0.98] max-[920px]:justify-stretch max-[920px]:gap-1 max-[920px]:rounded-lg max-[920px]:p-3 max-[920px]:opacity-0 max-[920px]:transition-[opacity,transform]"
        :class="{ open: isMenuOpen }"
      >
        <a
          v-for="item in menuItems"
          :key="item.href"
          class="nav-link focus-ring relative inline-flex min-h-9 items-center rounded-full px-3.5 text-[0.84rem] font-semibold transition-[color,background,transform] duration-200 max-[920px]:justify-center max-[920px]:rounded-md"
          :class="{ active: activeHref === item.href }"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          :href="item.href"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex items-center gap-2.5 max-[920px]:hidden">
        <button
          class="theme-button focus-ring inline-grid h-9 min-w-12 cursor-pointer place-items-center rounded-full px-0 text-[0.72rem] font-extrabold transition-colors"
          type="button"
          :aria-label="`${t.nav.theme}: ${themeToggleLabel}`"
          @click="toggleTheme"
        >
          <UiIcon :name="themeIcon" size="sm" />
        </button>

        <button
          class="language-button focus-ring inline-grid h-9 min-w-[42px] cursor-pointer place-items-center rounded-full text-[0.72rem] font-extrabold transition-colors"
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
.nav-panel {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border: 1px solid color-mix(in srgb, var(--color-ice) 8%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-ink) 99%, transparent);
}

.nav-link {
  color: var(--color-muted);
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

.theme-button,
.language-button {
  border: 1px solid color-mix(in srgb, var(--color-electric) 36%, transparent);
  color: var(--color-electric);
  font-family: var(--font-display);
  background: color-mix(in srgb, var(--color-ink) 72%, transparent);
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
  .talk-button {
    display: none;
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
    pointer-events: none;
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
}
</style>
