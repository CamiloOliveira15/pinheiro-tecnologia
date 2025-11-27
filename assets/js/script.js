/**
 * ARQUIVO: script.js
 * DESCRIÇÃO: Motor principal do site - VERSÃO FINAL ESTÁVEL.
 * CORREÇÕES CRÍTICAS NO MODAL:
 * 1. Garantida a exibição do conteúdo da primeira aba ao abrir o modal.
 * 2. Lógica de ativação/desativação de abas (Tabs) totalmente funcional.
 * 3. Tratamento de URLs de vídeo (YouTube) para modo de privacidade e compatibilidade.
 * 4. Implementação de Modal de Sucesso com temporizador para o formulário de Contato.
 * 5. Integração do formulário de Contato com o endpoint real da AWS Lambda.
 * 6. NOVO: Uso do Modal de Sucesso (Refatorado para "MessageModal") para Erros Críticos de Conexão.
 */

// =================================================================
// 1. DADOS DOS COMPONENTES (HTML Centralizado)
// =================================================================

const COMPONENTS = {
    header: `
    <nav class="main-nav">
        <div class="container nav-container">
            <a href="/" class="nav-logo-link" aria-label="Página Inicial - Pinheiro Tecnologia">
                <img src="images/Logo Branco - Pinheiro Tecnologia.png" alt="Pinheiro Tecnologia - Soluções em Dados" class="nav-logo" width="180" height="30">
            </a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir Menu Principal">
                <svg viewBox="0 0 100 80" width="25" height="20" fill="white">
                    <rect width="100" height="15" rx="8"></rect>
                    <rect y="30" width="100" height="15" rx="8"></rect>
                    <rect y="60" width="100" height="15" rx="8"></rect>
                </svg>
            </button>
            <div class="nav-menu-wrapper" id="mobile-menu">
                <ul class="nav-links">
                    <li><a href="/" data-link="home">Início</a></li>
                    <li><a href="/projetos.html" data-link="projetos">Projetos</a></li>
                    <li><a href="/sobre.html" data-link="sobre">Sobre Nós</a></li>
                    <li><a href="/contato.html" data-link="contato">Contato</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `,
    footer: `
    <footer class="main-footer">
        <div class="container">
            <p>Pinheiro Tecnologia &copy; <span id="dynamic-year"></span> - Todos os direitos reservados.</p>
        </div>
    </footer>
    `
};

// =================================================================
// 2. DADOS FICTÍCIOS (MOCK_PROJECTS) - DETALHES COMPLETOS PARA TESTE DAS ABAS
// =================================================================

