Portfólio Profissional ("Currículo Vivo") - Camilo Oliveira

Este repositório contém o código-fonte do meu portfólio profissional, um "currículo vivo" focado em projetos de Análise de Dados e soluções com a Microsoft Power Platform.

O site é construído com HTML, CSS e JavaScript puros, com foco em performance, acessibilidade (a11y) e Otimização para Buscadores (SEO).

Visão Geral do Projeto

O objetivo deste portal é servir como uma demonstração interativa das minhas habilidades, indo além de um currículo estático. Ele apresenta projetos práticos, estudos de caso e demonstrações que refletem minha jornada e especialização em transformar dados em inteligência de negócio.

Tecnologias Utilizadas

HTML5: Para a estrutura semântica e acessível.

CSS3: Para estilização, usando um design responsivo (mobile-first) e variáveis CSS para fácil manutenção.

JavaScript (ES6+): Para toda a interatividade, incluindo o sistema de modal (pop-up) e o carregamento dinâmico de conteúdo.

Foco em Qualidade e Boas Práticas

Acessibilidade (a11y): O site segue as diretrizes do WCAG.

Contraste de Cor: A paleta de cores foi validada para garantir legibilidade (Contraste AA/AAA).

Navegação por Teclado: Todos os elementos interativos são focáveis e possuem estados :focus-visible.

Semântica (ARIA): O modal utiliza atributos role="dialog", aria-modal, aria-label e gerencia o foco (focus trap) para ser totalmente acessível a leitores de tela.

SEO (Otimização para Buscadores):

Meta tags (description, keywords) e Open Graph (og:image, og:title) estão implementadas para garantir uma boa indexação no Google e uma aparência profissional ao compartilhar em redes sociais.

Manutenção:

O código é extensamente comentado.

O CSS utiliza variáveis (:root) para a paleta de cores e fontes, permitindo uma fácil customização da marca.

Estrutura dos Arquivos

/
│
├── index.html          (Página inicial com a galeria de projetos)
├── sobre.html          (Página "Sobre Mim" com a trajetória profissional)
├── style.css           (Folha de estilos principal)
├── script.js           (Lógica de interatividade - modal, abas, fallbacks)
├── README.md           (Este arquivo)
├── Logo Branco - Pinheiro Tecnologia.png (Logo usado na barra de navegação)
│
└── images/             (Pasta para as miniaturas/thumbnails dos projetos)
    ├── projeto-vendas.png
    ├── projeto-temporal.png
    └── ...


Como Adicionar Novos Projetos (Manutenção)

Para adicionar um novo projeto ao index.html, basta copiar e colar um bloco <div class="project-card">...</div> dentro da div class="project-grid" da categoria desejada.

O sistema é flexível e permite dois tipos principais de projetos:

1. Como Adicionar um Projeto Padrão (Ex: Power BI)

Este é o modelo padrão, que exibe todas as abas de informação.

Copie o Bloco: Copie o HTML de um projeto de Power BI existente no index.html.

Atualize os Atributos data-* (no div principal):

data-title: O título completo que aparecerá no topo do modal (ex: "Projeto 1: Análise de Vendas").

data-iframe-src: O link embed do seu dashboard (ex: https://app.powerbi.com/view?...).

data-thumbnail-src: O caminho para a imagem da miniatura (ex: images/novo-projeto.png).

data-embed-title: O subtítulo acima do iframe (ex: "Dashboard Interativo").

Atualize o Cartão:

Mude a imagem da miniatura: <img src="images/novo-projeto.png" ...>.

Mude o título do cartão: <h3>Novo Projeto</h3>.

Atualize o aria-label do botão: aria-label="Ver detalhes do Novo Projeto".

Atualize os Templates:

Preencha o conteúdo dentro de cada tag <template data-tab-content="...">...</template>. O conteúdo de cada template será injetado na aba correspondente do modal.

2. Como Adicionar um Projeto de Vídeo (ou Simplificado)

Este modelo permite ocultar abas desnecessárias (como "DAX" ou "ETL").

Siga os passos 1 a 3 do modelo padrão.

Adicione o Atributo data-tabs-to-show:

No div principal (<div class="project-card" ...>), adicione o atributo data-tabs-to-show.

Liste as IDs das abas que você quer manter, separadas por vírgula.

Exemplo: data-tabs-to-show="modal-descricao,modal-objetivos,modal-fontes"

<!-- end list -->

<div class="project-card" 
     data-title="Demo em Vídeo" 
     data-iframe-src="[https://www.youtube.com/embed/](https://www.youtube.com/embed/)..."
     data-thumbnail-src="images/demo-video.png"
     data-embed-title="Demonstração em Vídeo"
     data-tabs-to-show="modal-descricao,modal-objetivos,modal-fontes"
>
    <!-- ... resto do cartão ... -->
</div>


Preencha os Templates: Você só precisa preencher os <template> que correspondem às abas que você listou em data-tabs-to-show.