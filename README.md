Pinheiro Tecnologia - Site Empresarial (Dinâmico)

Este repositório contém o código-fonte do site empresarial da Pinheiro Tecnologia. O projeto é uma aplicação web dinâmica que demonstra serviços e cases de sucesso, com um painel de administração para gerenciamento de conteúdo.

Visão Geral da Arquitetura

Este projeto evoluiu de um site estático para uma arquitetura serverless na AWS, permitindo um site dinâmico e gerenciável.

A arquitetura é dividida em duas partes principais:

1. Frontend (Este Repositório)

Tecnologia: HTML5, CSS3, JavaScript (ES6+).

Design: Layout totalmente responsivo com rolagem livre (menu de navegação não-fixo).

Função: Interface pública do usuário (visitantes) e interface de administração (admin).

Páginas Públicas:

index.html: Página inicial com serviços e uma listagem "vitrine" dos 6 projetos mais recentes em linha única. Contém um botão "Ver Todos".

projetos.html: Página que exibe todos os projetos, categorizados por tipo (Análise de Dados, Aplicativos, etc.).

sobre.html: Página "Sobre Nós".

contato.html: Formulário de contato que envia dados para a API.

Páginas de Admin (Protegidas):

login.html: Página de login que se autentica via AWS Cognito.

admin.html: Painel de controle (CMS) para Criar, Ler, Atualizar e Excluir (CRUD) projetos.

2. Backend (Arquitetura Serverless na AWS)

O frontend se comunica com um backend seguro e escalável construído com os seguintes serviços da AWS:

AWS API Gateway: Fornece os endpoints HTTP (a API) que o frontend chama.

AWS Lambda: Contém a lógica de negócios (Node.js/Python) que é executada em resposta às chamadas da API.

AWS DynamoDB: O banco de dados NoSQL onde os projetos (agora com um campo category) e os envios do formulário de contato são armazenados.

AWS Cognito: Gerencia a autenticação de administradores para proteger o painel de admin.

(Para um guia detalhado sobre como construir o backend, consulte o arquivo backend-architecture.md.)

Lógica do Frontend (script.js)

O script.js foi unificado e agora gerencia toda a interatividade do site:

Carregamento de Página: Detecta em qual página o usuário está e executa as funções relevantes (ex: initIndexPage() ou initProjetosPage()).

Carregamento Dinâmico:

Na index.html, busca a lista de projetos da API (GET /projects), limita aos 6 primeiros, e os insere dinamicamente na "vitrine" de linha única.

Na projetos.html, busca todos os projetos, os filtra por category no lado do cliente (JavaScript) e os insere nos grids de categoria corretos.

Modal de Projeto: A lógica do modal é global e preenchida com os dados do projeto clicado.

Formulário de Contato: Intercepta o envio do formulário em contato.html e envia os dados para a API (POST /contact).

Lógica de Admin:

login.html: Envia os dados de login para o AWS Cognito.

admin.html:

Verifica se o usuário está autenticado.

Adiciona um campo <select> para o administrador definir a category de um projeto.

Envia as operações de CRUD para a API, incluindo o novo campo category.

Manutenção (Como Adicionar Projetos)

A manutenção de projetos não é mais feita editando o index.html.

Acesse login.html no seu site.

Faça login com suas credenciais de administrador (criadas no AWS Cognito).

Você será redirecionado para admin.html.

Use o formulário "Adicionar Novo Projeto" para preencher todos os detalhes.

Importante: Selecione a Categoria correta no novo campo dropdown.

Clique em "Salvar Projeto".

O projeto será salvo no DynamoDB e aparecerá automaticamente (entre os 6 mais recentes) na index.html e na página projetos.html, dentro da categoria correta.