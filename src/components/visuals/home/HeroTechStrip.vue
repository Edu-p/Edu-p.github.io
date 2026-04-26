<template>
  <div
    class="group reveal reveal-5 grid min-h-[74px] grid-cols-[auto_minmax(0,1fr)] items-center gap-5 rounded-[10px] border border-[color-mix(in_srgb,var(--color-ice)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_86%,transparent)] px-[18px] max-[720px]:grid-cols-1 max-[720px]:items-start max-[720px]:gap-2.5 max-[720px]:p-3.5"
    :aria-label="t.hero.specialties"
  >
    <strong class="text-[0.8rem] uppercase tracking-[0.08em] text-[var(--color-electric)]">
      {{ t.hero.specialties }}
    </strong>
    <div
      class="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_4%,black_96%,transparent_100%)]"
    >
      <ul
        class="flex w-max list-none gap-[34px] p-0 m-0 animate-[tech-scroll_32s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        <li v-for="(tech, index) in doubledTechItems" :key="`${tech.label}-${index}`" class="align-content-center">
          <span
            class="inline-flex items-center gap-2.5 whitespace-nowrap py-0.5 text-[0.94rem] text-[color-mix(in_srgb,var(--color-ice)_86%,transparent)]"
          >
            <img
              v-if="tech.icon"
              :src="tech.icon"
              :alt="`${tech.label} icon`"
              class="w-10 object-contain"
            />
            <span
              v-else
              class="size-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-electric)_76%,transparent)]"
              aria-hidden="true"
            ></span>
            <span>{{ tech.label }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dockerIcon from '@/assets/tech/docker.png'
import fastApiIcon from '@/assets/tech/fastAPI.png'
import gcpIcon from '@/assets/tech/gpc.png'
import kubernetesIcon from '@/assets/tech/kurbenetes.png'
import langchainIcon from '@/assets/tech/langChein.png'
import pythonIcon from '@/assets/tech/phyton.png'
import postgresqlIcon from '@/assets/tech/postgreSQL.png'
import pytorchIcon from '@/assets/tech/pyTorch.png'
import redisIcon from '@/assets/tech/redis.png'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const techStack = computed(() => t.value.hero.techStack)

const techIconMap: Record<string, string> = {
  Python: pythonIcon,
  GCP: gcpIcon,
  Docker: dockerIcon,
  Kubernetes: kubernetesIcon,
  FastAPI: fastApiIcon,
  LangChain: langchainIcon,
  PyTorch: pytorchIcon,
  PostgreSQL: postgresqlIcon,
  Redis: redisIcon,
}

const techItems = computed(() =>
  techStack.value.map((label) => ({
    label,
    icon: techIconMap[label],
  })),
)

const doubledTechItems = computed(() => [...techItems.value, ...techItems.value])
</script>