const MOCK_PROJECTS = [
    {
        id: "mock-1",
        title: "Projeto 1: Controle de vencimento",
        category: "data-analysis",
        hidden: false,
        thumbnailSrc: "images/relatorio_vencimentos.webp",
        iframeSrc: "https://app.powerbi.com/view?r=eyJrIjoiMWRjOGIyMTItNTkxMS00MTYxLWFkYmQtOGU0MDdiOGQxNmJlIiwidCI6IjMyMjEyYTc5LWYzMWEtNGIwYS1hZjE0LTY4YzFjYTUyMGVmNSJ9",
        embedTitle: "Dashboard Interativo (Power BI)",
        data: {
            descricao: "<p>Este relatório monitora o vencimento de treinamentos, NRs, exames e documentos diversos, centralizando o controle de conformidade.</p><p>O Power BI permite filtros por colaborador, requisito e status, facilitando a gestão proativa de vencimentos e a redução de riscos regulatórios.</p>",
            objetivos: "<ul class='list-disc'><li>Dar visibilidade do vencimento e alertas automáticos.</li><li>Reduzir o risco de multas e não conformidade, assegurando que todos os requisitos estejam sempre em dia.</li><li>Centralizar informações dispersas em um único painel acessível.</li></ul>",
            metricas: "<ul class='list-disc'><li><strong>Documentos Vencidos:</strong> Quantidade total de itens expirados.</li><li><strong>Próximos Vencimentos:</strong> Contagem de itens a vencer em 30/60 dias.</li><li><strong>Taxa de Conformidade:</strong> Percentual de colaboradores com todos os documentos válidos.</li></ul>",
            tecnologias: "<p>Microsoft Power BI, Power Query (M), DAX (Data Analysis Expressions).</p>",
            detalhes: "<p>Medidas DAX avançadas para cálculo temporal e uso de Tabela Calendário. Implementação de segurança em nível de linha (RLS) para restrição de acesso por gerente.</p>",
            fontes: "<p>Conexão a dados em nuvem (SharePoint Online). Dados fictícios usados para demonstração.</p>"
        }
    },
    {
        id: "mock-2",
        title: "Projeto 2: Hub de testes de desenvolvimento",
        category: "apps",
        hidden: false,
        thumbnailSrc: "images/Test-Hub.webp",
        iframeSrc: "https://www.youtube.com/embed/o8CvaeNNycs",
        embedTitle: "Demonstração em Vídeo (Power Apps)",
        data: {
            descricao: `<p class="mb-4">O <strong>Test Hub</strong> é uma solução robusta desenvolvida na <strong>Microsoft Power Platform</strong> para modernizar e centralizar o processo de Garantia de Qualidade (QA).</p><p>Permite que desenvolvedores e analistas gerenciem planos de teste, executem casos e registrem bugs de forma eficiente, melhorando a rastreabilidade do processo.</p>`,
            objetivos: `<ul class="list-disc"><li><strong>Centralizar a Gestão:</strong> Consolidar planos de teste, execuções e bugs em uma única fonte.</li><li><strong>Padronizar Processos:</strong> Impor uma metodologia de testes consistente entre equipes.</li><li><strong>Agilizar a Comunicação:</strong> Notificações automáticas para bugs reportados e resoluções.</li></ul>`,
            metricas: `<ul class="list-disc"><li><strong>Cobertura de Testes:</strong> % de funcionalidades testadas por versão.</li><li><strong>Tempo de Resolução de Bugs (SLA).</strong></li><li><strong>Taxa de Sucesso dos Testes.</strong></li></ul>`,
            tecnologias: "<p>Microsoft Power Apps (Canvas App), Dataverse (ou SharePoint), Power Automate para notificações e integrações.</p>",
            detalhes: "<p>Usa coleções aninhadas e delegação de dados complexa no Power Apps para otimizar o desempenho. Integração com Azure DevOps para sincronização de itens de trabalho (work items).</p>",
            fontes: "<p>Disponível sob consulta. Demonstração em vídeo. Fonte de dados principal é o Dataverse.</p>"
        }
    }
];

const API_URL_GET_PROJECTS = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/projects";
// NOVO: URL REAL DO ENDPOINT DE CONTATO (Baseado no ARN da Lambda)
const API_URL_CONTACT = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/prod/contact";


// =================================================================
// 3. INICIALIZAÇÃO GLOBAL E ROTEAMENTO
// =================================================================

let scrollObserver;

document.addEventListener('DOMContentLoaded', () => {
    renderComponents();
    setActiveMenuItem();
    initMobileMenu();
    injectStructuredData();
    initScrollAnimations();

    const pathname = window.location.pathname;
    if (pathname === '/' || pathname.endsWith('/index.html')) {
        initIndexPage();
    } else if (pathname.endsWith('/projetos.html')) {
        initProjetosPage();
    } else if (pathname.endsWith('/contato.html')) {
        initContactForm(); // Inicialização do formulário de contato com a nova lógica
    }
    
    // Inicializa listeners do modal para todas as páginas que o contém
    initModalListeners();
});


// =================================================================
// 4. LÓGICA DE MODAL E ABAS (CORRIGIDA)
// =================================================================

