<template>
    <section class="home-component">
        <div class="container wrapper flex height-100">
            <img :src="eduImage" alt="Education Image" class="edu-image" :class="{ zoom: show }" />
            <div class="text">
                <div class="text-xxlarge text-bold margin-bottom-large typing" :class="showTitle && 'animated-done'"
                    v-if="showName">{{ t('home.dev_name') }}
                </div>
                <p class="text-xlarge margin-bottom-large typing" :class="showWelcome && 'animated-done'"
                    v-if="showTitle">{{ t('home.dev_role') }}</p>
                <p class="text-small text-light margin-bottom-small typing" :class="showButton && 'animated-done'"
                    v-if="showWelcome">{{ t('home.dev_welcome') }}
                </p>
                <button v-if="showButton" class="button-secondary fade-in">
                    <a href="https://www.linkedin.com/in/eduardo-amorim-eaa/" class="text-small">{{ t('home.linkedin')
                        }}</a>
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import edu from '@/assets/img/edu.png';
import { useI18n } from 'vue-i18n';

export default {
    name: 'HomeSection',
    data() {
        return {
            eduImage: edu,
            show: false,
            showName: false,
            showTitle: false,
            showWelcome: false,
            showButton: false,
        };
    },
    methods: {
        t(key: string) {
            const { t } = useI18n();
            return t(key);
        }
    },
    mounted() {
        setTimeout(() => { this.show = true; }, 300);
        setTimeout(() => { this.showName = true; }, 800);
        setTimeout(() => { this.showTitle = true; }, 1800);
        setTimeout(() => { this.showWelcome = true; }, 3000);
        setTimeout(() => { this.showButton = true; }, 4000);
    },
};
</script>

<style>
@keyframes backgroundFade {
    0% {
        background: #ffffff;
    }

    100% {
        background: linear-gradient(180deg, #FFFFFF 0%, #bfbdbd 49.52%, #FFFFFF 100%);
    }
}

.home-component {
    animation: backgroundFade 3s ease forwards;
    height: 100svh;

    .edu-image {
        align-self: self-end;
        height: 80%;
        transform: scale(1);
        transition: transform 2s ease;
    }

    .edu-image.zoom {
        transform: scale(1.1);
    }

    .text {
        align-content: center;

    }

    .typing {
        overflow: hidden;
        white-space: nowrap;
        border-right: 3px solid black;
        animation: typing 1s steps(30, end) 1, blink 0.6s step-end 2 alternate;
        animation-fill-mode: forwards;
    }

    .typing.animated-done {
        border-right: none;
    }

    .fade-in {
        opacity: 0;
        animation: fadeIn 1s ease forwards;
    }
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink {
    50% {
        border-color: transparent
    }
}

@keyframes fadeIn {
    to {
        opacity: 1
    }
}

@media screen and (max-width: 853px) {
    .home-component {
        .flex {
            flex-direction: column-reverse;
        }

        .text {
            align-self: center;
            text-align: center;
        }

        .edu-image {
            height: 60%;
            align-self: center;
        }
    }
}

@media screen and (max-width: 920px) {
    .home-component {
        height: 100vh;
    }
}
</style>
