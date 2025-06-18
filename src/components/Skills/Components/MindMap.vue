<template>
    <div ref="mindMapRef" class="mind-map-component">
        <svg v-if="isVisible" height="100%">
            <g v-for="(e, i) in edges" :key="'edge-' + i">
                <path :d="curvedPath(getNode(e.from).x, getNode(e.from).y, getNode(e.to).x, getNode(e.to).y)"
                    :class="e.class" />
            </g>
            <g v-for="(node, i) in nodes" :key="'node-' + i"
                :class="[node.class, node.group ? `group-${node.group}` : '']" :data-group="node.group || node.label">
                <rect :x="node.x - 40" :y="node.y - 16" width="80" height="32" rx="10" ry="10" />
                <text :x="node.x" :y="node.y + 4" text-anchor="middle">{{ node.label }}</text>
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { GroupType } from '@/types/types';

type NodeType = {
    id: string;
    label: string;
    x: number;
    y: number;
    class: string;
    group?: string;
};

type EdgeType = {
    from: string;
    to: string;
    class: string;
};

const nodes = ref<NodeType[]>([]);
const edges = ref<EdgeType[]>([]);
const isVisible = ref(false);
const mindMapRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const props = defineProps<{
    data: {
        eduardo: GroupType[];
    };
}>();

function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function getNode(id: string): NodeType {
    return nodes.value.find((n) => n.id === id) || { id: '', label: '', x: 0, y: 0, class: '' };
}

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                if (mindMapRef.value && observer) observer.unobserve(mindMapRef.value);
            }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (mindMapRef.value && observer) observer.observe(mindMapRef.value);

    const styleEl = document.createElement('style');
    props.data.eduardo.forEach((group) => {
        styleEl.innerHTML += `
      .group-node[data-group="${group.name}"]:hover ~ g.child-node[data-group="${group.name}"] rect, .group-node[data-group="${group.name}"]:hover rect {
        fill: var(--color-primary);
        stroke: var(--color-primary);
      }
      .group-node[data-group="${group.name}"]:hover ~ g.child-node[data-group="${group.name}"] text, .group-node[data-group="${group.name}"]:hover text {
        fill: white;
        font-weight: bold;
      }
    `;
    });
    document.head.appendChild(styleEl);

    const centerX = 400;
    const centerY = 300;
    const groupSpacing = 150;
    const childSpacing = 50;

    const n: NodeType[] = [{ id: "eduardo", label: "Eduardo", x: centerX, y: centerY, class: "main-node" }];
    const e: EdgeType[] = [];

    const sideCount = props.data.eduardo.length;
    const leftGroups = props.data.eduardo.slice(0, Math.ceil(sideCount / 2));
    const rightGroups = props.data.eduardo.slice(Math.ceil(sideCount / 2));

    const layoutGroup = (groups: GroupType[], direction: number) => {
        groups.forEach((group: GroupType, i: number) => {
            const gx = centerX + direction * groupSpacing;
            const gy = centerY + (i - groups.length / 2) * 100 + (group.yOffset || 0);

            n.push({ id: group.name, label: group.name, x: gx, y: gy, class: "group-node" });
            e.push({ from: "eduardo", to: group.name, class: "group-edge" });

            group.child.forEach((child: string, j: number) => {
                const cx = gx + direction * groupSpacing;
                const cy = gy + (j - group.child.length / 2) * childSpacing;
                n.push({
                    id: `${group.name}-${child}`,
                    label: child,
                    x: cx,
                    y: cy,
                    class: "child-node",
                    group: group.name,
                });
                e.push({ from: group.name, to: `${group.name}-${child}`, class: "child-edge" });
            });
        });
    };

    layoutGroup(leftGroups.map((g, i) => ({ ...g, yOffset: i === 1 ? 80 : 0 })), -1);
    layoutGroup(rightGroups.map((g, i) => ({ ...g, yOffset: i === 1 ? 80 : 0 })), 1);

    nodes.value = n;
    edges.value = e;
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
});
</script>

<style>
.mind-map-component {
    width: 102%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
}

.mind-map-component svg {
    width: 100%;
}

rect,
text {
    transition: all 0.3s ease;
}

.main-node rect,
.group-node rect,
.child-node rect {
    fill: rgb(228 228 228);
    stroke: var(--color-primary);
    stroke-width: 1px;
}

.main-node text,
.group-node text,
.child-node text {
    fill: var(--color-primary);
    font-size: 10px;
    font-family: Arial, sans-serif;
}

.main-node:hover~g rect,
.main-node:hover rect {
    fill: var(--color-primary);
    stroke: var(--color-primary);
}

.main-node:hover~g text,
.main-node:hover text {
    fill: white;
    font-weight: bold;
}

.group-node:hover~g.child-node {
    opacity: 0.3;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.main-node,
.group-node,
.child-node {
    opacity: 0;
    animation: fadeIn 1s ease forwards;
}

.main-node {
    animation-delay: 0.3s;
}

.group-node {
    animation-delay: 2.5s;
}

.child-node {
    animation-delay: 4.5s;
}

.child-node:hover rect {
    fill: var(--color-primary);
    stroke: var(--color-primary);
}

.child-node:hover text {
    fill: white;
    font-weight: bold;
}

.group-edge,
.child-edge {
    stroke: var(--color-primary);
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: drawLine 1.5s ease forwards;
}

.group-edge {
    animation-delay: 1.3s;
}

.child-edge {
    animation-delay: 3.5s;
}

@keyframes drawLine {
    from {
        stroke-dashoffset: 300;
    }

    to {
        stroke-dashoffset: 0;
    }
}

@media screen and (min-width: 1100px) {
    .mind-map-component {
        width: 789px;
    }
}

@media (min-width: 780px) and (max-width: 860px) {
    .mind-map-component {
        zoom: 0.9;
    }
}

@media (min-width: 700px) and (max-width: 780px) {
    .mind-map-component {
        zoom: 0.8;
    }
}

@media (min-width: 630px) and (max-width: 700px) {
    .mind-map-component {
        zoom: 0.7;
    }
}

@media (min-width: 500px) and (max-width: 630px) {
    .mind-map-component {
        zoom: 0.6;
    }
}

@media (min-width: 500px) and (max-width: 560px) {
    .mind-map-component {
        zoom: 0.5;
    }
}
</style>
