<template>
    <div class="col f-1-1 p-0 c-pointer p-relative" id="changeLanguage" @click="toggleDropdown">
        <div class="no-br p-2">
            <font-awesome-icon :icon="faGlobe" class="margin-right-small" />
            {{ language === 'PT' ? 'PT-BR' : 'EN-USA' }}
            <font-awesome-icon :icon="faChevronUp"
                :class="['margin-left-small', 'fs-08', 'c-blue', { rotate: !dropdown }]" />
        </div>
        <div id="myDropdown" :class="['dropdown-content', { showDrop: dropdown }]">
            <button @click.stop="handleChangeLanguage('PT')">PT-BR</button>
            <button @click.stop="handleChangeLanguage('EN')">EN-USA</button>
        </div>
    </div>
</template>

<script lang="ts">

export default defineComponent({
    data() {
        return {
            dropdown: false
        }
    },
    computed: {
        language() {
            return this.$store.state.topBarRedux.language
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdown = !this.dropdown
        },
        handleChangeLanguage(lang) {
            if (this.language !== lang) {
                this.$store.dispatch('changeLanguage', lang)
                changeLanguageService(lang, { i18n: { changeLanguage: (l) => (this.$i18n.locale = l) } })
            }
            this.dropdown = false
        }
    }
})
</script>

<style scoped>
/* Add your styles here */
</style>