const modal = {
    overlay: null,
    iframe: null,
    title: null,
    tabs: [],
    panels: [],

    init() {
        this.overlay = document.getElementById('modal-overlay');
        if (!this.overlay) return;
        this.iframe = document.getElementById('modal-iframe');
        this.title = document.getElementById('modal-title');
        
        // Seletores unificados para compatibilidade com index.html e projetos.html
        this.tabs = document.querySelectorAll('.modal-tab-button');
        // Seleção robusta dos painéis de conteúdo
        this.panels = document.querySelectorAll('.tab-content > .tab-panel'); // Apenas o seletor mais limpo
        
        // Desativa a classe 'active' de todos os painéis na inicialização
        this.panels.forEach(p => p.classList.remove('active'));


        const closeButton = document.getElementById('modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
        
        this.overlay.addEventListener('click', (e) => {
            // Fecha se o clique foi no overlay
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            // Fecha com a tecla Escape
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) this.close();
        });

        // Configura o handler de clique para as abas
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.handleTabClick(tab));
        });
    },

    /**
     * @description Gerencia o clique da aba, ativando o conteúdo e atualizando ARIA/tabindex.
     * @param {HTMLElement} clickedTab O botão da aba que foi clicado.
     */
    handleTabClick(clickedTab) {
        // Encontra o container pai para garantir que só as abas deste modal sejam afetadas
        const parentContainer = clickedTab.closest('.modal-info-section');
        if (!parentContainer) return;

        // Seleciona todas as abas e painéis dentro deste container
        const allTabs = parentContainer.querySelectorAll('.modal-tab-button');
        const allPanels = parentContainer.querySelectorAll('.tab-content > .tab-panel');

        // 1. Desativa todos os botões e painéis
        allTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1'); 
        });

        allPanels.forEach(p => p.classList.remove('active'));

        // 2. Ativa o botão clicado
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');
        clickedTab.setAttribute('tabindex', '0'); // Torna o botão ativo navegável por teclado

        // 3. Ativa o painel correspondente (USANDO data-target)
        const targetId = clickedTab.getAttribute('data-target');
        const targetPanel = parentContainer.querySelector(`#${targetId}`);

        if (targetPanel) {
            targetPanel.classList.add('active'); // O CSS usa esta classe para 'display: block'
        }
    },

    open(project) {
        if (!this.overlay) this.init();

        // 1. Preenche Título e Embed
        this.title.textContent = project.title || 'Detalhes do Projeto';
        let src = project.iframeSrc || '';
        
        // CORREÇÃO DE BOAS PRÁTICAS: Helper para usar youtube-nocookie.com
        if (src.includes('youtube.com') || src.includes('youtu.be')) {
            const videoIdMatch = src.match(/(?:v=|youtu\.be\/|\/embed\/)([^&?\/]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                src = `https://www.youtube-nocookie.com/embed/${videoIdMatch[1]}?rel=0`; // rel=0 para evitar vídeos relacionados
            }
        }
        
        this.iframe.src = src;

        // 2. Popula Abas com o Data do Projeto 
        const setData = (id, content) => {
            const el = document.getElementById(id);
            // Verifica se o elemento existe antes de tentar atribuir
            if (el) el.innerHTML = content || '<p style="color:#999; font-style:italic;">Conteúdo não disponível.</p>';
        };

        const d = project.data || {};
        setData('tab-descricao', d.descricao);
        setData('tab-objetivos', d.objetivos);
        setData('tab-metricas', d.metricas);
        setData('tab-tecnologias', d.tecnologias);
        setData('tab-detalhes', d.detalhes);
        setData('tab-fontes', d.fontes);

        // 3. Ativa a primeira aba (Descrição)
        const firstTab = this.tabs[0];
        if (firstTab) {
            // Usa handleTabClick para garantir que a primeira aba esteja visível e ARIA atualizado
            this.handleTabClick(firstTab); 
        }

        // 4. Exibe
        this.overlay.classList.remove('hidden');
        // Boa prática: bloqueia o scroll do body principal para melhor foco no modal
        document.body.style.overflow = 'hidden'; 
    },

    close() {
        this.overlay.classList.add('hidden');
        // BOA PRÁTICA: Limpa o src do iframe para parar a execução (vídeo, áudio, Power Apps em segundo plano)
        if (this.iframe) {
            this.iframe.src = '';
        }
        // Restaura o scroll do body
        document.body.style.overflow = 'auto'; 
    }
};

