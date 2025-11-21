/**
 * Lógica do Site - script.js (Versão Estática - Gestão via Código)
 *
 * Este script gerencia:
 * 1. Lista de Projetos (PROJECTS_DATA): Edite esta lista para adicionar/remover projetos.
 * 2. Exibição dinâmica na Home e Página de Projetos.
 * 3. Filtragem por categoria.
 * 4. Formulário de contato (envio para API AWS).
 * 5. Modais e interatividade.
 */

// =================================================================
// 1. LISTA DE PROJETOS (Sua "Base de Dados")
// =================================================================
// Para adicionar um novo projeto, copie um bloco {...}, cole e edite os dados.
const PROJECTS_DATA = [
    {
      id: "proj-1",
      title: "Projeto 1: Controle de vencimento",
      category: "data-analysis", // Opções: 'data-analysis', 'apps', 'automation', 'other'
      thumbnailSrc: "images/relatorio_vencimentos.webp", // Caminho da imagem
      iframeSrc: "https://app.powerbi.com/view?r=eyJrIjoiMWRjOGIyMTItNTkxMS00MTYxLWFkYmQtOGU0MDdiOGQxNmJlIiwidCI6IjMyMjEyYTc5LWYzMWEtNGIwYS1hZjE0LTY4YzFjYTUyMGVmNSJ9",
      embedTitle: "Dashboard Interativo",
      tabsToShow: "", // Deixe vazio para mostrar todas as abas padrão
      data: {
        descricao: "<p>Este relatório monitora o vencimento de treinamentos, NRs, exames e documentos diversos.</p>",
        objetivos: "<ul class='list-disc'><li>Dar visibilidade do vencimento e alertas.</li></ul>",
        metricas: "<ul class='list-disc'><li><strong>Quantidade de documentos vencidos.</strong></li></ul>",
        tecnologias: "<p>Power Query, DAX e Power BI.</p>",
        detalhes: "<p>Medidas DAX avançadas para cálculo temporal.</p>",
        fontes: "<p>Dados internos.</p>"
      }
    },
    {
      id: "proj-2",
      title: "Projeto 2: Hub de testes de desenvolvimento",
      category: "apps", 
      thumbnailSrc: "images/Test-Hub.webp",
      iframeSrc: "https://www.youtube.com/embed/o8CvaeNNycs", // Use link de embed
      embedTitle: "Gestão de Testes e Qualidade",
      tabsToShow: "modal-descricao,modal-objetivos",
      data: {
        descricao: `
      <p class="mb-4">
        O <strong>Test Hub</strong> é uma solução robusta desenvolvida na <strong>Microsoft Power Platform</strong> para modernizar e centralizar o processo de Garantia de Qualidade (QA).
      </p>
      <p class="mb-4">
        Substitui planilhas descentralizadas, oferecendo fluxo completo de testes, bugs e validação.
      </p>
    `,
        objetivos: `
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Centralizar a Gestão:</strong> Fonte única da verdade para testes.</li>
        <li><strong>Padronizar Processos:</strong> Passos e pré-condições definidos.</li>
        <li><strong>Rastreabilidade:</strong> Vínculo automático de bugs.</li>
      </ul>
    `,
        metricas: "",
        tecnologias: "",
        detalhes: "<p>Desenvolvido em Power Apps Canvas.</p>",
        fontes: ""
      }
    },
    {
      id: "proj-3",
      title: "Projeto 3: Demo de App",
      category: "apps",
      hidden: true, // Use hidden: true para rascunhos (não aparece no site)
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
        id: "proj-4",
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
        id: "proj-5",
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
        id: "proj-6",
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
// CONSTANTES DA API (Apenas para Contato)
// =================================================================
const API_URL_CONTACT = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/contact"; 

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
    }
    // Páginas de login/admin removidas da lógica

    updateFooterYear();
});

function updateFooterYear() {
    const year = new Date().getFullYear();
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = year;
    
    const yearSpanFooter = document.getElementById('current-year-footer');
    if (yearSpanFooter) yearSpanFooter.textContent = year;
}

// =================================================================
// PÁGINA INICIAL (index.html)
// =================================================================

function initIndexPage() {
    loadProjectsForIndex(); // Agora carrega direto do array local
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

function loadProjectsForIndex() {
    const gridId = 'project-grid-dynamic';
    const loader = document.getElementById('project-loader');
    if (!document.getElementById(gridId)) return;

    if (loader) loader.classList.add('hidden'); // Esconde loader pois é instantâneo

    // Filtra ocultos e pega os 6 primeiros da lista local
    const visibleProjects = PROJECTS_DATA.filter(p => !p.hidden).slice(0, 6);
    populateProjectGrid(gridId, visibleProjects); 
}

// =================================================================
// PÁGINA DE PROJETOS (projetos.html)
// =================================================================

function initProjetosPage() {
    loadProjectsForCategorization();
    initModalListeners();
}

function loadProjectsForCategorization() {
    const loaders = document.querySelectorAll('.loader-text');
    loaders.forEach(l => l.classList.add('hidden'));

    // Filtra ocultos e distribui
    distributeProjects(PROJECTS_DATA.filter(p => !p.hidden));
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
    
    const section = grid.closest('section');

    if (!projects || projects.length === 0) {
        if (section) section.style.display = 'none';
        return;
    }

    if (section) section.style.display = 'block';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectData = JSON.stringify(project);

        card.innerHTML = `
            <img src="${project.thumbnailSrc}" alt="Miniatura do ${project.title}" class="project-thumbnail" onerror="handleImageError(this, '${project.title}')">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <button class="project-card-button" aria-label="Ver Projeto: ${project.title}">Ver Projeto</button>
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
    const msgElement = document.getElementById('form-message');
    
    const originalBtnText = btn.innerText; 
    btn.disabled = true;
    btn.innerText = 'Enviando...';
    
    if(msgElement) msgElement.classList.add('hidden');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Tentando enviar contato:", data);

    try {
        const response = await fetch(API_URL_CONTACT, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(data) 
        });

        console.log("Status da Resposta:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorText = errorData ? JSON.stringify(errorData) : await response.text();
            
            if (response.status === 429) {
                let message = "Você já enviou mensagens suficientes por hoje. Recebemos seu contato e retornaremos em breve!";
                if (errorData && errorData.message) {
                    message = errorData.message;
                }
                throw new Error(`RATE_LIMIT:${message}`);
            }

            throw new Error(`Falha no envio: ${response.status} - ${errorText}`);
        }
        
        showFormMessage('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.', 'success');
        event.target.reset();

    } catch (error) {
        console.error("Erro Capturado:", error);
        
        if (error.message.startsWith("RATE_LIMIT:")) {
            const friendlyMessage = error.message.replace("RATE_LIMIT:", "");
            showFormMessage(friendlyMessage, "warning"); 
        } else if (error.message.includes("Failed to fetch")) {
            showFormMessage("Erro de conexão com o servidor. Verifique sua internet e tente novamente.", "error");
        } else {
            showFormMessage("Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.", "error");
        }
    } finally {
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalBtnText;
        }, 500);
    }
}

function showFormMessage(message, type) {
    const msgElement = document.getElementById('form-message');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.classList.remove('success', 'error', 'warning');
        msgElement.classList.add('form-message', type); 
        msgElement.classList.remove('hidden');
        msgElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert(message); 
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

function getEmbedUrl(url) {
    if (!url) return "";
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
}

function openModal(project) {
    if (!modalOverlay) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title || 'Título do Projeto';
    modalEmbedTitle.textContent = project.embedTitle || 'Conteúdo Interativo';
    
    modalIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    modalIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
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