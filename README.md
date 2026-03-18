# Desafio QA – Plataforma Lacrei Saúde

## Objetivo

Este repositório documenta a execução de testes manuais e automatizados realizados na plataforma Lacrei Saúde.
O objetivo é validar **qualidade funcional, desempenho, acessibilidade, responsividade e segurança básica** da aplicação.

---

# 1. Configuração do Ambiente de Testes

### Pré-requisitos

Antes de executar os testes, é necessário possuir instalado:

- Node.js (versão 20 ou superior)
- npm
- Git
- Navegador Google Chrome ou Edge

Ferramentas utilizadas no projeto:

- Cypress 15
- Cucumber (`@badeball/cypress-cucumber-preprocessor`)
- Google Lighthouse + Puppeteer

### Clonar o repositório

```bash
git clone https://github.com/LeonamG/lacrei-qa-challenge.git
cd lacrei-qa-challenge
```

### Instalar dependências

```bash
npm install --legacy-peer-deps
```

---

# 2. Como Executar os Testes

## Testes Automatizados (Cypress)

### Interface gráfica (GUI)
Para executar os testes com interface visual, acompanhando cada passo em tempo real no navegador:

```bash
npx cypress open
```

### Linha de comando (headless)
Para executar os testes via terminal, sem abrir o navegador — ideal para CI/CD:

```bash
npx cypress run
```

### Executar uma feature específica

```bash
npx cypress run --spec "cypress/e2e/feature/login.feature"
npx cypress run --spec "cypress/e2e/feature/pesquisa.feature"
npx cypress run --spec "cypress/e2e/feature/agendamento.feature"
```

### Features automatizadas

| Feature | Cenários | Status |
|---|---|---|
| `login.feature` | Login válido, inválido, campos vazios, email inválido | ✅ Automatizado |
| `pesquisa.feature` | Busca válida, inconsistência, campo vazio, caracteres especiais | ✅ Automatizado |
| `agendamento.feature` | Fluxo E2E, telefone inválido, campo vazio | ✅ Automatizado |

### Features não automatizadas (limitação técnica)

| Feature | Motivo |
|---|---|
| Cadastro de usuário | Requer verificação por e-mail real |
| Recuperação de senha | Requer acesso a e-mail real |
| Verificação de telefone (SMS) | Requer código SMS real |

---

## Testes de Performance (Lighthouse)

Executar o relatório de performance:

```bash
node lighthouse-flow.js
```

### Resultados obtidos

| Etapa | Performance | Acessibilidade | SEO |
|---|---|---|---|
| Página inicial (Login) | 82 | 96 | 82 |
| Busca de profissionais | 100 | N/A | N/A |

**Análise:**
- ✅ **Performance 82/100** na página inicial — dentro do aceitável
- ✅ **Acessibilidade 96/100** — excelente, acima da meta de 90
- ✅ **Performance 100/100** na busca — resultado excelente
- ⚠️ **SEO 82/100** — abaixo da meta de 90, recomenda-se melhorias

---

## Testes de Carga (Puppeteer)

Executar o teste de carga definindo o número de usuários simultâneos no topo do arquivo:

```bash
node load-test.js
```

### Resultados obtidos (5 usuários simultâneos)

| Usuário | Login (ms) | Submit (ms) | Pesquisa (ms) | Status |
|---|---|---|---|---|
| #1 | 2192 | 2773 | 380 | ✅ OK (tentativa 2) |
| #2 | 1830 | 6643 | 719 | ✅ OK |
| #3 | 2066 | 6209 | 366 | ✅ OK |
| #4 | 1980 | 6488 | 403 | ✅ OK (tentativa 2) |
| #5 | N/A | N/A | N/A | ❌ ERRO (timeout na pesquisa) |

**Resumo:**

| Métrica | Valor |
|---|---|
| Usuários simulados | 5 |
| Sucesso | 4 (80%) |
| Falha | 1 (20%) |
| Média login | ~2017ms |
| Média submit | ~5528ms |
| Média pesquisa | ~467ms |
| Duração total | 53.23s |

**Análise:**
- ⚠️ **3 de 5 usuários** falharam na primeira tentativa — servidor instável sob carga
- 🔴 **1 de 5 usuários** falhou mesmo com retry — timeout no carregamento dos resultados
- 🟡 **Submit do login lento** (~5.5s) sob concorrência — degradação perceptível
- ✅ **Pesquisa rápida** (~467ms) nos casos de sucesso

---

## Testes Manuais

Os cenários de testes manuais estão documentados utilizando **Gherkin** na pasta `cypress/e2e/feature/`.

Exemplo de cenário:

```gherkin
Feature: Pesquisa de profissionais

  Scenario: Buscar profissionais com termo válido
    Given que o usuário está autenticado na plataforma
    When digita um termo de pesquisa
    And clica na lupa
    Then o sistema deve exibir profissionais relacionados à busca
```

---

# 3. Arquitetura da Automação

