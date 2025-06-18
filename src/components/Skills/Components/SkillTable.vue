<template>
    <div class="skill-table">
        <div v-for="(skill, index) in skills" :key="index" class="flex gap-xlarge">
            <div class="text-medium text-primary width-50">{{ skill.fullName }}</div>
            <div class="text-secondary flex gap-small text-xsmall">
                <li v-for="(item, itemIndex) in skill.child" :key="itemIndex">
                    {{ item }}
                </li>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { GroupType } from '@/types/types';
export default {
    name: 'SkillTable',
    props: {
        skills: {
            type: Array as () => GroupType[],
            required: true,
            default: () => []
        }
    }
};
</script>
<style>
.skill-table {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.skill-table>div {
    display: flex;
    align-items: center;
    padding: 32px 0;
    border-bottom: 1px solid var(--color-border);
}

.skill-table .text-primary {
    min-width: 160px;
}

.skill-table .text-secondary {
    display: flex;
}

.skill-table .text-secondary li {
    transition: all 0.3s ease;
}

.skill-table .text-secondary li:hover {
    color: var(--color-primary);
    font-size: small;
    font-weight: 600;
}
</style>