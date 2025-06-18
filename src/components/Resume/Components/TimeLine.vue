<template>
    <div ref="timelineRef" :class="[
        'time-line font-barlow flex align-start animate-timeline width-100',
        { visible }
    ]">
        <div class="time-line font-barlow flex align-start">
            <div class="text-right width-25 bp-desktop">
                <h2>{{ company }}</h2>
                <p class="text-xsmall">{{ date }}</p>
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
                    <h2>{{ company }}</h2>
                    <span class="text-xsmall text-secondary">{{ date }}</span>
                </div>
                <div class="text-left width-100 pb-2r" v-for="(position, posIdx) in position" :key="posIdx">
                    <h3 class="font-bold"> <template v-if="posIdx > 0">
                            <svg width="12" height="12" style="vertical-align: middle; margin-right: 6px;">
                                <circle cx="6" cy="6" r="4" fill="var(--color-primary)" />
                            </svg>
                        </template>{{ position.position }}</h3>

                    <ul class="margin-top-small">
                        <li v-for="(point, idx) in position.bulletPoint" :key="idx"
                            class="text-xsmall bullet-point text-secondary margin-bottom-small">

                            {{ point }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        company: String,
        date: String,
        position: Array
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
    }
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
    color: #344054;
    font-weight: 600;
}

.time-line p {
    color: #98A2B3;
}

.bp-mobile {
    display: none;
}


.time-line {
    justify-content: center;
    gap: 32px;
    position: relative;
    height: 95%;
    overflow: hidden;
}

.timeline-description {
    width: 50%;

    .width-100 {

        position: relative;
    }
}

.bullet-point {
    transition: all 0.3s ease-in-out;

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