function initModalListeners() { modal.init(); }
function openModal(p) { modal.open(p); }

// =================================================================
// 5. LÓGICA DE DADOS, UI E ANIMAÇÃO
// =================================================================

async function fetchProjects(filterHidden = true) {
    // Mantido o mock para os projetos, pois o endpoint real (API_URL_GET_PROJECTS) não foi confirmado.
    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
        let data = await response.json();
        if (filterHidden) data = data.filter(p => !p.hidden);
        return data;
    } catch (e) {
        console.warn("Falha ao buscar projetos da API. Usando dados locais (Fallback)", e);
        // Garante que o fallback respeite o filtro 'hidden'
        return filterHidden ? MOCK_PROJECTS.filter(p => !p.hidden) : MOCK_PROJECTS;
    }
}

async function initIndexPage() {
    const gridId = 'project-grid-dynamic';
    const projects = await fetchProjects();
    const grid = document.getElementById(gridId);

    if (grid) {
        grid.innerHTML = '';
        // Exibe apenas os primeiros 4 projetos na página inicial
        projects.slice(0, 4).forEach(p => createCard(p, grid));
    }
    const loader = document.getElementById('project-loader');
    if (loader) loader.classList.add('hidden');
}

/**
 * Garante que blocos sem projetos sejam totalmente removidos na página projetos.html.
 */
async function initProjetosPage() {
    const projects = await fetchProjects();

    const categories = {
        'data-analysis': 'grid-data-analysis',
        'apps': 'grid-apps',
        'automation': 'grid-automation',
        'other': 'grid-other'
    };

    const groupedProjects = { 'data-analysis': [], 'apps': [], 'automation': [], 'other': [] };

    // 1. Agrupar projetos (aprimorado para evitar categorias undefined)
    projects.forEach(p => {
        const categoryKey = p.category && categories.hasOwnProperty(p.category) ? p.category : 'other';
        groupedProjects[categoryKey].push(p);
    });

    // 2. Limpar, popular e verificar visibilidade
    for (const key in categories) {
        const gridId = categories[key];
        const grid = document.getElementById(gridId);
        const projectsInGroup = groupedProjects[key];
        // Encontra a seção pai para ocultar o bloco inteiro 
        const section = grid ? grid.closest('.project-category-page') : null;

        if (grid) {
            grid.innerHTML = ''; // Limpa o grid
        }

        if (projectsInGroup && projectsInGroup.length > 0 && grid) {
            // Se houver projetos, popular e garantir que a seção esteja visível
            projectsInGroup.forEach(p => createCard(p, grid));
            if (section) section.style.display = 'block';
        } else {
            // Se não houver projetos, garantir que a seção esteja oculta 
            if (section) section.style.display = 'none';
        }
    }

    // Oculta todos os loaders de texto
    document.querySelectorAll('.loader-text').forEach(l => l.classList.add('hidden'));
}

/**
 * Cria um card de projeto e anexa o listener para abrir o modal.
 */
function createCard(project, container) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `project-title-${project.id}`);

    const placeholder = 'https://placehold.co/600x400/1A6A6C/ffffff?text=Pinheiro+Tecnologia';

    card.innerHTML = `
        <img src="${project.thumbnailSrc}" alt="Capa do projeto ${project.title}" class="project-thumbnail" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='${placeholder}';" 
            width="340" height="200">
        <div class="project-card-content">
            <h3 id="project-title-${project.id}">${project.title}</h3>
            <button class="project-card-button" aria-label="Ver detalhes de ${project.title}">Ver Projeto</button>
        </div>
    `;
    // Listener de clique no botão para abrir o modal
    card.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Evita o clique acidental no card se ele tiver outro listener
        openModal(project);
    });
    
    // Adiciona o card ao container
    container.appendChild(card);

    // Observa o card para animação
    if (scrollObserver) scrollObserver.observe(card);
}

