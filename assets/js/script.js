/**
 * Lógica do Site - script.js (Versão Híbrida - Fictícia/API)
 *
 * Este script agora inclui dados fictícios (MOCK_PROJECTS)
 * para desenvolvimento e fallback quando a API não está disponível.
 * [MODIFICADO] Adicionada lógica de categorização de projetos.
 * [MODIFICADO] Limita os projetos na index.html para 6.
 */

// =================================================================
// DADOS FICTÍCIOS (PARA DESENVOLVIMENTO)
// =================================================================
const MOCK_PROJECTS = [
    {
      id: "mock-1",
      title: "Projeto 1: Análise de Vendas (Fictício)",
      category: "data-analysis", // Categoria
      thumbnailSrc: "images/sales-dashboard.png",
      iframeSrc: "https://app.powerbi.com/view?r=eyJrIjoiYjk2ZWM1YTgtYzU4OC00NDUzLTk3ODAtZTk4MTM2N2IxZDhjIiwidCI6IjMyMjEyYTc5LWYzMWEtNGIwYS1hZjE0LTY4YzFjYTUyMGVmNSJ9&pageName=ReportSection645babf0189088ba3194",
      embedTitle: "Dashboard Interativo",
      tabsToShow: "",
      data: {
        descricao: "<p>Este é um dashboard fictício carregado localmente...</p>",
        objetivos: "<ul class='list-disc'><li>Monitorar o faturamento...</li></ul>",
        metricas: "<ul class='list-disc'><li><strong>Faturamento Total (R$)</strong>...</li></ul>",
        tecnologias: "<p>O processo de ETL foi realizado no Power Query...</p>",
        detalhes: "<pre class='code-block'><code>Vendas YTD = ...</code></pre>",
        fontes: "<p>Dados sintéticos de vendas B2B...</p>"
      }
    },
    {
      id: "mock-2",
      title: "Projeto 2: Análise Imobiliária (Fictício)",
      category: "data-analysis", // Categoria
      thumbnailSrc: "images/relatorio-imobiliaria.png",
      iframeSrc: "",
      embedTitle: "Análise de Portfólio de Obras",
      tabsToShow: "",
      data: {
        descricao: "<p>Análise do setor imobiliário, focada em VGV...</p>",
        objetivos: "<ul class='list-disc'><li>Acompanhar VGV por projeto.</li></ul>",
        metricas: "<p>(WIP) Métricas...</p>",
        tecnologias: "<p>(WIP) Tecnologias...</p>",
        detalhes: "<p>(WIP) Detalhes...</p>",
        fontes: "<p>(WIP) Fontes...</p>"
      }
    },
    {
      id: "mock-3",
      title: "Projeto 3: Demo de App (Vídeo Fictício)",
      category: "apps", // Categoria
      thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Demo+App",
      iframeSrc: "https://www.youtube.com/embed/",
      embedTitle: "Demonstração em Vídeo",
      tabsToShow: "modal-descricao,modal-objetivos,modal-fontes",
      data: {
        descricao: "<p>Este é um vídeo demonstrativo de um aplicativo...</p>",
        objetivos: "<ul class='list-disc'><li>Digitalizar processo manual...</li></ul>",
        metricas: "",
        tecnologias: "",
        detalhes: "",
        fontes: "<p>Construído com Power Apps e Power Automate.</p>"
      }
    },
    {
        id: "mock-4",
        title: "Projeto 4: Automação de Faturas (Fictício)",
        category: "automation", // Categoria
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Automação",
        iframeSrc: "https://www.youtube.com/embed/", // Usando vídeo placeholder
        embedTitle: "Demo de Automação",
        tabsToShow: "modal-descricao,modal-objetivos",
        data: {
          descricao: "<p>Demonstração de um fluxo do Power Automate que lê e-mails, extrai anexos (faturas) e os lança num sistema ERP.</p>",
          objetivos: "<ul class='list-disc'><li>Eliminar entrada manual de dados.</li><li>Reduzir erros e tempo de processamento.</li></ul>",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
    },
    {
        id: "mock-5",
        title: "Projeto 5: Análise de RH (Fictício)",
        category: "data-analysis", // Categoria
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Dashboard+RH",
        iframeSrc: "https://app.powerbi.com/view?r=eyJrIjoiOGUwZTEzZjYtODllOC00NDllLWFmMTYtZTA5M2ViN2YxOGFkIiwidCI6IjMyMjEyYTc5LWYzMWEtNGIwYS1hZjE0LTY4YzFjYTUyMGVmNSJ9",
        embedTitle: "Dashboard Interativo",
        tabsToShow: "",
        data: {
          descricao: "<p>Dashboard de Análise de Recursos Humanos.</p>",
          objetivos: "<ul class='list-disc'><li>Analisar Turnover.</li></ul>",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
      },
      {
        id: "mock-6",
        title: "Projeto 6: App de Inspeção (Fictício)",
        category: "apps", // Categoria
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=App+Inspeção",
        iframeSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        embedTitle: "Demonstração em Vídeo",
        tabsToShow: "modal-descricao,modal-objetivos",
        data: {
          descricao: "<p>Aplicativo de inspeção de campo para técnicos.</p>",
          objetivos: "<ul class='list-disc'><li>Registrar inspeções offline.</li></ul>",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
      },
      {
        id: "mock-7",
        title: "Projeto 7: Outro Projeto (Fictício)",
        category: "other", // Categoria
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Outro+Projeto",
        iframeSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        embedTitle: "Demonstração",
        tabsToShow: "modal-descricao",
        data: {
          descricao: "<p>Este é um projeto de outra categoria.</p>",
          objetivos: "",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
      }
  ];

// =================================================================
// CONSTANTES DA API (Deixe como está para o futuro)
// =================================================================
// ... (Nenhuma mudança aqui)
const API_URL_GET_PROJECTS = "URL_DA_SUA_API_AQUI/projects";
const API_URL_POST_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_PUT_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_DELETE_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_CONTACT = "URL_DA_SUA_API_AQUI/contact";
const COGNITO_USER_POOL_ID = "SEU_USER_POOL_ID";
const COGNITO_CLIENT_ID = "SEU_CLIENT_ID";

// =================================================================
// INICIALIZAÇÃO GLOBAL
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    const page = document.body.id || window.location.pathname;

    if (page.includes('index.html') || page === '/' || page.endsWith('/')) {
        initIndexPage();
    } else if (page.includes('projetos.html')) { // Rota para página de projetos
        initProjetosPage();
    } else if (page.includes('sobre.html')) {
        initSobrePage();
    } else if (page.includes('contato.html')) {
        initContatoPage();
    } else if (page.includes('login.html')) {
        initLoginPage();
    } else if (page.includes('admin.html')) {
        initAdminPage();
    }

    updateFooterYear();
});

function updateFooterYear() {
    // ... (Nenhuma mudança aqui)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const yearSpanFooter = document.getElementById('current-year-footer');
    if (yearSpanFooter) {
        yearSpanFooter.textContent = new Date().getFullYear();
    }
}

// =================================================================
// PÁGINA INICIAL (index.html)
// =================================================================

function initIndexPage() {
    fetchProjectsForIndex();
    initModalListeners(); // Listeners globais do modal
    initClientCarousel();
}

function initClientCarousel() {
    // ... (Nenhuma mudança aqui)
    const track = document.getElementById('client-carousel-track');
    if (!track) return;
    const logos = track.querySelectorAll('.client-logo');
    if (logos.length === 0) return;
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
    const totalWidth = (logos.length * 2) * (150 + 32);
    track.style.width = `${totalWidth}px`;
}


/**
 * Busca os projetos da API e popula o grid da Index.
 * [MODIFICADO] Limita os projetos a 6.
 */
async function fetchProjectsForIndex() {
    const gridId = 'project-grid-dynamic';
    const loader = document.getElementById('project-loader');
    if (!document.getElementById(gridId) || !loader) return;

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const projects = await response.json();
        
        // [MODIFICADO] Limita a 6 projetos na página inicial
        populateProjectGrid(gridId, projects.slice(0, 6)); 
        loader.classList.add('hidden');

    } catch (error) {
        console.warn("MODO FICTÍCIO (Index): Falha ao buscar API. Carregando MOCK_PROJECTS.", error.message);
        loader.textContent = "Carregando projetos fictícios...";
        
        setTimeout(() => {
            // [MODIFICADO] Limita a 6 projetos na página inicial
            populateProjectGrid(gridId, MOCK_PROJECTS.slice(0, 6)); 
            loader.classList.add('hidden');
        }, 500);
    }
}

// =================================================================
// PÁGINA DE PROJETOS (projetos.html)
// =================================================================

function initProjetosPage() {
    fetchProjectsForCategorization();
    initModalListeners(); // Listeners globais do modal
}

/**
 * Busca todos os projetos e os distribui nas grades de categoria.
 */
async function fetchProjectsForCategorization() {
    const loaders = {
        data: document.getElementById('loader-data-analysis'),
        apps: document.getElementById('loader-apps'),
        automation: document.getElementById('loader-automation'),
        other: document.getElementById('loader-other')
    };

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const projects = await response.json();
        
        // Distribui os projetos
        distributeProjects(projects);

    } catch (error) {
        console.warn("MODO FICTÍCIO (Projetos): Falha ao buscar API. Carregando MOCK_PROJECTS.", error.message);
        Object.values(loaders).forEach(loader => {
            if(loader) loader.textContent = "Carregando projetos fictícios...";
        });

        setTimeout(() => {
            distributeProjects(MOCK_PROJECTS);
        }, 500);
    } finally {
        // Esconde todos os loaders
        Object.values(loaders).forEach(loader => {
            if(loader) loader.classList.add('hidden');
        });
    }
}

