<template>
    <div ref="timelineRef" :class="[
        'time-line font-barlow flex align-start animate-timeline width-100',
        { visible }
    ]">
        <div class="time-line font-barlow flex align-start">
            <div class="text-right bp-desktop">
                <h3>{{ t(`resume.companies.${company}.name`) }}</h3>
                <p class="text-xsmall">{{ t(`resume.companies.${company}.date`) }}</p>
            </div>
            <div class="timeline-container">
                <div :class="['timeline-circle', index % 2 === 0 ? 'even' : 'odd']">
                    <svg width="24" height="24">
                        <circle cx="12" cy="12" r="8" />
                    </svg>
                </div>
                <template v-if="index !== -1">
                    <div class="timeline-dashed-line"></div>
                </template>
            </div>
            <div class="timeline-description">
                <div class="text-left bp-mobile margin-bottom-medium">
                    <h4>{{ t(`resume.companies.${company}.name`) }}</h4>
                    <span class="text-xsmall text-secondary">{{ t(`resume.companies.${company}.date`) }}</span>
                </div>
                <div class="text-left width-100 pb-2r" v-for="(position, posIdx) in position" :key="posIdx">
                    <h4 class="text-semibold"> <template v-if="posIdx > 0">
                            <svg width="12" height="12" style="vertical-align: middle; margin-right: 6px;">
                                <circle cx="6" cy="6" r="4" fill="var(--color-primary)" />
                            </svg>
                        </template>{{ t(`resume.companies.${company}.positions[${posIdx}].title`) }}</h4>

                    <ul class="margin-top-small">
                        <li v-for="(point, idx) in position.bulletPoint" :key="idx"
                            class="text-xsmall bullet-point margin-bottom-small">

                            {{ t(`resume.companies.${company}.positions[${posIdx}].bullets[${idx}]`) }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import type { JobPosition } from '@/types/types';
import { useI18n } from 'vue-i18n';

export default {
    props: {
        company: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        position: {
            type: Array as () => JobPosition[],
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data(): { visible: boolean; observer: IntersectionObserver | null } {
        return {
            visible: false,
            observer: null
        }
    },
    mounted() {
        this.observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.visible = true
                    const el = this.$refs.timelineRef as HTMLElement | undefined
                    if (el && this.observer) this.observer.unobserve(el)
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -10% 0px'
            }
        )
        const el = this.$refs.timelineRef as HTMLElement | undefined
        if (el && this.observer) this.observer.observe(el)
    },
    beforeUnmount() {
        if (this.observer) this.observer.disconnect()
    },
    methods: {
        t(key: string) {
            const { t } = useI18n();
            return t(key);
        }
    },
}
</script>
<style>
#Curriculo .container .d-flex {
    overflow: hidden;
}

.timeline-container {
    overflow: hidden;
    justify-items: center;
    min-width: 41px;
}

.timeline-circle {
    border-radius: 50%;
    pointer-events: none;
    margin-bottom: 5px;
    fill: var(--color-primary);
}


.timeline-dashed-line {
    justify-self: anchor-center;
    border-left: 1px solid #e9e9e9;
    width: 2px;
    height: 82%;
}

.time-line h2,
.time-line h3 {
    color: #5a5a5a;
    font-weight: 600;
}

.time-line p {
    color: #98A2B3;
}

.bp-mobile {
    display: none;
}


.time-line {
    justify-content: left;
    gap: 32px;
    position: relative;
    height: 95%;
    overflow: hidden;
}

.time-line .text-right {
    width: 140px;
    text-align: right;
}

.timeline-description {
    width: 80%;

    .width-100 {

        position: relative;
    }
}

.bullet-point {
    transition: all 0.3s ease-in-out;
    color: #a4a4a4;

    &:hover {
        color: var(--color-primary);
        transform: translateX(5px);
        font-weight: 600;
    }
}

.button-curriculo {

    height: 263px;
}

.button-curriculo a {
    background-color: #3E0052;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 24px;
}

@media (max-width: 800px) {
    .bp-desktop {
        display: none;
    }

    .bp-mobile {
        display: block;
    }

    .timeline-description {
        display: flex;
        flex-direction: column;
        width: 70%;
    }

    .time-line {
        justify-content: center;
        gap: 2rem;
    }
}

@keyframes fadeSlideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-timeline {
    opacity: 0;
    transform: translateY(30px);
    transition: none;
    will-change: opacity, transform;
}

.animate-timeline.visible {
    animation: fadeSlideUp 1s ease-out forwards;
}
</style>