function renderComponents() {
    const appHeader = document.getElementById('app-header');
    if (appHeader) appHeader.innerHTML = COMPONENTS.header;

    const appFooter = document.getElementById('app-footer');
    if (appFooter) {
        appFooter.innerHTML = COMPONENTS.footer;
        const yearSpan = document.getElementById('dynamic-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Atualiza o item ativo na barra de navegação com base na URL.
 */
function setActiveMenuItem() {
    // Normaliza o caminho: remove trailing slash e '.html' (exceto na raiz)
    let path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path.endsWith('.html')) {
        path = path.substring(0, path.lastIndexOf('/')) + path.substring(path.lastIndexOf('/'), path.length).replace('.html', '');
    }
    
    // Se o path for vazio ou apenas '/index', trata como a raiz '/'
    if (path === '' || path.endsWith('/index')) {
        path = '/';
    }

    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        let href = link.getAttribute('href').toLowerCase().replace(/\/$/, '');
        
        if (href === '/index.html') {
            href = '/';
        } else if (href.endsWith('.html')) {
            href = href.substring(0, href.lastIndexOf('/')) + href.substring(href.lastIndexOf('/'), href.length).replace('.html', '');
        }

        if (path === href) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Inicializa a funcionalidade do menu sanduíche para dispositivos móveis.
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');
    if (!menuToggle || !navWrapper) return;

    const toggleMenu = (expand) => {
        if (expand) {
            navWrapper.classList.add('open');
            document.body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            navWrapper.classList.remove('open');
            document.body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = navWrapper.classList.contains('open');
        toggleMenu(!isExpanded);
    });
    
    // Fecha o menu se clicar fora
    document.addEventListener('click', (e) => {
        if (navWrapper.classList.contains('open') && !navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Fecha o menu se um link for clicado (apenas em mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu(false);
            }
        });
    });
}

/**
 * Injeta dados estruturados no cabeçalho para otimização SEO.
 */
function injectStructuredData() {
    if (document.querySelector('script[type="application/ld+json"]')) return;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Pinheiro Tecnologia",
        "url": "https://pinheirotecnologia.com",
        "logo": "https://pinheirotecnologia.com/images/Logo_Pinheiro_Tecnologia.png",
        "sameAs": ["https://www.linkedin.com/in/camilo-pinheiro/"]
    };
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
}

