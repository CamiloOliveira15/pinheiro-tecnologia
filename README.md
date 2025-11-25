Pinheiro Tecnologia — Site Empresarial e Portfólio

📑 Sumário

📘 Pinheiro Tecnologia — Site Empresarial e Portfólio

🌐 Visão Geral

🧰 Tecnologias Principais

🏗️ Arquitetura da Solução

1. Frontend (Hospedagem e Entrega)

2. Backend (API e Lógica Serverless)

3. Dados e Comunicação

✨ Padrões Web e Otimizações (Última Revisão)

🚀 Funcionalidades do Site

Públicas

Administrativas (Admin)

📄 Licença

🌐 Visão Geral

O site funciona como vitrine digital da empresa, destacando serviços especializados em Microsoft Power Platform e Análise de Dados.

Também inclui uma área administrativa segura que possibilita gerenciar dinamicamente o portfólio de projetos.

🧰 Tecnologias Principais

Frontend: HTML5, CSS3 (Mobile First, Variáveis), JavaScript (ES6+)

Backend: Python 3.12 com AWS Lambda

Banco de Dados: AWS DynamoDB (NoSQL)

Infraestrutura AWS: CloudFront, API Gateway, Lambda, DynamoDB, S3, Route 53, SES

Autenticação (Planejada): AWS Cognito

🏗️ Arquitetura da Solução

Projetada para ser serverless, escalável, segura e de baixo custo.

1. Frontend (Hospedagem e Entrega)

Amazon S3: Armazena arquivos HTML, CSS, JS e imagens.

Amazon CloudFront: Distribuição global com cache, compressão e HTTPS.

2. Backend (API e Lógica Serverless)

API Gateway (HTTP API): Roteamento e regras de CORS.

AWS Lambda (PinheiroProjectsAPI): Serviço central da aplicação.

Rotas disponibilizadas:

Método

Rota

Descrição

GET

/projects

Lista projetos

POST

/projects

Cria projeto (Admin)

PUT

/projects/{id}

Atualiza projeto (Admin)

DELETE

/projects/{id}

Remove projeto (Admin)

POST

/contact

Processa contato e envia e-mail

3. Dados e Comunicação

DynamoDB:

PinheiroProjects

PinheiroContacts

Amazon SES: Envio de e-mails transacionais.

Route 53: DNS do domínio pinheirotecnologia.com.

✨ Padrões Web e Otimizações (Última Revisão)

O Frontend segue as boas práticas mais rigorosas, focando em performance e inclusão:

Web Performance (Core Web Vitals):

CSS Crítico: O CSS acima da dobra (Critical CSS) é inserido inline, e o restante é carregado de forma assíncrona (rel="preload") para otimizar o LCP (Largest Contentful Paint).

Otimização de Imagens: Uso de loading="lazy" e definição explícita de width/height em todas as imagens para eliminar o CLS (Cumulative Layout Shift).

JS Não Bloqueante: O JavaScript principal é carregado com o atributo defer.

Acessibilidade (WCAG):

Semântica: Uso correto de tags estruturais (<main>, <article>), e correta hierarquia de headings (<h1>, <h2>).

Foco e Navegação: Estilos :focus-visible globais implementados para navegação por teclado.

ARIA: Uso de aria-labels e aria-current na navegação e atributos role="status" e aria-live no formulário de contato para leitores de tela.

SEO Técnico e Segurança:

Implementação de dados estruturados Schema.org (Organização) no index.html.

Adoção de Content-Security-Policy (CSP) para mitigar ataques XSS.

Estratégia SEO conservadora, focada em conteúdo de valor e sem keyword stuffing.

🚀 Funcionalidades do Site

Públicas

Listagem dinâmica de projetos via API

Filtros automáticos por categoria

Modal de detalhes com vídeos e embeds

Formulário de contato com:

envio assíncrono

feedback visual

gravação no DynamoDB

notificação via SES

Administrativas (Admin)

CMS interno (admin.html)

Funções:

criar

editar

excluir

visualizar projetos

📄 Licença

Todos os direitos reservados — Pinheiro Tecnologia.