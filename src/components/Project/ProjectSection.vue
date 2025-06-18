<template>
    <section class="projects-section container">
        <h2>{{ t('projects.title') }}</h2>
        <select v-model="selectedTag" class="filter-select">
            <option value="">{{ t('projects.filter_by') }}</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>

        <div class="projects-grid">
            <div v-for="(project, index) in filteredProjects" :key="index" class="project-card"
                :style="{ animationDelay: `${index * 0.2}s` }" @click="openProject(project.link)"
                style="cursor: pointer">
                <div class="project-header">
                    <a :href="project.link" target="_blank" class="project-title" @click.stop>
                        {{ t(`projects.projects[${index}].title`) }}
                    </a>
                    <span class="arrow">↗</span>
                </div>
                <p class="project-description margin-top-small margin-bottom-small text-secondary text-xsmall">{{
                    t(`projects.projects[${index}].description`) }}</p>
                <div class="project-tags">
                    <span v-for="(tag, idx) in project.tags" :key="idx" class="tag">{{ tag }}</span>
                </div>
            </div>
        </div>

        <div class="width-100 text-center">
            <button class="button-primary margin-top-large"
                @click="openProject('https://github.com/eduardoamorim/projects')">
                {{ t('projects.view_all') }}
            </button>
        </div>

    </section>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { useI18n } from 'vue-i18n';
import en from '@/locale/en.json';

export default {
    name: 'ProjectsSection',
    data() {
        return {
            selectedTag: '',
            projects: en.projects.projects.map((project: any) => ({
                ...project
            })),
        };
    },
    computed: {
        allTags(): string[] {
            const tags = this.projects.flatMap((p) => p.tags);
            return [...new Set(tags)];
        },
        filteredProjects() {
            if (!this.selectedTag) return this.projects;
            return this.projects.filter((p) => p.tags.includes(this.selectedTag));
        },
    },
    methods: {
        openProject(link: string) {
            window.open(link, "_blank");
        },
        t(key: string) {
            const { t } = useI18n();
            return t(key);
        }
    },
};
</script>

<style>
#Projects {
    min-height: 100vh;
    padding: 20px;
    background-color: #f3f3f3;
}

.projects-section {
    padding: 40px;
}

.filter-select {
    padding: 8px 12px;
    margin-bottom: 24px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    overflow: visible;
}

.project-card {
    background: #ffffff4f;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 1s ease forwards;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 1s ease;
    transform-origin: center;
}

.project-card:hover {
    box-shadow: 0 0 20px 0px rgb(28 26 63 / 22%);
    background-color: #ffffff;
    cursor: pointer;

    .project-title {
        color: var(--color-primary);
        text-decoration: underline;
    }

    .project-description {
        color: var(--text-primary);
    }

    .tag {
        opacity: 1;
        background-color: var(--color-primary);
        color: white;
    }

    .arrow {
        color: var(--color-primary);
    }
}

.project-description {
    transition: all 0.3s ease;
}


.project-header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}

.project-title {
    font-weight: bold;
    color: var(--color-primary);
    text-decoration: none;
    transition: all 0.3s ease;
}

.arrow {
    font-size: 1.2rem;
    color: #a1a1a1;
    transition: all 0.3s ease;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.75rem;
    color: #555;
    transition: all 0.3s ease;
    opacity: 0.6;
}

@keyframes fadeUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (min-width: 1300px) {
    .projects-grid {
        grid-template-columns: repeat(4, 1fr);
    }

}

@media screen and (max-width: 900px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 680px) {
    .projects-grid {
        grid-template-columns: repeat(1, 1fr);
    }

}
</style>
