# Atividade — Frontend do Sistema de Orçamentos (SENAC ORÇAMENTOS)

**Curso:** Análise e Desenvolvimento de Sistemas  
**Tipo:** Trabalho prático (Individual ou em duplas)  
**Prazo de entrega:** Todas as aulas restantes serão reservadas para a execução desta atividade. A entrega deverá ser realizada **até a última aula da unidade curricular**.

---

# 1. Cenário

Você foi contratado como desenvolvedor para criar o **frontend** de um sistema de orçamentos da empresa **SENAC ORÇAMENTOS**.

A API REST já foi criada e está disponível na pasta `api/` do repositório.

Dentro dela existe o documento:

```
api/README-API.md
```

Esse documento explica:

- funcionamento da API;
- contratos de dados;
- exemplos de payload;
- endpoints que deverão ser consumidos pelo frontend.

Também existe uma documentação interativa via Swagger:

```
http://localhost:3001/api/docs
```

> **Observação:** a porta padrão da API é **3001**. Caso a variável `PORT` seja alterada em `api/.env`, ajuste também a URL do Swagger.

Sua responsabilidade é implementar **somente o frontend (interface web)**, integrando corretamente com a API fornecida.

---

# 2. Documentação e autenticação

| Recurso | Local / URL |
|----------|-------------|
| Documentação da API | `api/README-API.md` |
| Swagger UI | `http://localhost:3001/api/docs` |
| Login | `POST /api/autenticacao/login` |
| Autenticação | Header `Authorization: Bearer <accessToken>` |

## Credenciais de demonstração

Após executar o arquivo `seed.sql`:

- **E-mail:** `demo@sistema.local`
- **Senha:** `senha123`

---

# 3. Requisitos para execução do ambiente

## Pré-requisitos

- Node.js (recomendado versões **20** ou **22**)
  - Consulte `api/.nvmrc`
- npm (versão 8 ou superior)
- PostgreSQL **ou**
- Docker + Docker Compose

---

## Preparação do banco de dados

1. Criar o banco de dados.
2. Aplicar o schema:

```
banco.sql
```

3. Popular os dados:

```
seed.sql
```

### Alternativa utilizando Docker

Na raiz do projeto execute:

```bash
docker compose up
```

Na primeira execução serão aplicados automaticamente:

- `banco.sql`
- `seed.sql`

---

## Configuração das aplicações

### API

Copiar:

```
api/.env.example
```

para

```
api/.env
```

e configurar:

- credenciais do PostgreSQL;
- `JWT_SECRET`.

### Frontend

Copiar:

```
frontend/.env.example
```

para

```
frontend/.env
```

configurando a URL da API.

---

## Executar a API

```bash
cd api
npm install
npm run start:dev
```

A API ficará disponível em:

```
http://localhost:3001
```

---

## Executar o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em:

```
http://localhost:3000
```

---

## Observação sobre JWT

O frontend deverá:

- armazenar o token JWT retornado no login (cookie ou outro mecanismo seguro);
- enviar o token nas requisições autenticadas;
- proteger as rotas internas;
- redirecionar usuários não autenticados para `/login`.

---

# 4. Requisitos funcionais do frontend

---

## 4.1 Layout global (área autenticada)

Nas telas internas implementar:

- Cabeçalho com identidade visual (logo e/ou nome do sistema);
- Menu de navegação contendo:
  - Dashboard;
  - Produtos;
  - Clientes;
  - Orçamentos;
  - Perfil;
- Rodapé;
- Proteção das rotas.

### Rotas públicas obrigatórias

- `/`
- `/login`

---

## 4.2 Páginas públicas

| Tela | Rota | Requisito |
|------|------|-----------|
| Frontpage | `/` | Página inicial apresentando o sistema com botão/link para login |
| Login | `/login` | Formulário integrado ao endpoint `POST /api/autenticacao/login` |

---

## 4.3 Dashboard

**Rota sugerida**

```
/dashboard
```

O dashboard deverá consumir todos os endpoints abaixo.

