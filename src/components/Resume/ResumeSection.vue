<template>
    <div class="resume-component container" id="Resume">
        <h2>{{ t('resume.my_experience') }}</h2>

        <TimeLine v-for="(company, index) in info" :key="index" :company="company.companyName"
            :position="company.positions" :date="company.date" :index="index === info.length - 1 ? -1 : index" />

        <div class="margin-top-large">
            <button class="button-primary margin-top-medium fade-in">
                <a href="/assets/files/resume.pdf" class="text-xsmall" target="_blank" rel="noopener">
                    {{ t('resume.view_resume') }}
                </a>
            </button>
        </div>

        <div class="education-section width-100 margin-top-large">
            <h2>{{ t('resume.education') }}</h2>
            <div class="education-item">
                <span class="bullet"></span>
                <div class="education-text">
                    <strong>{{ t('resume.undergraduate') }}</strong>
                    <p>{{ t('resume.university') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import TimeLine from './Components/TimeLine.vue';
import { useI18n } from 'vue-i18n';
import { defineComponent, computed } from 'vue';
import en from '@/locale/en.json';

export default defineComponent({
    name: 'ResumeSection',
    components: { TimeLine },
    setup() {
        const { t } = useI18n<{ resume: any }>();


        const companyKeys = ['amigo_tech', 'neurotech', 'voxar_labs', 'stellantis', 'aibox_lab'] as const;

        const info = computed(() =>
            companyKeys.map((key) => {
                const company = en.resume.companies[key];

                return {
                    key,
                    date: company.date,
                    companyName: key,
                    positions: company.positions?.map((pos: any) => ({
                        position: pos.title,
                        date: company.date,
                        bulletPoint: pos.bullets
                    }))
                };
            })
        );

        return { t, info };
    },
});

</script>

<style scoped>
#Resume {
    min-height: 100vh;
    margin: 32px 0;
    justify-self: anchor-center;
}

.education-section h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.education-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

.bullet {
    width: 8px;
    height: 8px;
    background-color: #1a1534;
    border-radius: 50%;
    margin-top: 6px;
}

.education-text strong {
    font-weight: bold;
}

.education-text p {
    margin: 0;
    color: #999;
    font-size: 0.9rem;
}
</style>