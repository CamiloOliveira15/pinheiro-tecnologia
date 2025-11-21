# 📘 Pinheiro Tecnologia — Site Empresarial e Portfólio

![AWS](https://img.shields.io/badge/AWS-Serverless-orange?logo=amazonaws)
![Status](https://img.shields.io/badge/Status-Online-success)
![CloudFront](https://img.shields.io/badge/Deploy-CloudFront-blue?logo=amazonaws)
![License](https://img.shields.io/badge/License-Proprietária-lightgrey)
![Build](https://img.shields.io/badge/Infra-as--code-lightblue?logo=amazonaws)

---

# 📑 Sumário
- [📘 Pinheiro Tecnologia — Site Empresarial e Portfólio](#-pinheiro-tecnologia--site-empresarial-e-portfólio)
- [🌐 Visão Geral](#-visão-geral)
- [🧰 Tecnologias Principais](#-tecnologias-principais)
- [🏗️ Arquitetura da Solução](#️-arquitetura-da-solução)
  - [1. Frontend (Hospedagem e Entrega)](#1-frontend-hospedagem-e-entrega)
  - [2. Backend (API e Lógica Serverless)](#2-backend-api-e-lógica-serverless)
  - [3. Dados e Comunicação](#3-dados-e-comunicação)
- [🚀 Funcionalidades do Site](#-funcionalidades-do-site)
  - [Públicas](#públicas)
  - [Administrativas (Admin)](#administrativas-admin)
- [📄 Licença](#-Licença)

---

## 🌐 Visão Geral
O site funciona como vitrine digital da empresa, destacando serviços especializados em **Microsoft Power Platform** e **Análise de Dados**.  
Também inclui uma **área administrativa segura** que possibilita gerenciar dinamicamente o portfólio de projetos.

---

## 🧰 Tecnologias Principais
**Frontend:**  
HTML5, CSS3, JavaScript (ES6+)  

**Backend:**  
Python 3.12 com AWS Lambda  

**Banco de Dados:**  
AWS DynamoDB (NoSQL)

**Infraestrutura AWS:**  
CloudFront, API Gateway, Lambda, DynamoDB, S3, Route 53, SES

**Autenticação (Planejada):**  
AWS Cognito

---

## 🏗️ Arquitetura da Solução
Projetada para ser **serverless**, **escalável**, **segura** e **de baixo custo**.

### 1. Frontend (Hospedagem e Entrega)
- **Amazon S3**: Armazena arquivos HTML, CSS, JS e imagens.  
- **Amazon CloudFront**: Distribuição global com cache, compressão e HTTPS.

### 2. Backend (API e Lógica Serverless)
- **API Gateway (HTTP API)**: Roteamento e regras de CORS.  
- **AWS Lambda (PinheiroProjectsAPI)**: Serviço central da aplicação.

**Rotas disponibilizadas:**

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/projects` | Lista projetos |
| POST | `/projects` | Cria projeto (Admin) |
| PUT | `/projects/{id}` | Atualiza projeto (Admin) |
| DELETE | `/projects/{id}` | Remove projeto (Admin) |
| POST | `/contact` | Processa contato e envia e-mail |

### 3. Dados e Comunicação
- **DynamoDB**:  
  - `PinheiroProjects`  
  - `PinheiroContacts`
- **Amazon SES**: Envio de e-mails transacionais.  
- **Route 53**: DNS do domínio `pinheirotecnologia.com`.

---

## 🚀 Funcionalidades do Site

### Públicas
- Listagem dinâmica de projetos via API  
- Filtros automáticos por categoria  
- Modal de detalhes com vídeos e embeds  
- Formulário de contato com:
  - envio assíncrono  
  - feedback visual  
  - gravação no DynamoDB  
  - notificação via SES  

### Administrativas (Admin)
- CMS interno (`admin.html`)  
- Funções:
  - criar  
  - editar  
  - excluir  
  - visualizar projetos  

---

📄 Licença

Todos os direitos reservados — Pinheiro Tecnologia.
