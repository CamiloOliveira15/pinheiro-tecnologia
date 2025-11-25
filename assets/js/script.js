/**
 * Lógica do Site - script.js (Versão Final Consolidada - Acessibilidade Otimizada v4)
 *
 * Este script gerencia:
 * 1. Carregamento dinâmico de projetos (da API AWS ou Mock local).
 * 2. Filtragem de projetos por categoria.
 * 3. Envio de formulário de contato com tratamento de erros, Rate Limit e Feedback Visual.
 * 4. Modais interativos para detalhes do projeto e embeds de vídeo.
 * 5. Acessibilidade: Correção de aria-labels para WCAG 2.5.3 e uso de aria-live.
 * 6. UX: Contador de caracteres e Máscara de Telefone.
 * 7. [REFORÇO] Funcionalidade de Menu Sanduíche (Mobile Navigation).
 */

// =================================================================
// DADOS FICTÍCIOS (PARA DESENVOLVIMENTO / FALLBACK)
// =================================================================
const MOCK_PROJECTS = [
    {
      id: "mock-1",
      title: "Projeto 1: Controle de vencimento",
      category: "data-analysis",
      hidden: false,
      thumbnailSrc: "images/relatorio_vencimentos.webp",
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
      hidden: false,
      thumbnailSrc: "images/Test-Hub.webp",
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
      hidden: true, 
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
// CONSTANTES DA API (AWS)
// =================================================================
// NOTA: Estas URLs foram deixadas como estavam no arquivo original.
const BASE_API_URL = "https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com"; 

const API_URL_GET_PROJECTS = `${BASE_API_URL}/projects`;
const API_URL_POST_PROJECT = `${BASE_API_URL}/projects`;
const API_URL_PUT_PROJECT = `${BASE_API_URL}/projects`;
const API_URL_DELETE_PROJECT = `${BASE_API_URL}/projects`;
const API_URL_CONTACT = `${BASE_API_URL}/contact`; 

// =================================================================
// INICIALIZAÇÃO GLOBAL
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa o menu mobile antes de tudo
    initMobileMenu(); 
    
    // Usa window.location.pathname para determinar a página atual
    const pathname = window.location.pathname;

    if (pathname === '/' || pathname.endsWith('/index.html')) {
        initIndexPage();
    } else if (pathname.endsWith('/projetos.html')) {
        initProjetosPage();
    } else if (pathname.endsWith('/sobre.html')) {
        initSobrePage();
    } else if (pathname.endsWith('/contato.html')) {
        initContatoPage();
    } else if (pathname.endsWith('/login.html')) {
        initLoginPage();
    } else if (pathname.endsWith('/admin.html')) {
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
// FUNÇÃO DE MENU MOBILE (HAMBURGER)
// =================================================================

let lastActiveElementBeforeMenuOpen = null;

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            
            // Salva o elemento focado antes de abrir o menu para restauração
            if (!isExpanded) {
                lastActiveElementBeforeMenuOpen = document.activeElement;
            }

            // Alterna o estado do botão
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Alterna a classe de abertura no wrapper
            navWrapper.classList.toggle('open');
            
            // Controle de scroll no body
            document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';

            if (!isExpanded) {
                // Menu está abrindo: adiciona listeners e move o foco
                const navLinks = navWrapper.querySelectorAll('a');
                navLinks.forEach(link => {
                    // Garante que o menu feche ao navegar
                    link.addEventListener('click', closeMenuOnce);
                });
                
                // Move o foco para o primeiro link do menu para acessibilidade
                setTimeout(() => {
                    navLinks[0] && navLinks[0].focus();
                }, 50);

            } else {
                // Menu está fechando: remove listeners e restaura o foco
                removeCloseMenuListeners();
                if (lastActiveElementBeforeMenuOpen) {
                    lastActiveElementBeforeMenuOpen.focus();
                    lastActiveElementBeforeMenuOpen = null;
                }
            }
        });

        const closeMenuOnce = () => {
            // Função de fechar que é chamada ao clicar em um link
            menuToggle.setAttribute('aria-expanded', 'false');
            navWrapper.classList.remove('open');
            document.body.style.overflow = 'auto';
            removeCloseMenuListeners();
        };

        const removeCloseMenuListeners = () => {
             const navLinks = navWrapper.querySelectorAll('a');
             navLinks.forEach(link => {
                link.removeEventListener('click', closeMenuOnce);
            });
        };
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

    // Duplica o conteúdo para garantir loop suave
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
    // A largura deve ser ajustada via CSS para o scroll animado funcionar
}