| # | Endpoint | Exibição |
|---|----------|----------|
| 1 | `GET /api/dashboard/resumo` | Cards com total de orçamentos, clientes e produtos ativos |
| 2 | `GET /api/dashboard/orcamentos-por-status` | Gráfico (pizza ou similar) por situação |
| 3 | `GET /api/dashboard/orcamentos-por-mes?ano=` | Gráfico da quantidade de orçamentos por mês |
| 4 | `GET /api/dashboard/valor-orcado-por-mes?ano=` | Gráfico do valor total orçado por mês (R$) |
| 5 | `GET /api/dashboard/top-clientes-orcamentos?limit=10` | Ranking dos clientes com maior número de orçamentos |
| 6 | `GET /api/dashboard/top-produtos-orcados?limit=10` | Ranking dos produtos mais presentes nos orçamentos |

> Os parâmetros `ano` e `limit` deverão ser utilizados conforme descrito em `api/README-API.md`.

---

## 4.4 Cadastro de produtos

**Rota sugerida**

```
/produtos
```

| Ação | Endpoint |
|------|----------|
| Listar produtos | `GET /api/produtos` |
| Cadastrar produto | `POST /api/produtos` |
| Alterar produto | `PATCH /api/produtos/:id` |
| Excluir produto | `DELETE /api/produtos/:id` |

### Filtros opcionais

- nome
- ativo

---

## 4.5 Cadastro de clientes

**Rota sugerida**

```
/clientes
```

| Ação | Endpoint |
|------|----------|
| Listar clientes | `GET /api/clientes` |
| Incluir cliente | `POST /api/clientes` |
| Alterar cliente | `PATCH /api/clientes/:id` |
| Apagar cliente | `DELETE /api/clientes/:id` |

### Filtros opcionais

- nome
- documento

---

## 4.6 Orçamentos

**Rota sugerida**

```
/orcamentos
```

| Ação | Endpoint |
|------|----------|
| Listar orçamentos | `GET /api/orcamentos` |
| Cadastrar orçamento | `POST /api/orcamentos` |
| Alterar orçamento | `PATCH /api/orcamentos/:id` |

### Filtros opcionais

- mês
- ano
- situação

> O cadastro e alteração de orçamentos utilizam um payload composto (cabeçalho + lista de itens). Consulte os exemplos em `api/README-API.md`.

> **Observação:** a API **não possui endpoint para exclusão de orçamentos**, portanto **não é necessário implementar botão de exclusão**.

---

## 4.7 Perfil do usuário

**Rota sugerida**

```
/usuario
```

A tela deverá:

- exibir os dados do usuário autenticado;
- permitir alterar nome e e-mail;
- permitir alterar a senha.

### Endpoints

| Método | Endpoint | Uso |
|---------|----------|-----|
| GET | `/api/usuarios/atual` | Carregar dados do usuário |
| PATCH | `/api/usuarios/atual` | Alterar nome completo e/ou e-mail |
| PATCH | `/api/usuarios/atual/senha` | Alterar senha |

### Informações exibidas

- ID
- E-mail
- Nome completo
- Perfil
- Ativo
- Data de criação
- Data de atualização

Para alteração da senha deverá existir um formulário contendo:

- senha atual;
- nova senha;
- confirmação da nova senha (validação realizada no frontend).

> O login continua sendo realizado através de:

```
POST /api/autenticacao/login
```

---

# 5. Critérios de entrega

Serão avaliados os seguintes itens:

- ✅ Frontpage (`/`) implementada e funcional;
- ✅ Cabeçalho, menu de navegação e rodapé nas telas internas;
- ✅ Produtos:
  - listar;
  - cadastrar;
  - alterar;
  - excluir;
- ✅ Clientes:
  - listar;
  - incluir;
  - alterar;
  - apagar;
- ✅ Orçamentos:
  - listar;
  - cadastrar;
  - alterar (com itens);
- ✅ Dashboard com os seis relatórios/endpoints.

> **Importante:** Caso não seja possível concluir todo o sistema, priorize primeiro as funcionalidades de CRUD e depois implemente o dashboard.

---

# ⚠️ Atenção

O uso de **Inteligência Artificial** está **liberado apenas para estilização das páginas (CSS)**.

Não será permitido utilizar IA para:

- componentes React;
- funções;
- chamadas de API;
- regras de negócio;
- demais recursos da aplicação.

Essas implementações deverão ser realizadas pelo aluno.

---

# 6. Referências no repositório

| Arquivo/Pasta | Conteúdo |
|---------------|----------|
| `api/README-API.md` | Documentação completa da API |
| `README.md` | Como executar o monorepo (API + Frontend + Docker) |
| `banco.sql` | Schema do banco de dados |
| `seed.sql` | Dados de demonstração |
| `frontend/` | Aplicação frontend |