Os testes seguem o padrão **Page Object Model (POM)**, separando responsabilidades em três camadas:

- **Feature files** — cenários escritos em Gherkin (linguagem natural), descrevem o comportamento esperado
- **Step definitions** — conectam os cenários Gherkin ao código Cypress, chamando métodos das Pages
- **Page Objects** — encapsulam os seletores e ações de cada tela, tornando os testes reutilizáveis e fáceis de manter

### Fluxo de execução

```
pesquisa.feature
      ↓
pesquisa.steps.js   (When "realiza uma busca por...")
      ↓
PesquisaPage.js     (searchFor(), shouldShowResults()...)
      ↓
Cypress               (cy.get(), cy.type(), cy.click()...)
      ↓
Aplicação Lacrei Saúde
```

---

# 4. Organização do Repositório

```
Lacrei_Saude/
├── .github/
│   └── workflows/
│       └── cypress.yml              # Pipeline CI/CD
├── cypress/
│   └── e2e/
│       ├── feature/                 # Cenários em Gherkin (BDD)
│       │   ├── agendamento.feature
│       │   ├── login.feature
│       │   └── pesquisa.feature
│       ├── pages/                   # Page Objects (seletores e ações)
│       │   ├── AgendamentoPage.js
│       │   ├── LoginPage.js
│       │   └── PesquisaPage.js
│       └── steps/                   # Step definitions (Gherkin → Cypress)
│           ├── agendamento.steps.js
│           ├── login.steps.js
│           └── pesquisa.steps.js
├── cypress.config.js
├── lighthouse-flow.js               # Testes de performance (Lighthouse)
├── load-test.js                     # Testes de carga (Puppeteer)
├── BUGS.md                          # Registro detalhado de bugs
└── package.json
```

---

# 5. Pipeline CI/CD

Os testes rodam automaticamente a cada **commit** e **Pull Request** via GitHub Actions.

Para configurar as credenciais no CI:

1. Acesse **Settings → Secrets and variables → Actions**
2. Adicione os secrets:
   - `CYPRESS_USER_EMAIL`
   - `CYPRESS_USER_PASSWORD`

---

# 6. Checklist de Segurança Aplicado

Durante a execução dos testes foram verificados os seguintes pontos básicos de segurança:

- ✅ Validação de campos obrigatórios
- ✅ Proteção contra envio de formulários vazios
- ✅ Verificação de fluxo de autenticação
- ✅ Fluxo de recuperação de senha
- ✅ Controle de sessão do usuário
- ✅ Credenciais protegidas via variáveis de ambiente
- ✅ Senhas mascaradas nos logs do Cypress (`{ log: false }`)
- ✅ Testes executados em ambiente de staging

Possíveis melhorias identificadas:

- Ausência de botão de logout visível
- Fluxo incompleto de recuperação de senha
- Número de telefone não persiste entre sessões

---

# 7. Bugs Encontrados

| Bug | Descrição | Impacto |
|---|---|---|
| BUG-001 | Resultados inconsistentes na pesquisa | 🟡 Médio |
| BUG-002 | Layout quebrado no mobile após pesquisa | 🟡 Médio |
| BUG-003 | Logo não navega para tela de pesquisa | 🟡 Médio |
| BUG-004 | Verificação de telefone trava o agendamento | 🔴 Crítico |
| BUG-005 | Número de celular não salvo entre sessões | 🟡 Médio |
| BUG-006 | Ausência de botão de logout | 🟠 Alto |
| BUG-007 | Edição de perfil não funciona | 🟠 Alto |
| BUG-008 | Layout com áreas brancas/pretas no mobile | 🟡 Médio |
| BUG-009 | "Esqueci a senha" retorna para login | 🔴 Crítico |
| BUG-010 | Servidor instável sob carga simultânea | 🔴 Crítico |

> Detalhamento completo em `BUGS.md`

---

# 8. Processo de Rollback dos Testes Automatizados

Caso um teste automatizado apresente falha após uma atualização:

1. Verificar se houve alteração no DOM da aplicação
2. Atualizar seletores nos testes se necessário
3. Caso o erro seja causado por instabilidade, reverter o commit:

```bash
git log --oneline          # identificar o commit problemático
git revert <hash-do-commit>
git push origin main
```

Após o rollback, os testes rodam automaticamente no CI para validar a estabilidade.

---

# Conclusão

Durante os testes exploratórios e automatizados foram identificados **10 defeitos** na aplicação, incluindo problemas críticos nos fluxos de agendamento, recuperação de senha e instabilidade do servidor sob carga simultânea.

Os testes de performance demonstraram boa pontuação geral, com destaque para acessibilidade (96/100) e performance na busca (100/100). O SEO (82/100) e a instabilidade sob carga (80% de sucesso com 5 usuários simultâneos) são pontos de atenção para melhorias futuras.

Esses resultados demonstram a importância da aplicação de testes automatizados, exploratórios e de carga para garantir a qualidade da plataforma Lacrei Saúde.