/**
 * Filtra e popula os projetos nas grades corretas.
 */
function distributeProjects(projects) {
    const dataProjects = projects.filter(p => p.category === 'data-analysis');
    const appProjects = projects.filter(p => p.category === 'apps');
    const autoProjects = projects.filter(p => p.category === 'automation');
    const otherProjects = projects.filter(p => !['data-analysis', 'apps', 'automation'].includes(p.category) || !p.category);

    populateProjectGrid('grid-data-analysis', dataProjects);
    populateProjectGrid('grid-apps', appProjects);
    populateProjectGrid('grid-automation', autoProjects);
    populateProjectGrid('grid-other', otherProjects);
}


// =================================================================
// FUNÇÃO REUTILIZÁVEL DE POPULAR O GRID
// =================================================================

/**
 * Insere os projetos (da API ou fictícios) no HTML.
 */
function populateProjectGrid(gridElementId, projects) {
    const grid = document.getElementById(gridElementId);
    if (!grid) {
        return; 
    }
    
    grid.innerHTML = ''; // Limpa o grid

    if (!projects || projects.length === 0) {
        grid.innerHTML = '<p class="empty-grid-message">Nenhum projeto encontrado nesta categoria.</p>';
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectData = JSON.stringify(project);

        card.innerHTML = `
            <img src="${project.thumbnailSrc}" alt="Miniatura do ${project.title}" class="project-thumbnail" onerror="handleImageError(this, '${project.title}')">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <button class="project-card-button" aria-label="Ver detalhes do ${project.title}">Ver Projeto</button>
            </div>
        `;
        
        card.querySelector('.project-card-button').addEventListener('click', () => {
            openModal(project);
        });

        grid.appendChild(card);
    });
}

