🌐 Pinheiro Tecnologia — Plataforma Web Serverless

Este repositório contém o código-fonte da plataforma web estática da Pinheiro Tecnologia, arquitetada para alta disponibilidade e baixa latência usando serviços serverless da AWS.

📑 1. Arquitetura da Solução e Tecnologias

A aplicação é dividida em dois workloads principais: Frontend Estático (S3/CloudFront) e Backend Serverless (API Gateway/Lambda).

1.1. Pilha Tecnológica (Tech Stack)

Componente

Tecnologia Principal

Finalidade

Frontend

HTML5, CSS3, JavaScript (ES6+)

Interface do usuário e lógica de apresentação (SPA-like).

Backend

AWS Lambda (Python 3.11)

Lógica de contato e API de Portfólio.

Hospedagem

Amazon S3

Armazenamento de arquivos estáticos.

CDN & Cache

Amazon CloudFront

Distribuição global, SSL/HTTPS e controle de cache.

Banco de Dados

AWS DynamoDB

Armazenamento de dados dinâmicos (Projetos, Contatos).

Comunicação

Amazon SES

Envio de e-mails transacionais (Formulário de Contato).

1.2. Estrutura de Rotas (API Gateway)

O endpoint de contato está configurado no Estágio Raiz ($default) do API Gateway.

Método

Recurso (Path)

Descrição

URL de Invocação

GET

/projects

Retorna dados do Portfólio (Mock/DynamoDB).

https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/projects

POST

/contact

Recebe dados do formulário de contato e aciona a Lambda.

https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/contact

⚙️ 2. Guia de Desenvolvimento e Manutenção

2.1. Frontend (Código Estático)

Localização: Arquivos .html, assets/css/style.css, assets/js/script.js.

Inicialização: A lógica de carregamento dinâmico e validação está em assets/js/script.js.

Função Principal: document.addEventListener('DOMContentLoaded', ...)

Inicialização de Páginas: initIndexPage(), initProjetosPage(), initContactPage().

2.2. Backend (Lógica Serverless)

O arquivo lambda_function.py contém o código Python responsável por processar o formulário de contato e as requisições da API.

Arquivo: lambda_function.py

Handler: lambda_function.lambda_handler

Dependências: Este arquivo requer acesso configurado ao Amazon SES (para envio de e-mails) e DynamoDB (para persistência de contatos, se implementado).

⚠️ NOTA CRÍTICA DE MANUTENÇÃO:
O deploy do código da lambda_function.py NÃO é automatizado pelo GitHub Actions. Qualquer alteração neste arquivo deve ser copiada e atualizada manualmente no console do AWS Lambda para entrar em produção.

🚀 3. Deploy Contínuo (CI/CD)

O deploy do Frontend estático é gerenciado pelo GitHub Actions, garantindo que o conteúdo mais recente esteja sempre no CloudFront.

3.1. Fluxo do Pipeline

O pipeline está configurado no arquivo .github/workflows/s3_deploy.yml.

Gatilho: push para o branch main.

Exclusões (paths-ignore): Ignora alterações no README.md e arquivos de configuração para evitar builds desnecessários.

Ação de Deploy: Utiliza aws s3 sync . s3://${{ secrets.AWS_S3_BUCKET }} para sincronizar o código. O parâmetro --delete garante a limpeza de arquivos antigos.

Invalidação: Solicita a invalidação seletiva do CloudFront para apenas os arquivos modificados.

3.2. Credenciais (Secrets)

As seguintes credenciais de acesso programático devem ser configuradas como Secrets no GitHub para permitir que o Actions se autentique e execute o deploy no AWS S3/CloudFront:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

AWS_REGION

AWS_S3_BUCKET

AWS_CLOUDFRONT_DISTRIBUTION_ID (Para controle de cache)

✨ 4. Padrões e Otimizações

Área

Padrão Implementado

Acessibilidade

Conformidade WCAG: Uso de aria-labels, aria-current, role="img", e semântica forte (<strong> em vez de **).

Performance

Carregamento assíncrono (defer) do JS, Lazy Loading (loading="lazy") para imagens e eliminação de CSS/JS que bloqueiam a renderização.

UX/UI

Design Mobile-First, Menu Sanduíche com controle de estado, e modais de feedback de formulário centralizados.

Segurança

Implementação de Content-Security-Policy (CSP) no <head> para mitigação de XSS.