# 🌐 Pinheiro Tecnologia — Plataforma Web Serverless

![AWS](https://img.shields.io/badge/AWS-Serverless-orange?logo=amazonaws)
![CloudFront](https://img.shields.io/badge/CloudFront-CDN-blueviolet?logo=amazonaws)
![S3](https://img.shields.io/badge/S3-Static%20Hosting-red?logo=amazonaws)
![Lambda](https://img.shields.io/badge/Lambda-Python%203.11-ff9900?logo=aws-lambda)
![DynamoDB](https://img.shields.io/badge/DynamoDB-NoSQL-4053D6?logo=amazon-dynamodb)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-black?logo=githubactions)
![Status](https://img.shields.io/badge/Deploy-Automated-success)

Este reposititorio contém o código-fonte da plataforma web estática da Pinheiro Tecnologia, arquitetada para alta disponibilidade e baixa latência usando serviços serverless da AWS.

---

## 📑 1. Arquitetura da Solução e Tecnologias

A aplicação é dividida em dois workloads principais:

- **Frontend Estático** (Amazon S3 + CloudFront)
- **Backend Serverless** (API Gateway + AWS Lambda)

Não existe backend para projetos; todos os **mocks de portfólio estão no `script.js` do frontend**.

---

## 1.1. Pilha Tecnológica (Tech Stack)

| Componente     | Tecnologia Principal         | Finalidade                                                             |
|----------------|------------------------------|-------------------------------------------------------------------------|
| Frontend       | HTML5, CSS3, JavaScript ES6+ | Interface do usuário e lógica de apresentação.                         |
| Backend        | AWS Lambda (Python 3.11)     | Processamento do formulário de contato e validação de limites.         |
| Hospedagem     | Amazon S3                    | Armazenamento de arquivos estáticos.                                   |
| CDN & Cache    | Amazon CloudFront            | Distribuição global e otimização de cache.                             |
| Banco de Dados | AWS DynamoDB                 | Controle de contatos e rate limit.                                     |

---

## 1.2. Estrutura de Rotas (API Gateway)

Atualmente existe **somente uma rota implementada**:

| Método | Recurso (Path) | Descrição                                                                        | URL de Invocação                                                                 |
|--------|------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| POST   | /contact         | Processa formulário, valida limites, salva no DynamoDB e retorna status.        | https://jwqiah2rvj.execute-api.us-west-2.amazonaws.com/contact                    |

### Observações

- **Não há GET /projects** implementado.  
- Dados de portfólio são fornecidos pelo frontend através de mocks no `script.js`.

---

# 🔒 2. Data Model e Lógica de Rate Limiting

A Lambda implementa **dois tipos de limitações**, ambos usando DynamoDB:

---

## 2.1. Tabela `PinheiroContacts`

Armazena contatos enviados e controla quantas mensagens “abertas” um e-mail possui.

| Campo        | Tipo     | Descrição                                      |
|--------------|----------|------------------------------------------------|
| id           | String   | UUID do contato                                |
| createdAt    | String   | Timestamp ISO                                  |
| name         | String   | Nome do usuário                                |
| email        | String   | E-mail do usuário                              |
| subject      | String   | Assunto da mensagem                            |
| message      | String   | Conteúdo da mensagem                           |
| status       | String   | Sempre “NEW” ao criar                          |
| ip           | String   | IP de origem                                    |

Requer **GSI `EmailStatusIndex`** com chave (email, status).

---

## 2.2. Tabela `PinheiroRateLimit`

Controla quantos envios um IP pode fazer por dia.

| Campo        | Tipo   | Descrição                               |
|--------------|--------|-------------------------------------------|
| ip_date      | String | Combinação `IP#YYYY-MM-DD`                |
| submission_count | Number | Número de envios no dia              |
| expire_at    | Number | TTL configurado para expirar em 24h       |

---

## 2.3. Lógica executada pela Lambda (`lambda_function.py`)

Fluxo real conforme o código:

1. Trata requisições OPTIONS (CORS preflight)  
2. Normaliza método, path e IP  
3. Faz parsing e validação do JSON recebido  
4. **Rate Limit Técnico (por IP)**
   - Verifica quantos envios o IP fez no dia  
   - Limite: **3 envios/dia**  
5. **Rate Limit por E-mail**
   - Conta mensagens em aberto (`status = NEW`) no DynamoDB  
   - Limite: **5 mensagens pendentes**  
6. Se aprovado:
   - Salva o contato no DynamoDB  
   - Incrementa contagem diária do IP  
7. Retorna status de sucesso com o `contact_id`  
8. Qualquer outra rota recebe 404  

### Importante

- **Não há envio de e-mail implementado** no código atual.  
- Funções SES foram removidas do projeto ou ainda não implementadas.  

---

# 🛠️ 3. Guia de Desenvolvimento e Manutenção

---

## 3.1. Frontend (Código Estático)

Localização:

- `index.html`
- `assets/css/style.css`
- `assets/js/script.js`

Funções principais:

- `initIndexPage()`
- `initContactPage()`

Os **mocks de portfólio** estão no próprio `script.js` e são usados no carregamento da página.

---

## 3.2. Backend (Lógica Serverless)

### Arquivo principal

- `lambda_function.py`  
- Handler: `lambda_handler`

### Permissões necessárias

- `dynamodb:GetItem`
- `dynamodb:PutItem`
- `dynamodb:UpdateItem`
- `dynamodb:Query`

### Não implementado:

- **Envio de e-mail (SES)**
- **GET /projects**

---

### ⚠️ Nota Crítica

O deploy do backend **não é automatizado** pelo GitHub Actions.  
Alterações no `lambda_function.py` devem ser aplicadas **manualmente na AWS**.

---

# 🚀 4. Deploy Contínuo (CI/CD)

O frontend estático é publicado automaticamente via GitHub Actions.

---

## 4.1. Fluxo (`.github/workflows/s3_deploy.yml`)

- Gatilho: push no branch `main`
- Ignora arquivos como `README.md`
- Executa:
  - `aws s3 sync`
  - Invalidação seletiva no CloudFront

---

## 4.2. Secrets Necessários

| Secret                          | Finalidade                                 |
|---------------------------------|---------------------------------------------|
| AWS_ACCESS_KEY_ID              | Chave programática                           |
| AWS_SECRET_ACCESS_KEY          | Autenticação                                 |
| AWS_REGION                     | Região AWS                                   |
| AWS_S3_BUCKET                  | Bucket onde o site é publicado               |
| AWS_CLOUDFRONT_DISTRIBUTION_ID | Distribuição para invalidação                |

---

# 📄 Licença

Projeto proprietário da Pinheiro Tecnologia.  
Uso restrito e não autorizado publicamente.

---

# 📬 Contato

Website: https://pinheirotecnologia.com  
E-mail: contato@pinheirotecnologia.com
