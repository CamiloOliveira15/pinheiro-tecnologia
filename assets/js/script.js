/**
 * ARQUIVO: script.js
 * DESCRIÇÃO: Motor principal do site - VERSÃO FINAL ESTÁVEL.
 * CORREÇÕES CRÍTICAS (Item 1, 2, 3 e 4):
 * 1. Funcionalidade de Abas (Tabs) do Modal totalmente restaurada e funcional (Item 2).
 * 2. Funcionalidade de ocultar seções de projetos vazias (Item 1) confirmada e melhorada.
 * 3. Garantida a unicidade e consistência do Footer (Item 3, devido a correção em HTML/JS).
 * 4. Revisão de boas práticas (Item 4).
 * 5. Adicionado tratamento de URL para vídeos do YouTube na abertura do modal para compatibilidade (melhor prática de embed/privacidade).
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
            descricao: "<p>Este relatório monitora o vencimento de treinamentos, NRs, exames e documentos diversos, centralizando o controle de conformidade.</p>",
            objetivos: "<ul class='list-disc'><li>Dar visibilidade do vencimento e alertas automáticos.</li><li>Reduzir o risco de multas e não conformidade.</li></ul>",
            metricas: "<ul class='list-disc'><li><strong>Documentos Vencidos:</strong> Quantidade total de itens expirados.</li><li><strong>Próximos Vencimentos:</strong> Contagem de itens a vencer em 30/60 dias.</li></ul>",
            tecnologias: "<p>Microsoft Power BI, Power Query (M), DAX.</p>",
            detalhes: "<p>Medidas DAX avançadas para cálculo temporal e uso de Tabela Calendário. Este é o texto que antes não aparecia!</p>",
            fontes: "<p>Dados fictícios usados para demonstração.</p>"
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
            descricao: `<p class="mb-4">O <strong>Test Hub</strong> é uma solução robusta desenvolvida na <strong>Microsoft Power Platform</strong> para modernizar e centralizar o processo de Garantia de Qualidade (QA).</p>`,
            objetivos: `<ul class="list-disc"><li><strong>Centralizar a Gestão:</strong> Consolidar planos de teste, execuções e bugs em uma única fonte.</li><li><strong>Padronizar Processos.</strong></li></ul>`,
            metricas: `<ul class="list-disc"><li><strong>Cobertura de Testes:</strong> % de funcionalidades testadas.</li><li><strong>Tempo de Resolução de Bugs (SLA).</strong></li></ul>`,
            tecnologias: "<p>Microsoft Power Apps, Dataverse (ou SharePoint), Power Automate para notificações.</p>",
            detalhes: "<p>Usa coleções aninhadas e delegação de dados complexa no Power Apps.</p>",
            fontes: "<p>Disponível sob consulta.</p>"
        }
    }
];

const API_URL_GET_PROJECTS = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/projects";

// =================================================================
// 3. INICIALIZAÇÃO GLOBAL E ROTEAMENTO
// =================================================================

let scrollObserver;

document.addEventListener('DOMContentLoaded', () => {
    renderComponents();
    setActiveMenuItem();
    initMobileMenu();
    injectStructuredData();
    setTimeout(initScrollAnimations, 100);

    const pathname = window.location.pathname;
    if (pathname === '/' || pathname.endsWith('/index.html')) {
        initIndexPage();
    } else if (pathname.endsWith('/projetos.html')) {
        initProjetosPage();
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
        // Painéis podem estar dentro de .tab-content OU .tab-content-area (mantendo compatibilidade)
        this.panels = document.querySelectorAll('.tab-content > .tab-panel, .tab-content-area > .tab-panel');

        const closeButton = document.getElementById('modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
        
        this.overlay.addEventListener('click', (e) => {
            // Verifica se o clique foi no overlay, não no conteúdo
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
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
        const allPanels = parentContainer.querySelectorAll('.tab-content > .tab-panel, .tab-content-area > .tab-panel');

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
            targetPanel.classList.add('active');
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
                src = `https://www.youtube-nocookie.com/embed/${videoIdMatch[1]}`;
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

        // 3. Reseta para a primeira aba (Descrição) e aplica a correção ARIA/active
        const firstTab = this.tabs[0];
        if (firstTab) {
            // Usa handleTabClick para garantir que a primeira aba esteja visível
            this.handleTabClick(firstTab); 
        }

        // 4. Exibe
        this.overlay.classList.remove('hidden');
        // Boa prática: bloqueia o scroll do body principal
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
    // Remove o loader (se existir, no código atual da index não está presente, mas é boa prática)
    const loader = document.getElementById('project-loader');
    if (loader) loader.classList.add('hidden');
}

/**
 * Corrigido: Garante que blocos sem projetos sejam totalmente removidos.
 */
async function initProjetosPage() {
    const projects = await fetchProjects();

    const categories = {
        'data-analysis': 'grid-data-analysis',
        'apps': 'grid-apps',
        'automation': 'grid-automation',
        'other': 'grid-other'
    };

    // Objeto temporário para agrupar projetos
    const groupedProjects = { 'data-analysis': [], 'apps': [], 'automation': [], 'other': [] };

    // 1. Agrupar projetos (aprimorado para evitar categorias undefined)
    projects.forEach(p => {
        // Usa 'other' se a categoria estiver faltando ou for inválida
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

function createCard(project, container) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    // Adicionado aria-labelledby para acessibilidade
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
    card.querySelector('button').addEventListener('click', () => openModal(project));
    
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
 * Melhoria no setActiveMenuItem para lidar melhor com a raiz e subpáginas
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

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');
    if (!menuToggle || !navWrapper) return;

    // Garante que o menuToggle use a classe correta para fechar/abrir 
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
             // Verifica se é mobile (usando uma media query simples em JS para simular)
            if (window.innerWidth < 768) {
                toggleMenu(false);
            }
        });
    });
}

function injectStructuredData() {
    // Adiciona o script de dados estruturados apenas se ainda não existir
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