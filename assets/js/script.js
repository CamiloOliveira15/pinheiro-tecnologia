/**
 * Lógica do Site - script.js (Versão Híbrida - Fictícia/API)
 *
 * Este script agora inclui dados fictícios (MOCK_PROJECTS)
 * para desenvolvimento e fallback quando a API não está disponível.
 * [MODIFICADO] Adicionada lógica de categorização de projetos.
 * [MODIFICADO] Limita os projetos na index.html para 6.
 * [MODIFICADO] Refatoração para Embed automático de YouTube (Simplificado).
 * [MODIFICADO] Adicionado suporte para ocultar projetos via propriedade 'hidden: true'.
 */

// =================================================================
// DADOS FICTÍCIOS (PARA DESENVOLVIMENTO)
// =================================================================
const MOCK_PROJECTS = [
    {
      id: "mock-1",
      title: "Projeto 1: Controle de vencimento",
      category: "data-analysis",
      thumbnailSrc: "images/relatorio_vencimentos.png",
      iframeSrc: "https://app.powerbi.com/view?r=eyJrIjoiMWRjOGIyMTItNTkxMS00MTYxLWFkYmQtOGU0MDdiOGQxNmJlIiwidCI6IjMyMjEyYTc5LWYzMWEtNGIwYS1hZjE0LTY4YzFjYTUyMGVmNSJ9",
      embedTitle: "Dashboard Interativo",
      tabsToShow: "",
      data: {
        descricao: "<p>Este relatório monitora o vencimento de treinamentos, NRs, exames e documentos diversos.</p>",
        objetivos: "<ul class='list-disc'><li>Dar visibilidade do vencimento e alertas.</li></ul>",
        metricas: "<ul class='list-disc'><li><strong>Quantidade de documentos vencidos.</strong></li></ul>",
        tecnologias: "<p>Power Query, DAX e Power BI.</p>",
        detalhes: "<p>Medidas DAX avançadas para cálculo temporal.</p>",
        fontes: "<p>Dados fictícios.</p>"
      }
    },
    {
      id: "mock-2",
      title: "Projeto 2: Hub de testes de desenvolvimento de projetos",
      category: "apps", 
      thumbnailSrc: "images/Test Hub.png",
      // URL limpa
      iframeSrc: "https://www.youtube.com/embed/o8CvaeNNycs",
      embedTitle: "Gestão de Testes e Qualidade",
      tabsToShow: "modal-descricao,modal-objetivos",
      data: {
        descricao: `
      <p class="mb-4">
        O <strong>Test Hub</strong> é uma solução robusta desenvolvida na <strong>Microsoft Power Platform</strong> para modernizar e centralizar o processo de Garantia de Qualidade (QA) em projetos de software.
      </p>
      <p class="mb-4">
        Criado para substituir o gerenciamento descentralizado em planilhas, o aplicativo oferece um fluxo de trabalho completo: do planejamento de casos de teste à execução, reporte de bugs e validação de correções. Ele atua como um "mini-Jira" personalizado, focado na agilidade e na rastreabilidade das entregas.
      </p>
    `,
        objetivos: `
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Centralizar a Gestão:</strong> Consolidar planos de teste, execuções e bugs em uma única fonte da verdade.</li>
        <li><strong>Padronizar Processos:</strong> Garantir que todos os testes sigam um padrão rigoroso com passos, pré-condições e massas de dados definidas.</li>
        <li><strong>Aumentar a Rastreabilidade:</strong> Vincular automaticamente bugs aos casos de teste de origem e às evidências (prints/vídeos).</li>
        <li><strong>Melhorar a Colaboração:</strong> Facilitar a comunicação entre QA e Desenvolvedores através de comentários e status claros no quadro Kanban.</li>
      </ul>
    `,
        metricas: "",
        tecnologias: "",
        detalhes: "<p>(WIP) Detalhes...</p>",
        fontes: "<p>(WIP) Fontes...</p>"
      }
    },
    {
      id: "mock-3",
      title: "Projeto 3: Demo de App",
      category: "apps",
      hidden: true, // [NOVO] Este projeto agora está oculto no site, mas existe no código.
      thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Demo+App",
      iframeSrc: "https://www.youtube.com/embed/LXb3EKWsInQ", 
      embedTitle: "Demonstração em Vídeo",
      tabsToShow: "modal-descricao,modal-objetivos,modal-fontes",
      data: {
        descricao: "<p>Este é um vídeo demonstrativo de um aplicativo.</p>",
        objetivos: "<ul class='list-disc'><li>Digitalizar processo manual.</li></ul>",
        metricas: "",
        tecnologias: "",
        detalhes: "",
        fontes: "<p>Construído com Power Apps.</p>"
      }
    },
    {
        id: "mock-4",
        title: "Projeto 4: Automação de Faturas",
        category: "automation",
        hidden: true,
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Automação",
        iframeSrc: "", 
        embedTitle: "Demo de Automação",
        tabsToShow: "modal-descricao,modal-objetivos",
        data: {
          descricao: "<p>Fluxo do Power Automate que lê e-mails e extrai anexos.</p>",
          objetivos: "<ul class='list-disc'><li>Eliminar entrada manual.</li></ul>",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
    },
    {
        id: "mock-5",
        title: "Projeto 5: Análise de RH",
        category: "data-analysis",
        hidden: true,
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=Dashboard+RH",
        iframeSrc: "",
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
        title: "Projeto 6: App de Inspeção",
        category: "apps",
        hidden: true,
        thumbnailSrc: "https://placehold.co/600x400/1A6A6C/FFFFFF?text=App+Inspeção",
        iframeSrc: "",
        embedTitle: "Demonstração em Vídeo",
        tabsToShow: "modal-descricao,modal-objetivos",
        data: {
          descricao: "<p>Aplicativo de inspeção de campo.</p>",
          objetivos: "<ul class='list-disc'><li>Registrar inspeções offline.</li></ul>",
          metricas: "",
          tecnologias: "",
          detalhes: "",
          fontes: ""
        }
      }
  ];

// =================================================================
// CONSTANTES DA API
// =================================================================
const API_URL_GET_PROJECTS = "URL_DA_SUA_API_AQUI/projects";
const API_URL_POST_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_PUT_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_DELETE_PROJECT = "URL_DA_SUA_API_AQUI/projects";
const API_URL_CONTACT = "URL_DA_SUA_API_AQUI/contact";

// =================================================================
// INICIALIZAÇÃO GLOBAL
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    const page = document.body.id || window.location.pathname;

    if (page.includes('index.html') || page === '/' || page.endsWith('/')) {
        initIndexPage();
    } else if (page.includes('projetos.html')) {
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
    initModalListeners(); 
    initClientCarousel();
}

function initClientCarousel() {
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

async function fetchProjectsForIndex() {
    const gridId = 'project-grid-dynamic';
    const loader = document.getElementById('project-loader');
    if (!document.getElementById(gridId) || !loader) return;

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        // [MODIFICADO] Filtra projetos ocultos na API real também (se implementado no backend) ou aqui
        const visibleProjects = projects.filter(p => !p.hidden);
        populateProjectGrid(gridId, visibleProjects.slice(0, 6)); 
        loader.classList.add('hidden');
    } catch (error) {
        console.warn("MODO FICTÍCIO (Index): Carregando MOCK_PROJECTS.", error.message);
        loader.textContent = "Carregando projetos fictícios...";
        setTimeout(() => {
            // [MODIFICADO] Aplica o filtro 'hidden' aqui
            const visibleMocks = MOCK_PROJECTS.filter(p => !p.hidden);
            populateProjectGrid(gridId, visibleMocks.slice(0, 6)); 
            loader.classList.add('hidden');
        }, 500);
    }
}

// =================================================================
// PÁGINA DE PROJETOS (projetos.html)
// =================================================================

function initProjetosPage() {
    fetchProjectsForCategorization();
    initModalListeners();
}

async function fetchProjectsForCategorization() {
    const loaders = {
        data: document.getElementById('loader-data-analysis'),
        apps: document.getElementById('loader-apps'),
        automation: document.getElementById('loader-automation'),
        other: document.getElementById('loader-other')
    };

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        // [MODIFICADO] Filtra projetos ocultos
        distributeProjects(projects.filter(p => !p.hidden));
    } catch (error) {
        console.warn("MODO FICTÍCIO (Projetos): Carregando MOCK_PROJECTS.", error.message);
        Object.values(loaders).forEach(loader => {
            if(loader) loader.textContent = "Carregando projetos fictícios...";
        });
        setTimeout(() => {
            // [MODIFICADO] Aplica o filtro 'hidden' aqui
            distributeProjects(MOCK_PROJECTS.filter(p => !p.hidden));
        }, 500);
    } finally {
        Object.values(loaders).forEach(loader => {
            if(loader) loader.classList.add('hidden');
        });
    }
}

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

