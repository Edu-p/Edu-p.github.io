<template>
    <div ref="el" :class="`${className} scroll-reveal ${visible ? 'visible' : ''}`" :id="id">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
    className: { type: String, default: '' },
    threshold: { type: Number, default: 0.3 },
    rootMargin: { type: String, default: '0px 0px -10% 0px' },
    id: { type: String, default: '' }
});

const visible = ref(false);
const el = ref<null | HTMLElement>(null);
let observer: IntersectionObserver | null = null;

function createObserver() {
    if (observer) observer.disconnect();
    observer = new window.IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                visible.value = true;
                if (el.value && observer) observer.unobserve(el.value);
            }
        },
        { threshold: props.threshold, rootMargin: props.rootMargin }
    );
    if (el.value) observer.observe(el.value);
}

onMounted(() => {
    createObserver();
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
});

watch(
    () => [props.threshold, props.rootMargin],
    () => {
        createObserver();
    }
);
</script>
