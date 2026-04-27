<template>
  <UiCard
    tag="section"
    variant="panel"
    class="h-full w-full p-[22px] max-[640px]:h-auto max-[640px]:p-[18px]"
    aria-labelledby="education-title"
  >
    <header class="mb-5 flex items-center gap-3.5">
      <span
        class="grid h-[30px] min-w-[30px] place-items-center rounded-md border border-[color-mix(in_srgb,var(--color-electric)_32%,transparent)] text-[0.68rem] font-black tracking-[0.08em] text-[var(--color-electric)]"
        aria-hidden="true"
        ><UiIcon name="school" size="sm"
      /></span>
      <h3 id="education-title" class="m-0 text-base font-bold uppercase text-[var(--color-ice)]">
        {{ t.academic.education }}
      </h3>
    </header>

    <UiCard
      tag="article"
      variant="flat"
      class="grid grid-cols-[84px_minmax(0,1fr)] gap-[18px] p-4 max-[640px]:grid-cols-1"
    >
      <div class="grid min-h-[72px] w-[72px] place-items-center" aria-hidden="true">
        <img class="block w-[50px] object-contain invert-light" :src="ufpeLogoUrl" alt="UFPE logo" />
      </div>

      <div>
        <h4 class="m-0 text-[1.04rem] font-extrabold text-[var(--color-ice)]">
          {{ t.academic.degree }}
        </h4>
        <p class="mt-2.5 mb-0 text-[0.7rem] text-[var(--color-electric)]">
          Centro de Informatica UFPE (CIn)
        </p>
        <dl class="mt-2 grid grid-cols-2 gap-2.5 p-0 max-[640px]:grid-cols-1">
          <div class="min-w-0">
            <dt
              class="absolute -m-px size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0_0_0_0)]"
            >
              ORCID
            </dt>
            <dd class="m-0">
              <UiMetaTag icon="link" label="ORCID" href="https://orcid.org/0009-0003-3862-3246" />
            </dd>
          </div>
        </dl>
      </div>
    </UiCard>
  </UiCard>
</template>

<script setup lang="ts">
import ufpeLogoUrl from '@/assets/ufpe-logo.png'
import UiCard from '@/components/ui/UiCard.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import UiMetaTag from '@/components/ui/UiMetaTag.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
