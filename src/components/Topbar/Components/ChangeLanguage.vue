<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function toggleLanguage() {
    locale.value = locale.value === 'pt-BR' ? 'en-US' : 'pt-BR';
}
</script>

<template>
    <div class="language-toggle">
        <input type="checkbox" id="lang-toggle" :checked="locale === 'en-US'" @change="toggleLanguage" />
        <label for="lang-toggle">
            <span class="lang pt">PT</span>
            <span class="lang en">EN</span>
            <span class="slider"></span>
        </label>
    </div>
</template>

<style>
.language-toggle {
    position: relative;
    width: 68px;
    height: 30px;
}

.language-toggle input {
    display: none;
}

.language-toggle label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #d3d3d3;
    border-radius: 15px;
    height: 100%;
    padding: 0 11px;
    cursor: pointer;
    position: relative;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    box-sizing: border-box;
}

.language-toggle .lang {
    z-index: 2;
}

.language-toggle .slider {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 31px;
    height: 24px;
    background-color: var(--color-primary);
    border-radius: 52px;
    transition: transform 0.3s ease;
    z-index: 1;
}

.language-toggle input:checked+label .slider {
    transform: translateX(30px);
}

.language-toggle input:checked+label .en,
.language-toggle input:not(:checked)+label .pt {
    color: white;
    font-weight: bold;
}
</style>
