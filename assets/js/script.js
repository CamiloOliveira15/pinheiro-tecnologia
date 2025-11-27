/**
 * ARQUIVO: script.js
 * DESCRIÇÃO: Motor principal do site - VERSÃO FINAL REESCRITA E ESTÁVEL.
 * OBJETIVO: Consolidar todas as correções (Cabeçalho/Rodapé, Habilitação de Botão, Modal de Feedback)
 * e manter a funcionalidade original de projetos e animações.
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
// 2. DADOS FICTÍCIOS E CONSTANTES DA API
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
const API_URL_CONTACT = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/prod/contact";


// =================================================================
// 3. INICIALIZAÇÃO GLOBAL E ROTEAMENTO
// =================================================================

let scrollObserver;

document.addEventListener('DOMContentLoaded', () => {
    // 1. GARANTE QUE OS COMPONENTES BÁSICOS (HEADER/FOOTER) CARREGUEM PRIMEIRO
    renderComponents(); 
    
    // 2. Lógica de Roteamento e Inicialização de Página
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
        initContactPage(); 
    }
    
    // 3. Inicializa listeners do modal de projetos (deve ser chamada em todas as páginas)
    initModalListeners();
});


// =================================================================
// FUNÇÕES DE INJEÇÃO E UTILIDADE GLOBAL
// =================================================================

function renderComponents() {
    const appHeader = document.getElementById('app-header');
    if (appHeader) appHeader.innerHTML = COMPONENTS.header;

    const appFooter = document.getElementById('app-footer');
    if (appFooter) {
        appFooter.innerHTML = COMPONENTS.footer;
        updateFooterYear(); 
    }
}

function updateFooterYear() {
    const yearSpan = document.getElementById('dynamic-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function setActiveMenuItem() {
    // [Lógica completa de setActiveMenuItem - Mantida]
    let path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path.endsWith('.html')) {
        path = path.substring(0, path.lastIndexOf('/')) + path.substring(path.lastIndexOf('/'), path.length).replace('.html', '');
    }
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
    // [Lógica completa de initMobileMenu - Mantida]
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
    
    document.addEventListener('click', (e) => {
        if (navWrapper.classList.contains('open') && !navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu(false);
            }
        });
    });
}

function injectStructuredData() {
    // [Lógica completa de injectStructuredData - Mantida]
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
    // [Lógica completa de initScrollAnimations - Mantida]
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
        elementsToAnimate.forEach(el => el.classList.add('is-visible'));
    }
}


// =================================================================
// 4. LÓGICA DE MODAL DE PROJETOS (Mantida)
// =================================================================

const modal = { 
    // [Lógica completa de Modal de Projetos - Mantida]
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
        
        this.tabs = document.querySelectorAll('.modal-tab-button');
        this.panels = document.querySelectorAll('.tab-content > .tab-panel'); 
        
        this.panels.forEach(p => p.classList.remove('active'));


        const closeButton = document.getElementById('modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) this.close();
        });

        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.handleTabClick(tab));
        });
    },

    handleTabClick(clickedTab) {
        const parentContainer = clickedTab.closest('.modal-info-section');
        if (!parentContainer) return;

        const allTabs = parentContainer.querySelectorAll('.modal-tab-button');
        const allPanels = parentContainer.querySelectorAll('.tab-content > .tab-panel');

        allTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1'); 
        });

        allPanels.forEach(p => p.classList.remove('active'));

        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');
        clickedTab.setAttribute('tabindex', '0');

        const targetId = clickedTab.getAttribute('data-target');
        const targetPanel = parentContainer.querySelector(`#${targetId}`);

        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    },

    open(project) {
        if (!this.overlay) this.init();

        this.title.textContent = project.title || 'Detalhes do Projeto';
        let src = project.iframeSrc || '';
        
        if (src.includes('youtube.com') || src.includes('youtu.be')) {
            const videoIdMatch = src.match(/(?:v=|youtu\.be\/|\/embed\/)([^&?\/]+)/);
            if (videoIdMatch && videoIdMatch[1]) {
                src = `https://www.youtube-nocookie.com/embed/${videoIdMatch[1]}?rel=0`; 
            }
        }
        
        this.iframe.src = src;

        const setData = (id, content) => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = content || '<p style="color:#999; font-style:italic;">Conteúdo não disponível.</p>';
        };

        const d = project.data || {};
        setData('tab-descricao', d.descricao);
        setData('tab-objetivos', d.objetivos);
        setData('tab-metricas', d.metricas);
        setData('tab-tecnologias', d.tecnologias);
        setData('tab-detalhes', d.detalhes);
        setData('tab-fontes', d.fontes);

        const firstTab = this.tabs[0];
        if (firstTab) {
            this.handleTabClick(firstTab); 
        }

        this.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    },

    close() {
        this.overlay.classList.add('hidden');
        if (this.iframe) {
            this.iframe.src = '';
        }
        document.body.style.overflow = 'auto'; 
    }
};

function initModalListeners() { modal.init(); }
function openModal(p) { modal.open(p); }


// =================================================================
// 6. LÓGICA DE PROJETOS (Index e Projetos)
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
        return filterHidden ? MOCK_PROJECTS.filter(p => !p.hidden) : MOCK_PROJECTS;
    }
}

async function initIndexPage() {
    const gridId = 'project-grid-dynamic';
    const projects = await fetchProjects();
    const grid = document.getElementById(gridId);

    if (grid) {
        grid.innerHTML = '';
        projects.slice(0, 4).forEach(p => createCard(p, grid));
    }
    const loader = document.getElementById('project-loader');
    if (loader) loader.classList.add('hidden');
}

async function initProjetosPage() {
    const projects = await fetchProjects();

    const categories = {
        'data-analysis': 'grid-data-analysis',
        'apps': 'grid-apps',
        'automation': 'grid-automation',
        'other': 'grid-other'
    };

    const groupedProjects = { 'data-analysis': [], 'apps': [], 'automation': [], 'other': [] };

    projects.forEach(p => {
        const categoryKey = p.category && categories.hasOwnProperty(p.category) ? p.category : 'other';
        groupedProjects[categoryKey].push(p);
    });

    for (const key in categories) {
        const gridId = categories[key];
        const grid = document.getElementById(gridId);
        const projectsInGroup = groupedProjects[key];
        const section = grid ? grid.closest('.project-category-page') : null;

        if (grid) {
            grid.innerHTML = '';
        }

        if (projectsInGroup && projectsInGroup.length > 0 && grid) {
            projectsInGroup.forEach(p => createCard(p, grid));
            if (section) section.style.display = 'block';
        } else {
            if (section) section.style.display = 'none';
        }
    }

    document.querySelectorAll('.loader-text').forEach(l => l.classList.add('hidden'));
}

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
    card.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project);
    });
    
    container.appendChild(card);

    if (scrollObserver) scrollObserver.observe(card);
}


// =================================================================
// 7. LÓGICA DE FEEDBACK (Modal de Mensagens)
// =================================================================

const messageModal = {
    // [Lógica completa de MessageModal - Mantida]
    overlay: null,
    okButton: null,
    closeButton: null,
    timerDisplay: null,
    timerInterval: null,
    TIMEOUT_SECONDS: 5,

    init() {
        this.overlay = document.getElementById('success-modal');
        if (!this.overlay) return;

        this.okButton = document.getElementById('success-ok-button');
        this.closeButton = document.getElementById('success-close-button');
        this.timerDisplay = document.getElementById('success-timer');
        
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

    open(type, title, mainMessage, detailMessage) {
        if (!this.overlay) {
            console.error("Message modal not found in DOM.");
            return;
        }

        this.titleElement.textContent = title;
        this.messageElement.textContent = mainMessage;
        this.detailElement.textContent = detailMessage;

        const errorColor = 'var(--color-error)';
        const successColor = 'var(--color-success)';
        
        const buttonColor = type === 'success' ? successColor : 'var(--primary-color-accessible)'; 
        const visualColor = type === 'success' ? successColor : errorColor;

        this.headerElement.style.borderBottomColor = visualColor;
        this.titleElement.style.color = visualColor;
        this.svgElement.style.stroke = visualColor;
        this.okButton.style.backgroundColor = buttonColor;
        
        this.okButton.classList.remove('hidden');

        if (type === 'success') {
            this.svgElement.innerHTML = `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4L12 14.01l-3-3"></path>`;
            this.okButton.textContent = `OK (Fechando em ${this.TIMEOUT_SECONDS}s)`;
        } else {
            this.svgElement.innerHTML = `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line>`;
            this.okButton.textContent = 'OK';
        }
        
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

function initMessageModal() { messageModal.init(); } 


// =================================================================
// 8. LÓGICA DO FORMULÁRIO DE CONTATO
// =================================================================

// Funções de Controle de Estado do Formulário
function showFormMessage(message, type) {
    const msgElement = document.getElementById('form-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.classList.remove('hidden', 'success', 'error', 'warning');
        msgElement.classList.add(type); 
        msgElement.classList.remove('hidden');
        msgElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (!x[2]) {
            e.target.value = !x[1] ? '' : '(' + x[1];
        } else {
            e.target.value = !x[3] ? '(' + x[1] + ') ' + x[2] : '(' + x[1] + ') ' + x[2] + '-' + x[3];
        }
    });
}

function initContactFormCounter() {
    const form = document.getElementById('contact-form-main');
    const submitButton = document.getElementById('contact-submit-btn');
    const textArea = document.getElementById('message');
    const counterDisplay = document.getElementById('char-count-text'); 
    
    if (!form || !submitButton) return;

    const maxLength = parseInt(textArea?.getAttribute('maxlength'), 10) || 250;

    const checkFormValidity = () => {
        const requiredFields = form.querySelectorAll('[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                isFormValid = false;
            }
        });
        submitButton.disabled = !isFormValid;
    };
    
    const updateCharCountAndValidate = () => {
        if (textArea && counterDisplay) {
            const currentLength = textArea.value.length;
            counterDisplay.textContent = `${currentLength} / ${maxLength}`;
            
            if (currentLength >= maxLength) {
                counterDisplay.style.color = 'var(--color-error)';
            } else {
                counterDisplay.style.color = '#666';
            }
        }
        checkFormValidity();
    };

    // Adiciona listeners para atualizar a contagem e a validação em qualquer campo
    form.addEventListener('input', updateCharCountAndValidate); 
    
    // CORREÇÃO CRÍTICA: Inicializa o estado do botão na carga da página
    updateCharCountAndValidate(); 
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const msgElement = document.getElementById('form-message');
    
    const originalBtnText = 'Enviar Mensagem'; 
    
    btn.disabled = true;
    btn.innerText = 'Enviando...';
    
    if(msgElement) msgElement.classList.add('hidden');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(API_URL_CONTACT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            
            // TRATAMENTO DE ERROS DE LIMITE E VALIDAÇÃO DA LAMBDA (DIV INTERNA)
            if (response.status === 429 || response.status === 400 || response.status === 500) {
                const message = errorData?.message || errorData?.error || "Ocorreu um erro. Tente novamente.";
                const type = (response.status === 429) ? "warning" : "error";
                showFormMessage(message, type);
            } 
            // Outros erros HTTP (404, etc.)
            else {
                 showFormMessage("Erro HTTP inesperado. Tente novamente.", "error");
            }
            return;
        }
        
        // SUCESSO (200 OK) - MODAL POP-UP
        messageModal.open('success', 
            'Mensagem Enviada!', 
            'Sua solicitação foi enviada com sucesso.',
            'Agradecemos o seu contato! Em breve, um especialista entrará em contato pelo e-mail ou telefone fornecido.'
        ); 
        
        event.target.reset();

    } catch (error) {
        // ERRO CRÍTICO (Falha de Rede/Conexão) - MODAL POP-UP SUAVE
        console.error("Erro Crítico de Conexão:", error);
        
        messageModal.open('error',
            'Algo Deu Errado!', 
            'Não foi possível finalizar o envio da mensagem.', 
            'Pode ser uma instabilidade temporária na conexão ou no servidor. Por favor, tente novamente em alguns minutos ou use o WhatsApp para um contato imediato.'
        );
        
    } finally {
        // Restaura o botão (seja após sucesso, erro interno ou erro crítico)
        setTimeout(() => {
            btn.innerText = originalBtnText;
            initContactFormCounter(); // Garante o estado correto do botão (desabilitado se vazio)
        }, 500);
    }
}

function initContactPage() {
    const contactForm = document.getElementById('contact-form-main');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Inicialização da lógica de validação e modais de mensagens
    initContactFormCounter();
    initPhoneMask();
    initMessageModal(); 
}


// =================================================================
// FUNÇÕES DE ADMIN (Mantidas - Sem necessidade de reescrita)
// =================================================================

async function fetchProjects(filterHidden = true) {
    // [função fetchProjects - Mantida]
    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
        let data = await response.json();
        if (filterHidden) data = data.filter(p => !p.hidden);
        return data;
    } catch (e) {
        console.warn("Falha ao buscar projetos da API. Usando dados locais (Fallback)", e);
        return filterHidden ? MOCK_PROJECTS.filter(p => !p.hidden) : MOCK_PROJECTS;
    }
}
async function initProjetosPage() {
    // [função initProjetosPage - Mantida]
    const projects = await fetchProjects();
    const categories = {
        'data-analysis': 'grid-data-analysis',
        'apps': 'grid-apps',
        'automation': 'grid-automation',
        'other': 'grid-other'
    };
    const groupedProjects = { 'data-analysis': [], 'apps': [], 'automation': [], 'other': [] };
    projects.forEach(p => {
        const categoryKey = p.category && categories.hasOwnProperty(p.category) ? p.category : 'other';
        groupedProjects[categoryKey].push(p);
    });
    for (const key in categories) {
        const gridId = categories[key];
        const grid = document.getElementById(gridId);
        const projectsInGroup = groupedProjects[key];
        const section = grid ? grid.closest('.project-category-page') : null;
        if (grid) { grid.innerHTML = ''; }
        if (projectsInGroup && projectsInGroup.length > 0 && grid) {
            projectsInGroup.forEach(p => createCard(p, grid));
            if (section) section.style.display = 'block';
        } else {
            if (section) section.style.display = 'none';
        }
    }
    document.querySelectorAll('.loader-text').forEach(l => l.classList.add('hidden'));
}
// [Restante das funções de Admin/Login - Mantidas]
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    if (localStorage.getItem('authToken')) {
        window.location.href = 'admin.html';
    }
}
async function handleLoginSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('login-submit-btn');
    const username = document.getElementById('username').value;
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    
    console.warn("MODO FICTÍCIO: Bypass do Cognito ativado.");
    if (!username) {
        showLoginMessage("Por favor, insira um e-mail.", "error");
        btn.disabled = false;
        btn.textContent = 'Entrar';
        return;
    }
    showLoginMessage("Login fictício realizado!", "success");
    localStorage.setItem('authToken', 'fake-dev-token');
    localStorage.setItem('userEmail', username);
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1000);
}
function showLoginMessage(message, type) {
    const msgElement = document.getElementById('login-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `form-message ${type}`;
        msgElement.classList.remove('hidden');
    }
}
function initAdminPage() {
    checkAdminAuth();
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }
    const cancelBtn = document.getElementById('project-cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetProjectForm);
    }
    fetchProjectsForAdmin();
}
function checkAdminAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const userEmail = localStorage.getItem('userEmail');
    const emailSpan = document.getElementById('admin-user-email');
    if (emailSpan && userEmail) {
        emailSpan.textContent = userEmail;
    }
}
function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}
async function fetchProjectsForAdmin() {
    const listContainer = document.getElementById('project-list-container');
    const loader = document.getElementById('project-list-loader');
    if (!listContainer || !loader) return;
    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        populateAdminList(projects);
    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin): Carregando projetos fictícios.");
        loader.textContent = "Carregando projetos fictícios...";
        setTimeout(() => {
            populateAdminList(MOCK_PROJECTS);
            loader.classList.add('hidden');
        }, 500);
    }
}
function populateAdminList(projects) {
    const listContainer = document.getElementById('project-list-container');
    listContainer.innerHTML = '';
    if (!projects || projects.length === 0) {
        listContainer.innerHTML = '<p>Nenhum projeto publicado.</p>';
        return;
    }
    projects.forEach(project => {
        const listItem = document.createElement('div');
        listItem.className = 'project-list-item';
        listItem.dataset.projectId = project.id;
        
        const hiddenBadge = project.hidden ? ' <span style="color:red; font-size:0.8em;">(Oculto)</span>' : '';
        listItem.innerHTML = `
            <span class="project-list-title">${project.title} <b>(${project.category || 'N/A'})</b>${hiddenBadge}</span>
            <div class="project-list-actions">
                <button class="project-list-button edit" data-id="${project.id}">Editar</button>
                <button class="project-list-button delete" data-id="${project.id}">Excluir</button>
            </div>
        `;
        const editBtn = listItem.querySelector('.edit');
        editBtn.onclick = () => handleEditProject(project);
        const deleteBtn = listItem.querySelector('.delete');
        deleteBtn.onclick = () => handleDeleteProject(project.id, project.title);
        listContainer.appendChild(listItem);
    });
}
async function handleProjectSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('project-submit-btn');
    btn.disabled = true;
    const projectId = document.getElementById('project-id').value;
    const project = {
        title: document.getElementById('project-title').value,
        category: document.getElementById('project-category').value, 
        thumbnailSrc: document.getElementById('project-thumbnail').value,
        iframeSrc: document.getElementById('project-iframe-src').value,
        embedTitle: document.getElementById('project-embed-title').value,
        tabsToShow: document.getElementById('project-tabs-to-show').value,
        data: {
            descricao: document.getElementById('tab-descricao').value,
            objetivos: document.getElementById('tab-objetivos').value,
            metricas: document.getElementById('tab-metricas').value,
            tecnologias: document.getElementById('tab-tecnologias').value,
            detalhes: document.getElementById('tab-detalhes').value,
            fontes: document.getElementById('tab-fontes').value
        }
    };
    const method = projectId ? 'PUT' : 'POST';
    const url = projectId ? `${API_URL_PUT_PROJECT}/${projectId}` : API_URL_POST_PROJECT;
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(project)
        });
        if (!response.ok) throw new Error('Falha ao salvar.');
        showAdminMessage('Projeto salvo com sucesso!', 'success');
        resetProjectForm();
        fetchProjectsForAdmin(); 
    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin Submit):", error.message);
        showAdminMessage("MODO FICTÍCIO: Simulação de projeto salvo!", "success");
        if (projectId) {
            const index = MOCK_PROJECTS.findIndex(p => p.id === projectId);
            if (index !== -1) {
                MOCK_PROJECTS[index] = { ...MOCK_PROJECTS[index], ...project, id: projectId };
            }
        } else {
            MOCK_PROJECTS.push({ ...project, id: `mock-${Date.now()}` });
        }
        populateAdminList(MOCK_PROJECTS); 
        resetProjectForm();
    } finally {
        btn.disabled = false;
        btn.textContent = 'Salvar Projeto';
    }
}
function handleEditProject(project) {
    document.getElementById('project-id').value = project.id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-category').value = project.category || 'other'; 
    document.getElementById('project-thumbnail').value = project.thumbnailSrc;
    document.getElementById('project-iframe-src').value = project.iframeSrc;
    document.getElementById('project-embed-title').value = project.embedTitle;
    document.getElementById('project-tabs-to-show').value = project.tabsToShow || '';
    const data = project.data || {};
    document.getElementById('tab-descricao').value = data.descricao || '';
    document.getElementById('tab-objetivos').value = data.objetivos || '';
    document.getElementById('tab-metricas').value = data.metricas || '';
    document.getElementById('tab-tecnologias').value = data.tecnologias || '';
    document.getElementById('tab-detalhes').value = data.detalhes || '';
    document.getElementById('tab-fontes').value = data.fontes || '';
    document.getElementById('form-title').textContent = 'Editar Projeto';
    document.getElementById('project-cancel-btn').classList.remove('hidden');
    window.scrollTo(0, document.getElementById('project-form').offsetTop);
}
function resetProjectForm() {
    document.getElementById('project-form').reset();
    document.getElementById('project-id').value = '';
    document.getElementById('form-title').textContent = 'Adicionar Novo Projeto';
    document.getElementById('project-cancel-btn').classList.add('hidden');
}
async function handleDeleteProject(id, title) {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
        return;
    }
    const url = `${API_URL_DELETE_PROJECT}/${id}`;
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error('Falha ao excluir.');
        showAdminMessage('Projeto excluído com sucesso!', 'success');
        fetchProjectsForAdmin(); 
    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin Delete):", error.message);
        showAdminMessage("MODO FICTÍCIO: Simulação de projeto excluído!", 'error');
        const index = MOCK_PROJECTS.findIndex(p => p.id === id);
        if (index !== -1) {
            MOCK_PROJECTS.splice(index, 1);
        }
        populateAdminList(MOCK_PROJECTS); 
    }
}
function showAdminMessage(message, type) {
    const msgElement = document.getElementById('admin-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `form-message ${type}`;
        msgElement.classList.remove('hidden');
        setTimeout(() => {
            msgElement.classList.add('hidden');
        }, 5000);
    }
}