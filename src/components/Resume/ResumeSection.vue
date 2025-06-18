<template>
    <div class="resume-component container" id="Resume">
        <h1>My experience</h1>

        <TimeLine v-for="(company, index) in info" :key="index" :company="company.company" :position="company.positions"
            :date="company.date" :description="company.positions.map(pos => pos.bulletPoint)">
        </TimeLine>
    </div>
</template>

<script lang="ts">
import TimeLine from './Components/TimeLine.vue';
export default {
    name: 'ResumeSection',
    components: {
        TimeLine,
    },
    data() {
        return {
            info: [
                {
                    company: 'Amigo Tech',
                    date: '03/2025 - o momento',
                    positions: [
                        {
                            index: 0,
                            position: 'ML Engineer',
                            bulletPoint: [
                                'Atuou no desenvolvimento de APIs com FastAPI para expor serviços de Machine Learning a outras squads internas.',
                                'Criou agentes de IA utilizando LangGraph e LangChain para a construção da lógica conversacional, com monitoramento de custos via LangSmith. Trabalhou com servidores MCP para melhor encapsulação das tools utilizadas.',
                                'Implementou uma feature chave para a squad, paralelizando um processamento intensivo de visão computacional pesado, reduzindo o tempo de execução em ~46%.'
                            ]
                        }
                    ]
                },
                {
                    company: 'Neurotech',
                    date: '02/2023 - 03/2025',
                    positions: [
                        {
                            index: 1,
                            position: 'ML Engineer',
                            date: '11/2023 - 03/2025',
                            bulletPoint: [
                                'Alcançou a maior venda da história da squad, atingindo 9x a meta estipulada para o ano no contrato total, ao aplicar um algoritmo desenvolvido em Python que combina modelos de aprendizado de máquina com base em desempenho e custo, em uma prova de conceito com um dos 10 maiores bancos do Brasil.',
                                'Desenvolveu projetos de P&D voltados ao avanço do estado da arte nas técnicas utilizadas pelos cientistas de dados.',
                                'Conduzi reuniões estratégicas para compartilhar conhecimento sobre técnicas amplamente utilizadas em machine learning, incluindo interpretabilidade de modelos no processo de auditoria interna de grandes bancos e estratégias de feature engineering.'
                            ]
                        },
                        {
                            index: 2,
                            position: 'ML Engineer (Estágio)',
                            date: '02/2023 - 11/2023',
                            bulletPoint: [
                                'Contribuiu para o desenvolvimento de bibliotecas internas, acelerando o processo de estudo e experimentação dos cientistas de dados da companhia.',
                                'Participou da concepção de soluções para bancos e instituições financeiras, abordando desafios em todo o ciclo de crédito.'
                            ]
                        }
                    ]
                },
                {
                    company: 'Voxar Labs',
                    date: '0/2023 - 02/2024',
                    positions: [
                        {
                            index: 3,
                            position: 'ML Engineer',
                            date: '01/2023 - 02/2023',
                            bulletPoint: [
                                'Participou do desenvolvimento de uma solução para inspeção de torres de transmissão, utilizando drones para captura de imagens em campo, com foco na classificação de anomalias e defeitos, reduzindo significativamente o esforço manual na análise de imagens, na maioria sem anomalias.',
                                'Implantou a arquitetura de produção dos modelos que compunham a solução, containerizando-os e servindo-os em uma infraestrutura Kubernetes no Azure (AKS), além de configurar um dashboard de monitoramento utilizando Grafana.'
                            ]
                        },
                        {
                            index: 4,
                            position: 'ML Engineer',
                            date: '08/2022 - 12/2022',
                            bulletPoint: [
                                'Realizou pesquisa e experimentação de algoritmos estado da arte no campo de aprendizado federado, adaptando frameworks (i.e., Flower, PySyft) para atender às necessidades específicas do projeto.',
                                'Desenvolveu novos conjuntos de dados para apoiar pesquisadores do campo globalmente.',
                                'Publicou na conferência internacional VISAPP (Computer Vision Theory and Applications) o trabalho "FedBID and FedDocs: A Dataset and System for Federated Document Analysis".'
                            ]
                        }
                    ]
                },
                {
                    company: 'Stellantis',
                    date: '06/2022 - 09/2022',
                    positions: [
                        {
                            index: 5,
                            position: 'ML Engineer (Estágio)',
                            date: '06/2022 - 09/2022',
                            bulletPoint: [
                                'Desenvolveu uma aplicação para captura e detecção de códigos de barras em esteiras de produção automotiva no grupo Stellantis, reduzindo o erro de verificação manual em ~63%.',
                                'Utilizou YOLO para detecção de objetos e Tesseract como OCR.'
                            ]
                        }
                    ]
                },
                {
                    company: 'AiBox Lab',
                    date: '05/2021 - 09/2021',
                    positions: [
                        {
                            index: 6,
                            position: 'ML Engineer (Estágio)',
                            date: '06/2021 - 08/2021',
                            bulletPoint: [
                                'Implementou um sistema para gerar métricas de análise textual, incluindo legibilidade, coerência e coesão, utilizando NLTK e SpaCy.',
                                'Aplicou essas métricas em um classificador de feedback textual professores universitários a gerenciar grandes volumes de avaliações individuais que alcançou 95.1% de acurácia em um conjunto de 1000 textos avaliados por professores reais, utilizando scikit-learn.'
                            ]
                        }
                    ]
                }
            ],
        };
    },
};
</script>
<style scoped>
#Resume {
    min-height: 100vh;
    margin: 32px 0;
}
</style>