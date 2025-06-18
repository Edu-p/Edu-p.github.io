<template>
    <div :class="['col', index == activeIndex ? 'active' : '']" @click="setActiveIndex(index.toString())">
        <div class="no-br p-2" :class="{ 'b-purple': activeIndex.toString() === index.toString() }" :index="index">
            <a class="o-none t-none w-fit" :href="topic.href">
                {{ t(topic.name) }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Topic } from "@/types/types";
import { useI18n } from 'vue-i18n';

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
    methods: {
        t(key: string) {
            const { t } = useI18n();
            return t(key);
        }
    },
}

</script>
