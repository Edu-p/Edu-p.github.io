<template>
    <div class="skills-component height-100 container">
        <h1>My Skills</h1>
        <p>This section showcases my skills.</p>
        <button @click="mindMapView = !mindMapView">Change view mode</button>
        <MindMap :data="skills" v-if="mindMapView" />
        <SkillTable :skills="skills.eduardo" v-else />
    </div>
</template>
<script lang="ts">
import MindMap from './Components/MindMap.vue';
import SkillTable from './Components/SkillTable.vue';

export default {
    name: 'SkillsComponent',
    components: { MindMap, SkillTable },
    data() {
        return {
            mindMapView: true,
            skills: {
                eduardo: [
                    {
                        name: "AI",
                        fullName: "Artificial Intelligence",
                        child: ["RAG", "ONNX"],
                    },
                    {
                        name: "ML",
                        fullName: "Machine Learning",
                        child: ["Scikit-Learn", "MLflow", "PyTorch"],
                    },
                    {
                        name: "Backend",
                        fullName: "Backend Development",
                        child: ["FastAPI", "Celery", "Redis"],
                    },
                    {
                        name: "Dados",
                        fullName: "Data Management",
                        child: ["Pandas", "Redis", "MongoDB", "PostgreSQL"],
                    },
                ]
            },


        };
    },
}

</script>
<style>
#Skills {
    min-height: 100vh;
    align-content: center;
}
</style>