/**
 * Inicializa as animações de rolagem (Intersection Observer).
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .service-card, .project-card');
    elementsToAnimate.forEach(el => el.classList.add('animate-on-scroll'));

    if ('IntersectionObserver' in window) {
        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        elementsToAnimate.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback: mostra todos se a API não estiver disponível
        elementsToAnimate.forEach(el => el.classList.add('is-visible'));
    }
}

// =================================================================
// 6. LÓGICA DE MODAL DE MENSAGENS (Sucesso e Erro Crítico)
// =================================================================

const messageModal = {
    overlay: null,
    okButton: null,
    closeButton: null,
    timerDisplay: null,
    timerInterval: null,
    TIMEOUT_SECONDS: 5,

    init() {
        // O modal de sucesso do contato.html agora é usado para todas as mensagens.
        this.overlay = document.getElementById('success-modal');
        if (!this.overlay) return;

        this.okButton = document.getElementById('success-ok-button');
        this.closeButton = document.getElementById('success-close-button');
        this.timerDisplay = document.getElementById('success-timer');
        
        // Elementos dinâmicos
        this.titleElement = this.overlay.querySelector('#success-title');
        this.messageElement = this.overlay.querySelector('.modal-body.success-body p:nth-child(2)');
        this.detailElement = this.overlay.querySelector('.modal-body.success-body p:nth-child(3)');
        this.svgElement = this.overlay.querySelector('.modal-body.success-body svg');
        this.headerElement = this.overlay.querySelector('.modal-header');

        this.okButton.addEventListener('click', () => this.close(true));
        this.closeButton.addEventListener('click', () => this.close(true));
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close(true);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) this.close(true);
        });
    },

    /**
     * Abre o modal com conteúdo e estilo dinâmicos.
     * @param {string} type 'success' | 'error'
     * @param {string} title Título principal (e.g., "Mensagem Enviada!")
     * @param {string} mainMessage Mensagem principal (e.g., "Sua solicitação foi enviada.")
     * @param {string} detailMessage Mensagem de detalhe (e.g., "Aguarde nosso contato.")
     */
    open(type, title, mainMessage, detailMessage) {
        if (!this.overlay) {
            console.error("Message modal not found in DOM.");
            return;
        }

        // 1. Configura conteúdo dinâmico
        this.titleElement.textContent = title;
        this.messageElement.textContent = mainMessage;
        this.detailElement.textContent = detailMessage;

        // 2. Configura estilo dinâmico
        // Usa a cor primária para um design mais agradável, mesmo no erro,
        // mas mantém o tom de erro no ícone.
        const errorColor = 'var(--color-error)';
        const successColor = 'var(--color-success)';
        const color = type === 'success' ? successColor : 'var(--primary-color-accessible)'; // Usa a cor principal para o erro para ser mais sutil
        const headerColor = type === 'success' ? successColor : errorColor; // Mantém a borda vermelha suave para alertar

        this.headerElement.style.borderBottomColor = headerColor;
        this.titleElement.style.color = color;
        
        // O ícone usa a cor de erro suave para chamar a atenção
        this.svgElement.style.stroke = type === 'success' ? successColor : errorColor;
        this.okButton.style.backgroundColor = color;
        
        this.okButton.classList.remove('hidden');

        // 3. Define ícone SVG (Checkmark para sucesso, ! para erro)
        if (type === 'success') {
            this.svgElement.innerHTML = `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4L12 14.01l-3-3"></path>`;
            this.okButton.textContent = `OK (Fechando em ${this.TIMEOUT_SECONDS}s)`;
        } else { // 'error' - NOVO ÍCONE DE ALERTA (Sinal de exclamação)
            this.svgElement.innerHTML = `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line>`;
            this.okButton.textContent = 'OK';
        }
        
        // 4. Exibe e inicia temporizador (apenas se for sucesso ou para erros críticos)
        this.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 

        if (type === 'success') {
            let timeRemaining = this.TIMEOUT_SECONDS;
            this.timerDisplay.textContent = timeRemaining;
            
            clearInterval(this.timerInterval);
            
            this.timerInterval = setInterval(() => {
                timeRemaining--;
                this.timerDisplay.textContent = timeRemaining;

                if (timeRemaining <= 0) {
                    this.close(false); 
                }
            }, 1000);
        } else {
            // Para erros, o botão "OK" é o único mecanismo de fechamento.
            this.okButton.textContent = 'OK';
            this.timerDisplay.textContent = '';
            clearInterval(this.timerInterval);
        }
    },

    close(forceClose) {
        clearInterval(this.timerInterval);
        
        if (this.overlay && !this.overlay.classList.contains('hidden')) {
            this.overlay.classList.add('hidden');
            document.body.style.overflow = 'auto'; 
        }

        if (forceClose || !forceClose) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};

function initMessageModal() { messageModal.init(); } // Novo inicializador

// =================================================================
// 7. LÓGICA DO FORMULÁRIO DE CONTATO
// =================================================================

