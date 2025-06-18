<template>
    <div class="col flex flex-center border-rounded width-fit place-self-center padding-small bg-gray-0 gap-small">
        <MenuItems v-for="(topic, i) in topics" :key="i" :topic="topic" :index="i" :setActiveIndex="setActiveIndex"
            :activeIndex="activeIndex" />
        <ChangeLanguage />
    </div>
</template>

<script setup lang="ts">
import ChangeLanguage from './ChangeLanguage.vue';
import MenuItems from './MenuItem.vue'
import type { Topic } from "@/types/types";

defineProps<{
    topics: Topic[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}>();
</script>
<style>
.col {
    min-width: 85px;
    padding: 8px 16px;
    border-radius: 99999px;

    .no-br {
        justify-self: center;

    }

    a {
        color: var(--text-color);
        font-weight: 500;
        font-size: 0.8rem;
        text-decoration: none;
    }

    &.active {
        background-color: var(--color-primary);
        color: white;
    }
}
</style>