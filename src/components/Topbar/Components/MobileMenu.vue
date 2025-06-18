<template>
    <div class="mobile-version text-end 2-10">
        <svg v-if="!showMenu" width="18" height="18" viewBox="0 0 18 18" @click="showMenu = true"
            style="cursor: pointer">
            <polyline id="globalnav-menutrigger-bread-bottom" fill="none" stroke="currentColor" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round" points="2 12, 16 12"
                class="globalnav-menutrigger-bread globalnav-menutrigger-bread-bottom">
                <animate id="globalnav-anim-menutrigger-bread-bottom-open" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5" />
                <animate id="globalnav-anim-menutrigger-bread-bottom-close" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12" />
            </polyline>
            <polyline id="globalnav-menutrigger-bread-top" fill="none" stroke="currentColor" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round" points="2 5, 16 5"
                class="globalnav-menutrigger-bread globalnav-menutrigger-bread-top">
                <animate id="globalnav-anim-menutrigger-bread-top-open" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15" />
                <animate id="globalnav-anim-menutrigger-bread-top-close" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5" />
            </polyline>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 18 18" @click="showMenu = false" style="cursor: pointer">
            <polyline id="globalnav-menutrigger-bread-bottom" fill="none" stroke="currentColor" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round" points="3.5 15, 15 3.5"
                class="globalnav-menutrigger-bread globalnav-menutrigger-bread-bottom">
                <animate id="globalnav-anim-menutrigger-bread-bottom-open" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5" />
                <animate id="globalnav-anim-menutrigger-bread-bottom-close" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12" />
            </polyline>
            <polyline id="globalnav-menutrigger-bread-top" fill="none" stroke="currentColor" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round" points="3.5 3.5, 15 15"
                class="globalnav-menutrigger-bread globalnav-menutrigger-bread-top">
                <animate id="globalnav-anim-menutrigger-bread-top-open" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15" />
                <animate id="globalnav-anim-menutrigger-bread-top-close" attributeName="points" keyTimes="0;0.5;1"
                    dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline"
                    keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5" />
            </polyline>
        </svg>
    </div>
    <div v-if="showMenu" :class="`bg-topbar menu-mobile font-barlow w-100 Z-10 ${showMenu ? 'show' : ''}`">
        <MenuItems v-for="(topic, i) in topics" :key="i" :topic="topic" :index="i" :setActiveIndex="setActiveIndex"
            :activeIndex="activeIndex" />
        <div class="col p-2 font-barlow text-center align-center dropdown d-flex">
        </div>
    </div>
</template>

<script lang="ts">
import type { Topic } from "@/types/types";
import MenuItems from "./MenuItem.vue";


export default {
    name: 'MenuItem',
    props: {
        topics: {
            type: Array as () => Topic[],
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
    components: {
        MenuItems
    },
    data() {
        return {
            showMenu: false,
        };
    },
    watch: {
        showMenu(val: boolean) {
            document.body.style.overflow = val ? 'hidden' : '';
        }
    },
};
</script>
<style>
.bg-topbar {
    position: absolute;
    background-color: white;
    width: 100%;
    box-sizing: border-box;

    left: 0;
    overflow-x: hidden;
    height: 100svh;
}

.col.active {
    width: fit-content;
    padding: 8px 16px;
    justify-self: center;
}
</style>