async function fetchProjectsForIndex() {
    const gridId = 'project-grid-dynamic';
    const loader = document.getElementById('project-loader');
    if (!document.getElementById(gridId) || !loader) return;

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        // Filtra projetos ocultos na API real
        const visibleProjects = projects.filter(p => !p.hidden);
        // Exibe apenas 6 projetos na página inicial
        populateProjectGrid(gridId, visibleProjects.slice(0, 6)); 
        loader.classList.add('hidden');
    } catch (error) {
        console.warn("MODO FICTÍCIO (Index): Carregando MOCK_PROJECTS.", error.message);
        loader.textContent = "Carregando projetos fictícios...";
        setTimeout(() => {
            // Aplica o filtro 'hidden' e exibe apenas 6
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

    // Exibe loaders
    Object.values(loaders).forEach(loader => {
        if(loader) loader.classList.remove('hidden');
    });

    try {
        const response = await fetch(API_URL_GET_PROJECTS);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const projects = await response.json();
        // Filtra projetos ocultos
        distributeProjects(projects.filter(p => !p.hidden));
    } catch (error) {
        console.warn("MODO FICTÍCIO (Projetos): Carregando MOCK_PROJECTS.", error.message);
        Object.values(loaders).forEach(loader => {
            if(loader) loader.textContent = "Carregando projetos fictícios...";
        });
        setTimeout(() => {
            // Aplica o filtro 'hidden'
            distributeProjects(MOCK_PROJECTS.filter(p => !p.hidden));
        }, 500);
    } finally {
        // Oculta loaders
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
    
    // Encontra a seção pai
    const section = grid.closest('section');

    if (!projects || projects.length === 0) {
        // Se não houver projetos, oculta a seção inteira
        if (section) {
            section.style.display = 'none';
        }
        return;
    }

    // Se houver projetos, garante que a seção esteja visível
    if (section) {
        section.style.display = 'block';
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectData = JSON.stringify(project);

        // [CORREÇÃO ACESSIBILIDADE]
        // Adicionado 'loading="lazy"' para melhor performance (Core Web Vitals)
        // Adicionado 'width' e 'height' na imagem para evitar CLS
        card.innerHTML = `
            <img 
                src="${project.thumbnailSrc}" 
                alt="Imagem de capa do projeto: ${project.title}" 
                class="project-thumbnail" 
                onerror="handleImageError(this, '${project.title}')"
                loading="lazy"
                width="340"
                height="200"
            >
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <button class="project-card-button" aria-label="Ver detalhes sobre o projeto ${project.title}">Ver Projeto</button>
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

function initSobrePage() {
    // Nenhuma lógica JS específica necessária no momento.
}

// =================================================================
// PÁGINA DE CONTATO
// =================================================================

function initContatoPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Inicializa contador de caracteres da mensagem
    initContactFormCounter();
    
    // Inicializa máscara de telefone
    initPhoneMask();
}

function initContactFormCounter() {
    const textArea = document.getElementById('message');
    // Renomeado para 'char-count-text' para melhor acessibilidade
    const counterDisplay = document.getElementById('char-count-text'); 
    const maxLength = 250;

    if (textArea && counterDisplay) {
        textArea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counterDisplay.textContent = `${currentLength} / ${maxLength}`;

            // Altera a cor conforme se aproxima do limite
            if (currentLength >= maxLength) {
                counterDisplay.style.color = 'red';
                counterDisplay.style.fontWeight = 'bold';
            } else if (currentLength >= maxLength * 0.9) {
                counterDisplay.style.color = '#f57f17'; // Laranja/Amarelo escuro
                counterDisplay.style.fontWeight = 'normal';
            } else {
                counterDisplay.style.color = '#666';
                counterDisplay.style.fontWeight = 'normal';
            }
        });
        // Dispara o evento 'input' na inicialização para exibir '0 / 2000'
        textArea.dispatchEvent(new Event('input'));
    }
}

// Função para aplicar máscara de telefone (celular e fixo)
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', function (e) {
        // Remove tudo que não for dígito
        let x = e.target.value.replace(/\D/g, ''); 
        let output = '';

        if (x.length > 0) {
            output += '(' + x.substring(0, 2);
        }
        if (x.length > 2) {
            // Verifica se é celular (9 dígitos) ou fixo (8 dígitos)
            if (x.length > 10) { 
                // Celular com 9 dígitos
                output += ') ' + x.substring(2, 7);
                if (x.length > 7) {
                    output += '-' + x.substring(7, 11);
                }
            } else {
                // Fixo com 8 dígitos
                output += ') ' + x.substring(2, 6);
                if (x.length > 6) {
                    output += '-' + x.substring(6, 10);
                }
            }
        }
        e.target.value = output;
    });
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const msgElement = document.getElementById('form-message');
    
    const originalBtnText = btn.innerText; 
    btn.disabled = true;
    btn.innerText = 'Enviando...';
    
    // Oculta a mensagem anterior e limpa o conteúdo para evitar confusão de aria-live
    if(msgElement) {
        msgElement.classList.add('hidden');
        msgElement.textContent = '';
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // NOTA: A máscara de telefone adiciona parênteses/hífens que o backend pode não esperar. 
    // É uma boa prática limpar o número antes de enviar para a API.
    data.phone = data.phone ? data.phone.replace(/\D/g, '') : '';


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
            
            if (response.status === 429) {
                let message = "Você já enviou mensagens suficientes por hoje. Recebemos seu contato e retornaremos em breve!";
                if (errorData && errorData.message) {
                    message = errorData.message; 
                }
                throw new Error(`RATE_LIMIT:${message}`);
            }

            const errorText = errorData ? JSON.stringify(errorData) : await response.text();
            throw new Error(`Falha no envio: ${response.status} - ${errorText}`);
        }
        
        // A API deve retornar 200/201 em caso de sucesso
        showFormMessage('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.', 'success');
        event.target.reset();
        
        // Reseta o contador também
        const textArea = document.getElementById('message');
        if(textArea) {
             textArea.dispatchEvent(new Event('input'));
        }

    } catch (error) {
        console.error("Erro Capturado:", error);
        
        if (error.message.startsWith("RATE_LIMIT:")) {
            const friendlyMessage = error.message.replace("RATE_LIMIT:", "");
            showFormMessage(friendlyMessage, "warning"); 
        } else if (error.message.includes("Failed to fetch")) {
            showFormMessage("Erro de conexão com o servidor. Verifique sua internet e tente novamente.", "error");
        } else {
            showFormMessage("Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde. (Detalhes: " + error.message + ")", "error");
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
        // Remove todas as classes de status e adiciona a nova
        msgElement.classList.remove('error', 'success', 'warning', 'hidden'); 
        msgElement.classList.add(type); 
        // Acessibilidade: Garante que a mensagem seja anunciada e fique visível.
        msgElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.error("Erro: Elemento de mensagem do formulário não encontrado. Mensagem:", message);
    }
}

// =================================================================
// PÁGINA DE LOGIN e ADMIN (Lógica de bypass e correção de confirm)
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
        console.warn("MODO FICTÍCIO (Admin): Carregando projetos fictícios.", error.message);
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
    btn.textContent = 'Salvando...';

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
        
        // Simulação de atualização/criação no mock
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
    // Rola para o formulário
    window.scrollTo(0, document.getElementById('project-form').offsetTop);
}

function resetProjectForm() {
    document.getElementById('project-form').reset();
    document.getElementById('project-id').value = '';
    document.getElementById('form-title').textContent = 'Adicionar Novo Projeto';
    document.getElementById('project-cancel-btn').classList.add('hidden');
}

async function handleDeleteProject(id, title) {
    // [CORRIGIDO] Removido o uso de window.confirm() e alert()
    const isConfirmed = window.confirm(`Tem certeza que deseja excluir o projeto "${title}"?`);

    if (!isConfirmed) {
        console.log(`Exclusão do projeto "${title}" cancelada pelo usuário.`);
        return;
    }
    
    // Simulação de Exclusão: Você deve criar um modal customizado para confirmação
    console.error("AVISO: Usando simulação de confirmação. Em um ambiente real, você usaria um modal customizado no lugar de confirm().");

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
        
        // Simulação de exclusão no mock
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
let lastFocusedElement; // Armazena o elemento focado antes da abertura do modal

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
        // Fecha o modal apenas se clicar no overlay (fundo)
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    // Fecha o modal ao pressionar ESC
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
 * Helper para transformar links do YouTube em Embed.
 * Usa youtube-nocookie.com para evitar o erro 153 e melhorar a privacidade.
 */
function getEmbedUrl(url) {
    if (!url) return "";
    
    // Regex para capturar ID do YouTube (formatos variados)
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
        // Usa o domínio 'youtube-nocookie.com' que é mais permissivo com embeds
        return `https://www.youtube-nocookie.com/embed/${match[1]}`;
    }
    
    return url;
}

function openModal(project) {
    if (!modalOverlay) return;

    // Salva o elemento focado antes de abrir o modal
    lastFocusedElement = document.activeElement; 

    modalTitle.textContent = project.title || 'Título do Projeto';
    modalEmbedTitle.textContent = project.embedTitle || 'Conteúdo Interativo';
    
    // Permissões robustas para garantir que o vídeo toque
    modalIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    modalIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    modalIframe.setAttribute('loading', 'lazy'); 

    // Usa a função helper corrigida
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

    // Controla quais abas devem ser exibidas
    const tabsToShowAttr = project.tabsToShow;
    if (tabsToShowAttr) {
        const tabsToShow = tabsToShowAttr.split(',');
        modalTabButtons.forEach(tab => {
            tab.style.display = tabsToShow.includes(tab.dataset.tab) ? 'block' : 'none';
        });
    } else {
        // Se a propriedade estiver vazia/nula, exibe todas
        modalTabButtons.forEach(tab => {
            tab.style.display = 'block';
        });
    }

    resetTabs();
    modalOverlay.classList.remove('hidden');
    // Impede o scroll do body
    document.body.style.overflow = 'hidden'; 
    // Move o foco para o botão de fechar para acessibilidade
    modalCloseButton.focus(); 
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('hidden');
    // Para o vídeo/embed ao fechar
    modalIframe.src = ''; 
    // Limpa atributos para evitar problemas ao reabrir
    modalIframe.removeAttribute('allow');
    modalIframe.removeAttribute('referrerpolicy');
    document.body.style.overflow = 'auto';
    // Restaura o foco para o elemento anterior
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function handleTabClick(button) {
    const targetPanelId = button.dataset.tab;
    // Remove o estado ativo de todos os botões
    modalTabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    // Define o estado ativo no botão clicado
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    // Oculta todos os painéis
    modalTabPanels.forEach(panel => panel.classList.add('hidden'));
    // Exibe o painel alvo
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
        // Move o foco para o conteúdo da aba
        targetPanel.focus();
    }
}

function resetTabs() {
    // Encontra a primeira aba visível para ativá-la
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