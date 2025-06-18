<template>
    <div :class="['col', index == activeIndex ? 'active' : '']" @click="setActiveIndex(index.toString())">
        <div class="no-br p-2" :class="{ 'b-purple': activeIndex.toString() === index.toString() }" :index="index">
            <a class="o-none t-none w-fit" :href="topic.href">
                {{ topic.name }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Topic } from "@/types/types";

export default {
    name: 'MenuItem',
    props: {
        topic: {
            type: Object as PropType<Topic>,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        activeIndex: {
            type: Number,
            required: true
        },
        setActiveIndex: {
            type: Function,
            required: true
        }
    },
}

</script>
