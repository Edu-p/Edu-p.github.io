<template>
    <section class="projects-section container">
        <h2>Projects</h2>
        <select v-model="selectedTag" class="filter-select">
            <option value="">Filter by</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>

        <div class="projects-grid">
            <div v-for="(project, index) in filteredProjects" :key="index" class="project-card"
                :style="{ animationDelay: `${index * 0.2}s` }">
                <div class="project-header">
                    <a :href="project.link" target="_blank" class="project-title">
                        {{ project.title }}
                    </a>
                    <span class="arrow">↗</span>
                </div>
                <p class="project-description margin-top-small margin-bottom-small text-secondary text-xsmall">{{
                    project.description }}</p>
                <div class="project-tags">
                    <span v-for="(tag, idx) in project.tags" :key="idx" class="tag">{{ tag }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
export default {
    name: 'ProjectsSection',
    data() {
        return {
            selectedTag: '',
            projects: [
                {
                    title: 'Writing Test',
                    link: 'https://github.com/Edu-p/writing-test',
                    description: 'A web platform that tracks and enhances the English writing proficiency of developers through AI-based analysis.',
                    tags: ['AI', 'NLP', 'Vue', 'Python'],
                },
                {
                    title: 'Intent Detection',
                    link: 'https://github.com/Edu-p/intent-detection',
                    description: 'BERT-based NLP model to classify user intents and fetch the last three detected intents from a database.',
                    tags: ['NLP', 'BERT', 'AI', 'Python'],
                },
                {
                    title: 'Reco - Condominium Debt Negotiation',
                    link: 'https://github.com/Edu-p/Reco',
                    description: 'Award-winning web platform automating the negotiation process for defaulting condominium residents. 🏆 3 Awards.',
                    tags: ['AI', 'Fullstack', 'Vue', 'Python'],
                },
                {
                    title: 'Attention Mechanism',
                    link: 'https://github.com/Edu-p/attention-mechanism',
                    description: 'Conceptual and practical implementation of attention mechanisms with and without PyTorch for NLP tasks.',
                    tags: ['NLP', 'Deep Learning', 'PyTorch', 'Python'],
                },
                {
                    title: 'Granting of Credit',
                    link: 'https://github.com/Edu-p/granting-of-credit',
                    description: 'End-to-end project for credit risk analysis, involving case study comparison and credit scoring model building.',
                    tags: ['Finance', 'Machine Learning', 'Python'],
                },
                {
                    title: 'Store Sales Forecast',
                    link: 'https://github.com/Edu-p/store-sales-forecast',
                    description: 'Sales forecasting for Rossmann stores using time series modeling and ML techniques to predict the next 6 weeks.',
                    tags: ['Time Series', 'Forecasting', 'Machine Learning', 'Python'],
                },
                {
                    title: 'Which Property',
                    link: 'https://github.com/Edu-p/which-property',
                    description: 'Data-driven insights project for House Rocket to identify the most profitable property investment opportunities.',
                    tags: ['Data Science', 'Exploratory Analysis', 'Python'],
                },
            ],
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
    background: white;
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
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    cursor: pointer;

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