function populateProjectGrid(gridElementId, projects) {
    const grid = document.getElementById(gridElementId);
    if (!grid) return; 
    
    grid.innerHTML = ''; 
    
    // [NOVO] Encontra a seção pai (ex: section.project-category-page)
    const section = grid.closest('section');

    if (!projects || projects.length === 0) {
        // [MODIFICADO] Se não houver projetos, oculta a seção inteira (título + grid)
        if (section) {
            section.style.display = 'none';
        }
        return;
    }

    // [NOVO] Se houver projetos, garante que a seção esteja visível
    if (section) {
        section.style.display = 'block';
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // Salva os dados no dataset para o modal recuperar
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
    const placeholder = document.createElement('div');
    placeholder.className = 'project-thumbnail-placeholder';
    placeholder.textContent = title || 'Pré-visualização indisponível';
    if (img.parentNode) {
        img.parentNode.replaceChild(placeholder, img);
    }
}

// =================================================================
// PÁGINA SOBRE
// =================================================================

function initSobrePage() {}

// =================================================================
// PÁGINA DE CONTATO
// =================================================================

function initContatoPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try {
        const response = await fetch(API_URL_CONTACT, { method: 'POST', body: new FormData(event.target) });
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
    const msgElement = document.getElementById('form-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `form-message ${type}`;
        msgElement.classList.remove('hidden');
    }
}

// =================================================================
// PÁGINA DE LOGIN
// =================================================================

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


// =================================================================
// PÁGINA ADMIN
// =================================================================

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
        // [NOTA] Admin geralmente vê todos, inclusive ocultos, então não filtro aqui.
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
        
        // [MODIFICADO] Indica visualmente se está oculto no painel de admin
        const hiddenBadge = project.hidden ? ' <span style="color:red; font-size:0.8em;">(Oculto)</span>' : '';

        listItem.innerHTML = `
            <span class="project-list-title">${project.title} <b>(${project.category || 'N/A'})</b>${hiddenBadge}</span>
            <div class="project-list-actions">
                <button class="project-list-button edit" data-id="${project.id}">Editar</button>
                <button class="project-list-button delete" data-id="${project.id}">Excluir</button>
            </div>
        `;
        
        // Attach event listener manual para editar
        const editBtn = listItem.querySelector('.edit');
        editBtn.onclick = () => handleEditProject(project);

        // Attach event listener manual para deletar
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


// =================================================================
// MODAL DE PROJETO (Lógica Global)
// =================================================================

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
}

/**
 * [SIMPLIFICADO] Helper para transformar links do YouTube em Embed Padrão
 * Remove parâmetros complexos como 'enablejsapi' e 'origin' que podem causar
 * Erro 153 em ambientes locais ou não homologados.
 */
function getEmbedUrl(url) {
    if (!url) return "";
    
    // Regex para capturar ID do YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
        // Retorna o embed simples, que funciona com a permissão "Allow Embedding" ativada no YouTube
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url;
}

function openModal(project) {
    if (!modalOverlay) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title || 'Título do Projeto';
    modalEmbedTitle.textContent = project.embedTitle || 'Conteúdo Interativo';
    
    // [MODIFICADO] Permissões padrão para iframe
    modalIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    modalIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    // [MODIFICADO] Usa a função helper simplificada
    modalIframe.src = getEmbedUrl(project.iframeSrc) || '';

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
    // Limpa atributos para não afetar outros iframes se necessário
    modalIframe.removeAttribute('allow');
    modalIframe.removeAttribute('referrerpolicy');
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