<template>
  <section class="academic-panel education-panel" aria-labelledby="education-title">
    <header class="panel-title">
      <span class="panel-icon" aria-hidden="true"><UiIcon name="school" size="sm" /></span>
      <h3 id="education-title">{{ t.academic.education }}</h3>
    </header>

    <article class="education-card">
      <div class="ufpe-mark" aria-hidden="true">
        <img :src="ufpeLogoUrl" alt="" />
      </div>

      <div class="education-copy">
        <h4>Centro de Informatica UFPE (CIn)</h4>
        <p>{{ t.academic.degree }}</p>
      </div>

      <dl class="education-meta">
        <div>
          <span class="education-meta-icon" aria-hidden="true">
            <UiIcon name="calendar_month" size="sm" />
          </span>
          <dt>{{ t.academic.period }}</dt>
          <dd>2020 - 2025</dd>
        </div>
        <div>
          <span class="education-meta-icon" aria-hidden="true">
            <UiIcon name="location_on" size="sm" />
          </span>
          <dt>{{ t.academic.location }}</dt>
          <dd>{{ t.about.location }}</dd>
        </div>
      </dl>
    </article>
  </section>
</template>

<script setup lang="ts">
import ufpeLogoUrl from '@/assets/ufpe-logo.png'
import UiIcon from '@/components/ui/UiIcon.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>