function handleImageError(img, title) {
    // ... (Nenhuma mudança aqui)
    const placeholder = document.createElement('div');
    placeholder.className = 'project-thumbnail-placeholder';
    placeholder.textContent = title || 'Pré-visualização indisponível';
    if (img.parentNode) {
        img.parentNode.replaceChild(placeholder, img);
    }
}

// =================================================================
// PÁGINA SOBRE (sobre.html)
// =================================================================

function initSobrePage() {
    // Nenhuma lógica JS específica
}

// =================================================================
// PÁGINA DE CONTATO (contato.html)
// =================================================================

function initContatoPage() {
    // ... (Nenhuma mudança aqui)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleContactSubmit(event) {
    // ... (Nenhuma mudança aqui, exceto simulação de sucesso)
    event.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const msgElement = document.getElementById('form-message');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try {
        const response = await fetch(API_URL_CONTACT, { /* ... */ });
        if (!response.ok) throw new Error('Falha no envio.');
        showFormMessage('Mensagem enviada com sucesso!', 'success');
        event.target.reset();
    } catch (error) {
        console.warn("MODO FICTÍCIO (Contato):", error.message);
        showFormMessage("MODO FICTÍCIO: Simulação de envio com sucesso!", "success");
        event.target.reset();
    } finally {
        btn.disabled = false;
        btn.textContent = 'Enviar Mensagem';
    }
}

function showFormMessage(message, type) {
    // ... (Nenhuma mudança aqui)
    const msgElement = document.getElementById('form-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `form-message ${type}`;
        msgElement.classList.remove('hidden');
    }
}

// =================================================================
// PÁGINA DE LOGIN (login.html)
// =================================================================

function initLoginPage() {
    // ... (Nenhuma mudança aqui)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    if (localStorage.getItem('authToken')) {
        window.location.href = 'admin.html';
    }
}