function initContactForm() {
    const form = document.getElementById('contact-form-main');
    const messageTextarea = document.getElementById('message');
    const charCountDisplay = document.getElementById('char-count-text');
    const submitButton = document.getElementById('contact-submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    if (!form || !messageTextarea || !charCountDisplay || !submitButton) {
        return;
    }

    // Inicializa o novo modal unificado
    initMessageModal();

    const MAX_LENGTH = parseInt(messageTextarea.getAttribute('maxlength'), 10) || 250;
    
    /**
     * @description Exibe a mensagem de erro/aviso na div interna do formulário.
     * @param {string} message 
     * @param {string} type 'error', 'warning'
     */
    function displayFormMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.classList.remove('hidden', 'success', 'error', 'warning');
        // Usa a classe CSS "error" para ambos os tipos para consistência visual na div interna
        messageDiv.classList.add(type); 
    }
    
    /**
     * Atualiza o contador de caracteres e garante que não exceda o limite.
     */
    function updateCharCount() {
        let currentLength = messageTextarea.value.length;
        
        if (currentLength > MAX_LENGTH) {
            messageTextarea.value = messageTextarea.value.substring(0, MAX_LENGTH);
            currentLength = MAX_LENGTH;
        }

        charCountDisplay.textContent = `${currentLength} / ${MAX_LENGTH}`;
        
        if (currentLength === MAX_LENGTH) {
            // Usa a variável CSS para a cor de erro
            charCountDisplay.style.color = 'var(--color-error)'; 
        } else {
            charCountDisplay.style.color = '#666'; 
        }

        checkFormValidity();
    }

    /**
     * Verifica se todos os campos requeridos estão preenchidos.
     */
    function checkFormValidity() {
        const requiredFields = form.querySelectorAll('[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isFormValid = false;
            }
        });
        
        // O botão é habilitado APENAS se todos os campos requeridos forem válidos
        submitButton.disabled = !isFormValid;
    }
    
    updateCharCount();

    messageTextarea.addEventListener('input', updateCharCount);
    form.addEventListener('input', checkFormValidity);

    // Lógica de envio do formulário (Chamada real à API)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (submitButton.disabled) {
            return;
        }

        // Prepara o estado de envio
        messageDiv.classList.add('hidden');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Coleta os dados do formulário
        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(API_URL_CONTACT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (response.ok) { // Status 200
                // SUCESSO: Usa o modal de sucesso
                messageModal.open('success', 
                    'Mensagem Enviada!', 
                    'Sua solicitação foi enviada com sucesso.',
                    'Agradecemos o seu contato! Em breve, um especialista entrará em contato pelo e-mail ou telefone fornecido.'
                ); 
                
                form.reset();
                updateCharCount();
                
            } else if (response.status === 429) { 
                // AVISO: Limite de envios (Rate Limit ou Mensagens Abertas da Lambda)
                const errorMessage = result.message || "Limite de envios excedido. Tente novamente mais tarde.";
                displayFormMessage(errorMessage, 'warning'); // Exibe na div interna
                
            } else if (response.status >= 400 && response.status < 500) {
                 // ERRO: Erros de Validação (400)
                const errorMessage = result.error || "Dados inválidos. Por favor, verifique os campos.";
                displayFormMessage(errorMessage, 'error'); // Exibe na div interna
                
            } else { 
                // ERRO: Erros do Servidor (500)
                const errorMessage = result.error || "Erro interno do servidor. Tente novamente.";
                console.error("API Error:", response.status, result);
                displayFormMessage(errorMessage, 'error'); // Exibe na div interna
            }

        } catch (error) {
            // ERRO CRÍTICO: Falha de conexão/fetch (atende diretamente à sua solicitação)
            console.error('Fetch error:', error);
            messageModal.open('error',
                'Algo Deu Errado!', // Título mais suave
                'Não foi possível finalizar o envio da mensagem.', // Mensagem principal neutra
                'Pode ser uma instabilidade temporária na conexão ou no servidor. Por favor, tente novamente em alguns minutos ou use o WhatsApp para um contato imediato.' // Detalhe construtivo
            );
            
        } finally {
            // Restaura o botão de envio se não for sucesso
            if (messageDiv.classList.contains('hidden') || messageDiv.classList.contains('warning') || messageDiv.classList.contains('error')) {
                submitButton.textContent = 'Enviar Mensagem';
                checkFormValidity();
            }
        }
    });
}