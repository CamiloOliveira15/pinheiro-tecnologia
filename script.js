/**
 * Lógica do Portfólio - script.js (Versão Estática)
 *
 * Este script gerencia:
 * 1. Abertura e fechamento do modal (pop-up) do projeto.
 * 2. Preenchimento do modal com dados dos atributos 'data-*' e tags '<template>'.
 * 3. Controle das abas (tabs) dentro do modal.
 * 4. Lógica para exibir abas condicionais (ex: 'data-tabs-to-show').
 * 5. Acessibilidade (Focus Trap, gerenciamento de foco, etc.).
 * 6. Fallback para miniaturas (thumbnails) de projeto que falharem ao carregar.
 */

// Executa o script quando o DOM (Document Object Model) estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Seleção dos Elementos Principais ---
    
    // Seleciona todos os botões que abrem o modal
    const openModalButtons = document.querySelectorAll('.project-card-button');
    
    // Seleciona os elementos do modal
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = modalOverlay.querySelector('.modal-content');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalEmbedTitle = document.getElementById('modal-embed-title');
    const modalIframe = document.getElementById('modal-iframe');
    
    // Seleciona os elementos das abas (Tabs) do modal
    const modalTabButtons = document.querySelectorAll('.modal-tab-button');
    const modalTabPanels = document.querySelectorAll('.modal-tab-panel');
    
    // Variável para guardar o último elemento focado (para acessibilidade)
    let lastFocusedElement;

    
    // --- 2. Lógica de Abertura do Modal ---

    // Adiciona um listener de clique para cada botão "Ver Projeto"
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Guarda o botão que foi clicado para devolver o foco ao fechar
            lastFocusedElement = button; 
            
            // Encontra o '.project-card' pai do botão clicado
            const projectCard = button.closest('.project-card');
            
            // Preenche e abre o modal com os dados deste cartão
            openModal(projectCard);
        });
    });

    /**
     * Preenche o modal com os dados do cartão do projeto e o exibe.
     * @param {HTMLElement} projectCard - O elemento .project-card que foi clicado.
     */
    function openModal(projectCard) {
        // A. Extrai os dados principais dos atributos 'data-*'
        const title = projectCard.dataset.title || 'Título do Projeto';
        const iframeSrc = projectCard.dataset.iframeSrc || '';
        const embedTitle = projectCard.dataset.embedTitle || 'Conteúdo Interativo';
        
        // B. Preenche o título do modal, o título do embed e o src do iframe
        modalTitle.textContent = title;
        modalEmbedTitle.textContent = embedTitle;
        modalIframe.src = iframeSrc;

        // C. Preenche o conteúdo de cada aba (tab)
        const panelMap = {
            'modal-descricao': document.getElementById('modal-descricao'),
            'modal-objetivos': document.getElementById('modal-objetivos'),
            'modal-metricas': document.getElementById('modal-metricas'),
            'modal-tratamento': document.getElementById('modal-tratamento'),
            'modal-dax': document.getElementById('modal-dax'),
            'modal-fontes': document.getElementById('modal-fontes'),
        };

        modalTabButtons.forEach(tab => {
            const tabName = tab.dataset.tab.replace('modal-', ''); // ex: 'descricao'
            const panel = panelMap[tab.dataset.tab]; // ex: 'modal-descricao'
            
            // Encontra o <template> correspondente dentro do cartão
            const template = projectCard.querySelector(`template[data-tab-content="${tabName}"]`);
            
            if (template && panel) {
                // Se o template existe, limpa o painel e clona o conteúdo do template
                panel.innerHTML = ''; 
                panel.appendChild(template.content.cloneNode(true));
            } else if (panel) {
                // Se não houver template, exibe uma mensagem padrão
                panel.innerHTML = '<p>Conteúdo não disponível.</p>';
            }
        });

        // D. Lógica de Abas Condicionais (para vídeos, etc.)
        const tabsToShowAttr = projectCard.dataset.tabsToShow;
        if (tabsToShowAttr) {
            // Se o atributo 'data-tabs-to-show' existir...
            const tabsToShow = tabsToShowAttr.split(','); // ex: ['modal-descricao', 'modal-objetivos']
            
            // Itera sobre todos os botões de aba
            modalTabButtons.forEach(tab => {
                // Mostra o botão se ele estiver na lista 'tabsToShow', senão esconde
                tab.style.display = tabsToShow.includes(tab.dataset.tab) ? 'block' : 'none';
            });
        } else {
            // Se o atributo não existir, mostra todas as abas (comportamento padrão)
            modalTabButtons.forEach(tab => {
                tab.style.display = 'block';
            });
        }
        
        // E. Exibição e Acessibilidade
        resetTabs(); // Garante que a primeira aba visível esteja ativa
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Trava o scroll da página ao fundo
        modalCloseButton.focus(); // Move o foco do teclado para o botão "Fechar"
    }


    // --- 3. Lógica de Fechamento do Modal ---

    /**
     * Fecha o modal, limpa o iframe e restaura o foco do teclado.
     */
    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalIframe.src = ''; // Limpa o src para parar vídeos do YouTube, etc.
        document.body.style.overflow = 'auto'; // Restaura o scroll da página
        
        // Devolve o foco para o botão "Ver Projeto" que abriu o modal
        if (lastFocusedElement) {
            lastFocusedElement.focus(); 
        }
    }

    // Adiciona os listeners de evento para fechar o modal
    modalCloseButton.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (event) => {
        // Fecha o modal apenas se o clique for no fundo (o overlay)
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        // Fecha o modal ao pressionar a tecla "Escape"
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });


    // --- 4. Lógica de Navegação por Abas (Tabs) ---

    // Adiciona um listener de clique a CADA botão de aba
    modalTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.tab; // ex: 'modal-descricao'
            
            // 1. Desativa todas as abas
            modalTabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            // 2. Ativa a aba que foi clicada
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // 3. Esconde todos os painéis de conteúdo
            modalTabPanels.forEach(panel => panel.classList.add('hidden'));
            
            // 4. Mostra o painel de conteúdo correspondente
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    /**
     * Reseta as abas para o estado inicial.
     * Encontra a primeira aba que está visível e a torna ativa.
     */
    function resetTabs() {
        // Tenta encontrar a primeira aba que NÃO esteja com 'display: none'
        const firstVisibleTab = Array.from(modalTabButtons).find(tab => tab.style.display !== 'none');

        modalTabButtons.forEach(button => {
            const panelId = button.dataset.tab;
            const panel = document.getElementById(panelId);

            if (panel) {
                // Se este botão for a primeira aba visível...
                if (firstVisibleTab && button === firstVisibleTab) {
                    // Ativa e mostra
                    button.classList.add('active');
                    button.setAttribute('aria-selected', 'true');
                    panel.classList.remove('hidden');
                } else {
                    // Desativa e esconde
                    button.classList.remove('active');
                    button.setAttribute('aria-selected', 'false');
                    panel.classList.add('hidden');
                }
            }
        });
    }

    // --- 5. Acessibilidade: Focus Trap ---

    /**
     * Prende o foco do usuário (navegação via Tab) dentro do modal
     * quando ele está aberto.
     */
    modalContent.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return; // Ignora teclas que não são Tab

        // Lista de todos os elementos focáveis dentro do modal
        const focusableElements = modalContent.querySelectorAll(
            'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab: Navegando para trás
            if (document.activeElement === firstElement) {
                lastElement.focus(); // Move o foco para o último elemento
                event.preventDefault(); // Impede a saída do modal
            }
        } else {
            // Tab: Navegando para frente
            if (document.activeElement === lastElement) {
                firstElement.focus(); // Move o foco para o primeiro elemento
                event.preventDefault(); // Impede a saída do modal
            }
        }
    });

    // --- 6. (Bônus) Fallback de Miniaturas (Thumbnails) ---

    /**
     * Encontra todas as miniaturas de projeto e adiciona um 
     * listener de 'error' para o caso de a imagem não ser encontrada.
     */
    const allThumbnails = document.querySelectorAll('.project-thumbnail');
    allThumbnails.forEach(img => {
        
        // Pega o título do projeto do 'data-title' do cartão pai
        const card = img.closest('.project-card');
        const title = card ? (card.dataset.title || 'Pré-visualização indisponível') : 'Pré-visualização indisponível';

        const handleImageError = () => {
            // 1. Cria o elemento de placeholder (o <div>)
            const placeholder = document.createElement('div');
            placeholder.className = 'project-thumbnail-placeholder';
            placeholder.textContent = title; // Usa o título do projeto
            
            // 2. Substitui a <img> quebrada pelo <div>
            if (img.parentNode) {
                img.parentNode.replaceChild(placeholder, img);
            }
            
            // 3. Remove o listener para evitar loops infinitos
            img.removeEventListener('error', handleImageError);
        };
        
        // Adiciona o listener de erro
        img.addEventListener('error', handleImageError);

        // Verifica também se a imagem já está quebrada (do cache)
        if (img.complete && img.naturalWidth === 0 && img.src) {
            handleImageError();
        }
    });

});