import { computed, ref, watchEffect } from 'vue'

export type Locale = 'en' | 'pt'

const STORAGE_KEY = 'eduardo-portfolio-locale'

const messages = {
  en: {
    nav: {
      aria: 'Main navigation',
      brandAria: 'Go to home',
      menuAria: 'Open menu',
      talk: "Let's talk",
      language: 'Language',
      items: {
        home: 'Home',
        about: 'About',
        journey: 'My journey',
        academic: 'Academic',
        projects: 'Projects',
        contact: 'Contact',
      },
    },
    hero: {
      eyebrow: 'AI Engineer',
      title: 'Artificial intelligence for products that leave the lab.',
      description:
        'I design, train, and ship systems with machine learning, NLP, and computer vision, connecting research, product, and real-world impact.',
      primaryCta: 'View my resume',
      secondaryCta: 'Contact now',
      specialties: 'Specialties',
      signals: ['Machine Learning', 'NLP', 'Computer Vision', 'MLOps', 'AI Agents'],
    },
    about: {
      imageAlt: 'Photo of Eduardo A. A.',
      eyebrow: 'About me',
      title: 'Science, logic, and purpose.',
      titleAccent: 'That is my formula.',
      copy:
        'AI Engineer with more than 5 years connecting research, product, and scalable cloud systems. Specialist in Machine Learning, MLOps, and intelligent agents.',
      contactAria: 'Contact information',
      location: 'Recife, PE, Brazil',
      stackEyebrow: 'Technologies I use',
      metrics: [
        { icon: 'EXP', value: '5+', label: 'years of experience' },
        { icon: 'PUB', value: '3+', label: 'academic publications' },
        { icon: 'DEV', value: '10+', label: 'academic projects' },
        { icon: 'TOP', value: '100%', label: 'focus on impact and learning' },
      ],
      techGroups: [
        { title: 'AI & Machine Learning', items: ['Python', 'PyTorch', 'Scikit-Learn', 'LangChain', 'LangGraph', 'LLMs', 'NLTK', 'SpaCy'] },
        { title: 'Backend & Data', items: ['FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'pgvector', 'MongoDB', 'SQL'] },
        { title: 'Cloud & DevOps', items: ['Cloud Run', 'Cloud Build', 'Vertex AI', 'Kubeflow', 'Docker', 'Kubernetes', 'CI/CD'] },
        { title: 'Frontend & Other', items: ['React', 'HTML', 'CSS', 'Git'] },
      ],
    },
    academic: {
      eyebrow: 'Academic',
      title: 'Research that creates',
      titleAccent: 'impact.',
      description:
        'Scientific work developed in Artificial Intelligence, AI Safety, Natural Language Processing, and Federated Learning.',
      identifyAria: 'Academic identity and profiles',
      publications: 'Publications',
      readPaper: 'Read paper',
      viewCode: 'View code',
      paperUnavailable: 'Paper not published yet.',
      codeUnavailable: 'Code repository not available for this paper.',
      allPublications: 'View all publications',
      education: 'Education',
      degree: 'B.Sc. in Computer Science',
      period: 'Period',
      location: 'Location',
      educationNote: 'Graduated in 2025.',
      highlightsTitle: 'Academic highlights',
      quoteAria: 'Quote',
      quote: 'Seeking knowledge and building impact.',
      papers: [
        {
          mark: 'SB',
          venue: 'SBSC 2026',
          track: 'AI Safety & Collaborative Systems',
          title: 'Operationalizing the Traffic Light Protocol for Native Portuguese Language Model Guardrails in Collaborative Workflows',
          event: 'SBSC 2026',
          topic: 'AI Safety & Collaborative Systems',
          authors: 'E. A. Amorim, et al.',
          summary: 'Proposal and evaluation of a safety protocol for Portuguese language models applied to collaborative workflows.',
          codeHref: 'https://github.com/Edu-p/traffic-light-secbert-br',
        },
        {
          mark: 'IJ',
          venue: 'IJCNN 2026',
          track: 'AI Safety & NLP',
          title: 'Robustness of Language Models against Portuguese Harmful Prompts',
          event: 'IJCNN 2026',
          topic: 'AI Safety & NLP',
          authors: 'E. A. Amorim, et al.',
          summary: 'Robustness analysis of LLMs against harmful Portuguese prompts and mitigation strategies.',
          codeHref: 'https://github.com/Edu-p/secbert-pt',
        },
        {
          mark: 'VI',
          venue: 'VISAPP 2023',
          track: 'Federated Learning & Computer Vision',
          title: 'FedBID and FedDocs: A Dataset and System for Federated Document Analysis',
          event: 'VISAPP 2023',
          topic: 'Federated Learning & Computer Vision',
          authors: 'E. A. Amorim, et al.',
          summary: 'Presentation of a dataset and system for document analysis in a federated learning scenario.',
          paperHref: 'https://www.scitepress.org/Papers/2023/116911/116911.pdf',
        },
      ],
      highlights: [
        { icon: 'BR', value: '1', label: 'national paper' },
        { icon: 'INT', value: '2', label: 'international papers' },
        { icon: 'TOP', value: '100%', label: 'accepted papers' },
        { icon: 'GPA', value: '8.9/10', label: 'final GPA' },
      ],
      projectsTitle: 'Projects',
      viewProject: 'View project',
      projects: [
        {
          icon: 'AI',
          title: 'AI Engineer - Visiting Specialist',
          period: 'Sep 2024 - Dec 2024',
          summary:
            'Specialized chatbot for Nina that detected user intent and filled key slots to register, query, update, and delete harassment complaints across Brazil.',
          skills: ['BERT', 'AWS Lambda', 'S3', 'Lex V2'],
        },
        {
          icon: 'SP',
          title: 'secbert-pt',
          period: 'IJCNN 2026 paper code',
          summary:
            'SecBERT, a BERTimbau-based classifier for detecting harmful and jailbreak prompts in Brazilian Portuguese.',
          skills: ['BERTimbau', 'AI Safety', 'NLP', 'Portuguese'],
          href: 'https://github.com/Edu-p/secbert-pt',
        },
        {
          icon: 'TL',
          title: 'traffic-light-secbert-br',
          period: 'SBSC 2026 paper code',
          summary:
            'Reference architecture for deploying SecBERT as a low-friction security layer with Traffic Light routing logic.',
          skills: ['SecBERT', 'Guardrails', 'Traffic Light', 'AI Safety'],
          href: 'https://github.com/Edu-p/traffic-light-secbert-br',
        },
        {
          icon: 'WT',
          title: 'Writing Test',
          period: 'Jul 2024 - Aug 2024',
          summary:
            'Platform to improve developers English proficiency with RAG features, LLM evaluation, user metrics, and feedback for professional writing scenarios.',
          skills: ['RAG', 'LLM', 'DeepEval', 'Langfuse'],
          href: 'https://github.com/Edu-p/writing-test',
        },
        {
          icon: 'RC',
          title: 'Reco',
          period: 'Jul 2023 - Nov 2023',
          summary:
            'Web platform that automates condominium delinquency negotiations and won 3 out of 4 awards.',
          skills: ['Negotiation automation', 'Web platform'],
          href: 'https://github.com/Edu-p/Reco',
        },
        {
          icon: 'ID',
          title: 'Intent Detection',
          period: 'Intent detection chatbot',
          summary:
            'Chatbot that predicts user intentions, uses BERT for intent detection, and retrieves recent intents from MongoDB through a Streamlit and Flask app.',
          skills: ['BERT', 'Streamlit', 'Flask', 'MongoDB'],
          href: 'https://github.com/Edu-p/intent-detection',
        },
        {
          icon: 'AM',
          title: 'Attention Mechanism',
          period: 'Deep learning study',
          summary: 'Implementation of an attention mechanism both with and without PyTorch.',
          skills: ['Attention', 'PyTorch', 'Deep Learning'],
          href: 'https://github.com/Edu-p/attention-mechanism',
        },
        {
          icon: 'GC',
          title: 'Granting of Credit',
          period: 'Credit modeling',
          summary: 'Credit concession analysis combining multiple cases and building a credit evaluation model.',
          skills: ['Machine Learning', 'Credit Risk', 'Data Analysis'],
          href: 'https://github.com/Edu-p/granting-of-credit',
        },
        {
          icon: 'SF',
          title: 'Store Sales Forecast',
          period: 'Forecasting project',
          summary: 'Sales prediction project for Rossmann stores over the next 6 weeks.',
          skills: ['Forecasting', 'Regression', 'Feature Engineering'],
          href: 'https://github.com/Edu-p/store-sales-forecast',
        },
        {
          icon: 'WP',
          title: 'Which Property',
          period: 'Insights project',
          summary: 'Insights project that helps House Rocket choose the right properties.',
          skills: ['Data Analysis', 'Business Intelligence', 'Python'],
          href: 'https://github.com/Edu-p/WhichProperty',
        },
      ],
    },
    timeline: {
      eyebrow: 'My journey',
      title: 'Professional timeline',
      controls: 'Timeline controls',
      previous: 'Previous items',
      next: 'Next items',
      details: 'Open details',
      showMore: 'Show more',
      items: [
        {
          period: '2025 - Present',
          logo: 'TD',
          role: 'Senior AI Engineer',
          company: 'TELUS Digital',
          location: 'Vancouver, Canada (Remote)',
          summary: 'Architecture of multi-agent systems on GCP and scalable ML pipelines for automatic insights.',
          tags: ['GCP', 'Kubeflow', 'Vertex AI', 'Celery', 'Redis', 'CI/CD', 'OAuth2'],
        },
        {
          period: 'Mar 2025 - Aug 2025',
          logo: 'AT',
          role: 'AI Engineer',
          company: 'Amigo Tech',
          location: 'Brazil',
          summary: 'Development of agents with LangGraph and LangChain using Redis and PostgreSQL with pgvector.',
          tags: ['FastAPI', 'LangGraph', 'LangChain', 'Redis', 'PostgreSQL', 'pgvector'],
        },
        {
          period: 'Feb 2023 - Mar 2025',
          logo: 'NT',
          role: 'ML Engineer',
          company: 'Neurotech',
          location: 'Brazil',
          summary: 'Hybrid ML models that exceeded annual goals for a Top 10 bank, with technical leadership in audits.',
          tags: ['Python', 'Scikit-Learn', 'XGBoost', 'Machine Learning', 'Feature Engineering'],
        },
        {
          period: 'Aug 2022 - Feb 2023',
          logo: 'VX',
          role: 'ML Engineer',
          company: 'Voxar Labs',
          location: 'Brazil',
          summary: 'Research in Federated Learning and deployment of detection models on drones with Azure AKS.',
          tags: ['Flower', 'PySyft', 'Azure', 'Docker', 'Kubernetes', 'Grafana'],
        },
        {
          period: 'Apr 2021 - Jan 2022',
          logo: 'AB',
          role: 'ML Engineer',
          company: 'AiBox Lab',
          location: 'Brazil',
          summary: 'NLP for textual analysis metrics with NLTK and SpaCy, including a classifier with 95.1% accuracy.',
          tags: ['NLP', 'NLTK', 'SpaCy', 'Scikit-Learn', 'Python'],
        },
      ],
    },
    contact: {
      role: 'AI Engineer',
      copy: 'Turning data into intelligence to create a better future.',
      socialAria: 'Social networks',
      footerNavAria: 'Footer navigation',
      navigation: 'Navigation',
      academic: 'Academic',
      contact: 'Contact',
      country: 'Brazil',
      talk: "Let's talk",
      copyright: '© 2026 Thamires M. S. All rights reserved.',
      socialLinks: [
        { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/in/eduardo-ale-amorim' },
        { label: 'GitHub', short: 'GH', href: 'https://github.com/Edu-p' },
        { label: 'Email', short: '@', href: 'mailto:eduardoaamorim0@gmail.com' },
      ],
      navigationLinks: [
        { label: 'Home', href: '#inicio' },
        { label: 'About', href: '#sobre' },
        { label: 'Academic highlights', href: '#impacto' },
        { label: 'My journey', href: '#timeline' },
        { label: 'Projects', href: '#projetos' },
        { label: 'Publications', href: '#impacto' },
      ],
    },
  },
  pt: {
    nav: {
      aria: 'Navegacao principal',
      brandAria: 'Ir para o inicio',
      menuAria: 'Abrir menu',
      talk: 'Vamos conversar',
      language: 'Idioma',
      items: {
        home: 'Inicio',
        about: 'Sobre',
        academic: 'Academico',
        journey: 'Minha jornada',
        projects: 'Projetos',
        contact: 'Contato',
      },
    },
    hero: {
      eyebrow: 'Engenheiro de IA',
      title: 'Inteligencia artificial para produtos que saem do laboratorio.',
      description:
        'Eu projeto, treino e entrego sistemas com machine learning, NLP e visao computacional, conectando pesquisa, produto e impacto real.',
      primaryCta: 'Ver meu curriculo',
      secondaryCta: 'Chamar agora',
      specialties: 'Especialidades',
      signals: ['Machine Learning', 'NLP', 'Computer Vision', 'MLOps', 'Agentes de IA'],
    },
    about: {
      imageAlt: 'Foto de Eduardo A. A.',
      eyebrow: 'Sobre mim',
      title: 'Ciencia, logica e proposito.',
      titleAccent: 'Essa e a minha formula.',
      copy:
        'Engenheiro de IA com mais de 5 anos conectando pesquisa, produto e sistemas escalaveis em nuvem. Especialista em Machine Learning, MLOps e agentes inteligentes.',
      contactAria: 'Informacoes de contato',
      location: 'Recife, PE, Brasil',
      stackEyebrow: 'Tecnologias que utilizo',
      metrics: [
        { icon: 'EXP', value: '5+', label: 'anos de experiencia' },
        { icon: 'PUB', value: '3+', label: 'publicacoes academicas' },
        { icon: 'DEV', value: '10+', label: 'projetos academicos' },
        { icon: 'TOP', value: '100%', label: 'foco em impacto e aprendizado' },
      ],
      techGroups: [
        { title: 'IA & Machine Learning', items: ['Python', 'PyTorch', 'Scikit-Learn', 'LangChain', 'LangGraph', 'LLMs', 'NLTK', 'SpaCy'] },
        { title: 'Backend & Dados', items: ['FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'pgvector', 'MongoDB', 'SQL'] },
        { title: 'Cloud & DevOps', items: ['Cloud Run', 'Cloud Build', 'Vertex AI', 'Kubeflow', 'Docker', 'Kubernetes', 'CI/CD'] },
        { title: 'Frontend & Outros', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'Linux'] },
      ],
    },
    academic: {
      eyebrow: 'Academico',
      title: 'Pesquisa que gera',
      titleAccent: 'impacto.',
      description:
        'Producao cientifica desenvolvida em temas de Inteligencia Artificial, Seguranca de IA, Processamento de Linguagem Natural e Aprendizado Federado.',
      identifyAria: 'Identidade e perfis academicos',
      publications: 'Publicacoes',
      readPaper: 'Ler artigo',
      viewCode: 'Ver codigo',
      paperUnavailable: 'Artigo ainda nao publicado.',
      codeUnavailable: 'Repositorio de codigo indisponivel para este artigo.',
      allPublications: 'Ver todas as publicacoes',
      education: 'Formacao academica',
      degree: 'Bacharelado em Ciencia da Computacao',
      period: 'Periodo',
      location: 'Local',
      educationNote: 'Graduacao concluida em 2025.',
      highlightsTitle: 'Destaques academicos',
      quoteAria: 'Citacao',
      quote: 'Buscar conhecimento e construir impacto.',
      papers: [
        {
          mark: 'SB',
          venue: 'SBSC 2026',
          track: 'AI Safety & Collaborative Systems',
          title: 'Operationalizing the Traffic Light Protocol for Native Portuguese Language Model Guardrails in Collaborative Workflows',
          event: 'SBSC 2026',
          topic: 'AI Safety & Collaborative Systems',
          authors: 'E. A. Amorim, et al.',
          summary: 'Proposta e avaliacao de um protocolo de seguranca para modelos de linguagem em portugues aplicado a fluxos colaborativos.',
          codeHref: 'https://github.com/Edu-p/traffic-light-secbert-br',
        },
        {
          mark: 'IJ',
          venue: 'IJCNN 2026',
          track: 'AI Safety & NLP',
          title: 'Robustness of Language Models against Portuguese Harmful Prompts',
          event: 'IJCNN 2026',
          topic: 'AI Safety & NLP',
          authors: 'E. A. Amorim, et al.',
          summary: 'Analise de robustez de LLMs diante de prompts prejudiciais em portugues e estrategias de mitigacao.',
          codeHref: 'https://github.com/Edu-p/secbert-pt',
        },
        {
          mark: 'VI',
          venue: 'VISAPP 2023',
          track: 'Federated Learning & Computer Vision',
          title: 'FedBID and FedDocs: A Dataset and System for Federated Document Analysis',
          event: 'VISAPP 2023',
          topic: 'Federated Learning & Computer Vision',
          authors: 'E. A. Amorim, et al.',
          summary: 'Apresentacao de um dataset e de um sistema para analise de documentos em cenario de aprendizado federado.',
          paperHref: 'https://www.scitepress.org/Papers/2023/116911/116911.pdf',
        },
      ],
      highlights: [
        { icon: 'BR', value: '1', label: 'artigo nacional' },
        { icon: 'INT', value: '2', label: 'artigos internacionais' },
        { icon: 'TOP', value: '100%', label: 'artigos aceitos' },
        { icon: 'GPA', value: '8.9/10', label: 'GPA final' },
      ],
      projectsTitle: 'Projetos',
      viewProject: 'Ver projeto',
      projects: [
        {
          icon: 'AI',
          title: 'AI Engineer - Visiting Specialist',
          period: 'set de 2024 - dez de 2024',
          summary:
            'Chatbot especializado para a Nina, capaz de detectar intencao do usuario e preencher informacoes cruciais para registrar, consultar, atualizar e deletar denuncias de assedio no Brasil.',
          skills: ['BERT', 'AWS Lambda', 'S3', 'Lex V2'],
        },
        {
          icon: 'SP',
          title: 'secbert-pt',
          period: 'Codigo do artigo IJCNN 2026',
          summary:
            'SecBERT, classificador baseado em BERTimbau para detectar prompts nocivos e jailbreak em portugues brasileiro.',
          skills: ['BERTimbau', 'AI Safety', 'NLP', 'Portugues'],
          href: 'https://github.com/Edu-p/secbert-pt',
        },
        {
          icon: 'TL',
          title: 'traffic-light-secbert-br',
          period: 'Codigo do artigo SBSC 2026',
          summary:
            'Arquitetura de referencia para implantar o SecBERT como camada de seguranca com roteamento Traffic Light.',
          skills: ['SecBERT', 'Guardrails', 'Traffic Light', 'AI Safety'],
          href: 'https://github.com/Edu-p/traffic-light-secbert-br',
        },
        {
          icon: 'WT',
          title: 'Writing Test',
          period: 'jul de 2024 - ago de 2024',
          summary:
            'Plataforma para melhorar a proficiencia em ingles de desenvolvedores usando RAG, avaliacao de respostas de LLM, metricas por usuario e feedback por teste.',
          skills: ['RAG', 'LLM', 'DeepEval', 'Langfuse'],
          href: 'https://github.com/Edu-p/writing-test',
        },
        {
          icon: 'RC',
          title: 'Reco',
          period: 'jul de 2023 - nov de 2023',
          summary:
            'Plataforma web que automatiza negociacoes de inadimplencia condominial e venceu 3 de 4 premiacoes.',
          skills: ['Automacao de negociacao', 'Plataforma web'],
          href: 'https://github.com/Edu-p/Reco',
        },
        {
          icon: 'ID',
          title: 'Intent Detection',
          period: 'Chatbot de deteccao de intencao',
          summary:
            'Chatbot que prediz intencoes de usuarios, usa BERT como modelo principal e consulta as ultimas intencoes em MongoDB via Streamlit e Flask.',
          skills: ['BERT', 'Streamlit', 'Flask', 'MongoDB'],
          href: 'https://github.com/Edu-p/intent-detection',
        },
        {
          icon: 'AM',
          title: 'Attention Mechanism',
          period: 'Estudo de deep learning',
          summary: 'Implementacao de um mecanismo de atencao com e sem PyTorch.',
          skills: ['Attention', 'PyTorch', 'Deep Learning'],
          href: 'https://github.com/Edu-p/attention-mechanism',
        },
        {
          icon: 'GC',
          title: 'Granting of Credit',
          period: 'Modelagem de credito',
          summary: 'Analise de concessao de credito combinando diferentes casos e um modelo de avaliacao.',
          skills: ['Machine Learning', 'Risco de Credito', 'Analise de Dados'],
          href: 'https://github.com/Edu-p/granting-of-credit',
        },
        {
          icon: 'SF',
          title: 'Store Sales Forecast',
          period: 'Projeto de previsao',
          summary: 'Previsao de vendas das lojas Rossmann para as proximas 6 semanas.',
          skills: ['Forecasting', 'Regression', 'Feature Engineering'],
          href: 'https://github.com/Edu-p/store-sales-forecast',
        },
        {
          icon: 'WP',
          title: 'Which Property',
          period: 'Projeto de insights',
          summary: 'Projeto de insights para ajudar a House Rocket a escolher os imoveis certos.',
          skills: ['Analise de Dados', 'Business Intelligence', 'Python'],
          href: 'https://github.com/Edu-p/WhichProperty',
        },
      ],
    },
    timeline: {
      eyebrow: 'Minha jornada',
      title: 'Linha do tempo profissional',
      controls: 'Controles da timeline',
      previous: 'Itens anteriores',
      next: 'Proximos itens',
      details: 'Abrir detalhes',
      showMore: 'Ver mais',
      items: [
        {
          period: '2025 - Presente',
          logo: 'TD',
          role: 'Senior AI Engineer',
          company: 'TELUS Digital',
          location: 'Vancouver, Canada (Remoto)',
          summary: 'Arquitetura de sistemas multi-agentes no GCP e pipelines de ML escalaveis para insights automaticos.',
          tags: ['GCP', 'Kubeflow', 'Vertex AI', 'Celery', 'Redis', 'CI/CD', 'OAuth2'],
        },
        {
          period: 'Mar 2025 - Ago 2025',
          logo: 'AT',
          role: 'AI Engineer',
          company: 'Amigo Tech',
          location: 'Brasil',
          summary: 'Desenvolvimento de agentes com LangGraph e LangChain, usando Redis e PostgreSQL com pgvector.',
          tags: ['FastAPI', 'LangGraph', 'LangChain', 'Redis', 'PostgreSQL', 'pgvector'],
        },
        {
          period: 'Fev 2023 - Mar 2025',
          logo: 'NT',
          role: 'ML Engineer',
          company: 'Neurotech',
          location: 'Brasil',
          summary: 'Modelos hibridos de ML que superaram metas anuais para banco Top 10, com lideranca tecnica em auditorias.',
          tags: ['Python', 'Scikit-Learn', 'XGBoost', 'Machine Learning', 'Feature Engineering'],
        },
        {
          period: 'Ago 2022 - Fev 2023',
          logo: 'VX',
          role: 'ML Engineer',
          company: 'Voxar Labs',
          location: 'Brasil',
          summary: 'Pesquisa em Federated Learning e deploy de modelos de deteccao em drones no Azure AKS.',
          tags: ['Flower', 'PySyft', 'Azure', 'Docker', 'Kubernetes', 'Grafana'],
        },
        {
          period: 'Abr 2021 - Jan 2022',
          logo: 'AB',
          role: 'ML Engineer',
          company: 'AiBox Lab',
          location: 'Brasil',
          summary: 'NLP para metricas de analise textual com NLTK e SpaCy, incluindo classificador com 95.1% de acuracia.',
          tags: ['NLP', 'NLTK', 'SpaCy', 'Scikit-Learn', 'Python'],
        },
      ],
    },
    contact: {
      role: 'Engenheiro de IA',
      copy: 'Transformando dados em inteligencia para criar um futuro melhor.',
      socialAria: 'Redes sociais',
      footerNavAria: 'Navegacao do rodape',
      navigation: 'Navegacao',
      academic: 'Academico',
      contact: 'Contato',
      country: 'Brasil',
      talk: 'Vamos conversar',
      copyright: '© 2026 Thamires M. S. Todos os direitos reservados.',
      socialLinks: [
        { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/in/eduardo-ale-amorim' },
        { label: 'GitHub', short: 'GH', href: 'https://github.com/Edu-p' },
        { label: 'Email', short: '@', href: 'mailto:eduardoaamorim0@gmail.com' },
      ],
      navigationLinks: [
        { label: 'Inicio', href: '#inicio' },
        { label: 'Sobre', href: '#sobre' },
        { label: 'Destaques academicos', href: '#impacto' },
        { label: 'Minha jornada', href: '#timeline' },
        { label: 'Projetos', href: '#projetos' },
        { label: 'Publicacoes', href: '#impacto' },
      ],
    },
  },
} as const

const savedLocale = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
const locale = ref<Locale>(savedLocale === 'pt' ? 'pt' : 'en')

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale.value
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale.value)
  }
})

export function useI18n() {
  const t = computed(() => messages[locale.value])

  function setLocale(nextLocale: Locale) {
    locale.value = nextLocale
  }

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'pt' : 'en'
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  }
}