async function handleLoginSubmit(event) {
    // ... (Nenhuma mudança aqui, lógica fictícia mantida)
    event.preventDefault();
    const btn = document.getElementById('login-submit-btn');
    const username = document.getElementById('username').value;
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    
    console.warn("MODO FICTÍCIO: Bypass do Cognito ativado.");
    if (!username) {
        showLoginMessage("Por favor, insira um e-mail (pode ser fictício).", "error");
        btn.disabled = false;
        btn.textContent = 'Entrar';
        return;
    }
    showLoginMessage("Login fictício realizado com sucesso! Redirecionando...", "success");
    localStorage.setItem('authToken', 'fake-dev-token');
    localStorage.setItem('userEmail', username);
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1000);
}

function showLoginMessage(message, type) {
    // ... (Nenhuma mudança aqui)
    const msgElement = document.getElementById('login-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `form-message ${type}`;
        msgElement.classList.remove('hidden');
    }
}


// =================================================================
// PÁGINA ADMIN (admin.html)
// =================================================================

function initAdminPage() {
    // ... (Nenhuma mudança aqui)
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
    // ... (Nenhuma mudança aqui)
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.warn("Acesso negado, redirecionando para login.");
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
    // ... (Nenhuma mudança aqui)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

async function fetchProjectsForAdmin() {
    // ... (Nenhuma mudança aqui, modo fictício mantido)
    const listContainer = document.getElementById('project-list-container');
    const loader = document.getElementById('project-list-loader');
    if (!listContainer || !loader) return;
    try {
        const response = await fetch(API_URL_GET_PROJECTS, { /* ... */ });
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        populateAdminList(projects);
    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin):", error.message);
        loader.textContent = "API não encontrada. Carregando projetos fictícios...";
        setTimeout(() => {
            populateAdminList(MOCK_PROJECTS);
            loader.classList.add('hidden');
        }, 500);
    }
}

function populateAdminList(projects) {
    // ... (Nenhuma mudança aqui)
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
        listItem.innerHTML = `
            <span class="project-list-title">${project.title} <b>(${project.category || 'N/A'})</b></span>
            <div class="project-list-actions">
                <button class="project-list-button edit" data-id="${project.id}">Editar</button>
                <button class="project-list-button delete" data-id="${project.id}">Excluir</button>
            </div>
        `;
        listItem.querySelector('.edit').addEventListener('click', () => handleEditProject(project));
        listItem.querySelector('.delete').addEventListener('click', () => handleDeleteProject(project.id, project.title));
        listContainer.appendChild(listItem);
    });
}

/**
 * Manipula o envio do formulário de projeto (Criar ou Atualizar).
 */
async function handleProjectSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('project-submit-btn');
    btn.disabled = true;

    // 1. Coleta os dados do formulário
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
    
    // ... (Lógica de API/Fictícia)
    const method = projectId ? 'PUT' : 'POST';
    const url = projectId ? `${API_URL_PUT_PROJECT}/${projectId}` : API_URL_POST_PROJECT;
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(project)
        });
        if (!response.ok) throw new Error('Falha ao salvar o projeto.');
        showAdminMessage('Projeto salvo com sucesso!', 'success');
        resetProjectForm();
        fetchProjectsForAdmin(); 

    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin Submit):", error.message);
        showAdminMessage("MODO FICTÍCIO: Simulação de projeto salvo!", "success");
        
        // Simulação de atualização da lista de MOCK
        if (projectId) {
            // Editar
            const index = MOCK_PROJECTS.findIndex(p => p.id === projectId);
            if (index !== -1) {
                MOCK_PROJECTS[index] = { ...MOCK_PROJECTS[index], ...project, id: projectId };
            }
        } else {
            // Adicionar
            MOCK_PROJECTS.push({ ...project, id: `mock-${Date.now()}` });
        }
        populateAdminList(MOCK_PROJECTS); // Atualiza a lista da UI

        resetProjectForm();
    } finally {
        btn.disabled = false;
        btn.textContent = 'Salvar Projeto';
    }
}

/**
 * Preenche o formulário para edição.
 */
function handleEditProject(project) {
    // ... (Nenhuma mudança aqui)
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

/**
 * Reseta o formulário de projeto para o estado de "Adicionar Novo".
 */
function resetProjectForm() {
    // ... (Nenhuma mudança aqui)
    document.getElementById('project-form').reset();
    document.getElementById('project-id').value = '';
    document.getElementById('form-title').textContent = 'Adicionar Novo Projeto';
    document.getElementById('project-cancel-btn').classList.add('hidden');
}

/**
 * Manipula a exclusão de um projeto.
 */
async function handleDeleteProject(id, title) {
    // ... (Nenhuma mudança aqui, modo fictício mantido)
    if (!confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
        return;
    }
    const url = `${API_URL_DELETE_PROJECT}/${id}`;
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error('Falha ao excluir.');
        showAdminMessage('Projeto excluído com sucesso!', 'success');
        fetchProjectsForAdmin(); // Atualiza a lista
    } catch (error) {
        console.warn("MODO FICTÍCIO (Admin Delete):", error.message);
        showAdminMessage("MODO FICTÍCIO: Simulação de projeto excluído!", 'error');
        
        // Simulação de exclusão do MOCK
        const index = MOCK_PROJECTS.findIndex(p => p.id === id);
        if (index !== -1) {
            MOCK_PROJECTS.splice(index, 1);
        }
        populateAdminList(MOCK_PROJECTS); // Atualiza a lista da UI
    }
}

function showAdminMessage(message, type) {
    // ... (Nenhuma mudança aqui)
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


// =================================================================
// MODAL DE PROJETO (Lógica Global)
// =================================================================
// ... (Nenhuma mudança aqui)

let modalOverlay, modalContent, modalCloseButton, modalTitle, modalEmbedTitle, modalIframe;
let modalTabButtons, modalTabPanels;
let lastFocusedElement;

function initModalListeners() {
    modalOverlay = document.getElementById('modal-overlay');
    if (!modalOverlay) return; 

    modalContent = modalOverlay.querySelector('.modal-content');
    modalCloseButton = document.getElementById('modal-close-button');
    modalTitle = document.getElementById('modal-title');
    modalEmbedTitle = document.getElementById('modal-embed-title');
    modalIframe = document.getElementById('modal-iframe');
    
    modalTabButtons = document.querySelectorAll('.modal-tab-button');
    modalTabPanels = document.querySelectorAll('.modal-tab-panel');

    modalCloseButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    modalTabButtons.forEach(button => {
        button.addEventListener('click', () => handleTabClick(button));
    });

    modalContent.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;
        const focusableElements = modalContent.querySelectorAll(
            'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    });
}

function openModal(project) {
    if (!modalOverlay) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title || 'Título do Projeto';
    modalEmbedTitle.textContent = project.embedTitle || 'Conteúdo Interativo';
    modalIframe.src = project.iframeSrc || '';

    const data = project.data || {};
    const panelMap = {
        'modal-descricao': data.descricao || '<p>Descrição não disponível.</p>',
        'modal-objetivos': data.objetivos || '<p>Objetivos não disponíveis.</p>',
        'modal-metricas': data.metricas || '<p>Métricas não disponíveis.</p>',
        'modal-tratamento': data.tecnologias || '<p>Informações não disponíveis.</p>',
        'modal-dax': data.detalhes || '<p>Informações não disponíveis.</p>',
        'modal-fontes': data.fontes || '<p>Fontes não disponíveis.</p>',
    };

    modalTabPanels.forEach(panel => {
        panel.innerHTML = panelMap[panel.id] || '<p>Conteúdo indisponível.</p>';
    });

    const tabsToShowAttr = project.tabsToShow;
    if (tabsToShowAttr) {
        const tabsToShow = tabsToShowAttr.split(',');
        modalTabButtons.forEach(tab => {
            tab.style.display = tabsToShow.includes(tab.dataset.tab) ? 'block' : 'none';
        });
    } else {
        modalTabButtons.forEach(tab => {
            tab.style.display = 'block';
        });
    }

    resetTabs();
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalCloseButton.focus();
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('hidden');
    modalIframe.src = '';
    document.body.style.overflow = 'auto';
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function handleTabClick(button) {
    const targetPanelId = button.dataset.tab;
    modalTabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    modalTabPanels.forEach(panel => panel.classList.add('hidden'));
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }
}

function resetTabs() {
    const firstVisibleTab = Array.from(modalTabButtons).find(tab => tab.style.display !== 'none');
    modalTabButtons.forEach(button => {
        const panelId = button.dataset.tab;
        const panel = document.getElementById(panelId);
        if (panel) {
            if (firstVisibleTab && button === firstVisibleTab) {
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                panel.classList.remove('hidden');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-selected', 'false');
                panel.classList.add('hidden');
            }
        }
    });
}