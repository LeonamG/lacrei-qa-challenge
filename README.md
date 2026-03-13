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

## Testes Automatizados

Abrir interface do Cypress:

```bash
npx cypress open
```

Executar testes em modo headless:

```bash
npx cypress run
```

Executar uma feature específica:

```bash
npx cypress run --spec "cypress/e2e/login.feature"
npx cypress run --spec "cypress/e2e/agendamento.feature"
npx cypress run --spec "cypress/e2e/pesquisa.feature"
```

### Features automatizadas

| Feature | Cenários | Status |
|---|---|---|
| `login.feature` | Login válido e inválido | ✅ Automatizado |
| `pesquisa.feature` | Busca de profissionais e bug de inconsistência | ✅ Automatizado |
| `agendamento.feature` | Fluxo E2E completo | ✅ Automatizado |

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

## Testes Manuais

Os cenários de testes manuais estão documentados utilizando **Gherkin** na pasta `cypress/e2e/`.

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

# 3. Organização da Documentação

```
Lacrei_Saude/
├── .github/
│   └── workflows/
│       └── cypress.yml        # Pipeline CI/CD
├── cypress/
│   └── e2e/
│       ├── agendamento.feature
│       ├── login.feature
│       ├── pesquisa.feature
│       └── lacrei_saude.js    # Step definitions
├── cypress.config.js
├── lighthouse-flow.js         # Testes de performance
└── package.json
```

---

# 4. Pipeline CI/CD

Os testes rodam automaticamente a cada **commit** e **Pull Request** via GitHub Actions.

Para configurar as credenciais no CI:

1. Acesse **Settings → Secrets and variables → Actions**
2. Adicione os secrets:
   - `CYPRESS_USER_EMAIL`
   - `CYPRESS_USER_PASSWORD`

---

# 5. Checklist de Segurança Aplicado

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

# 6. Bugs Encontrados

### BUG-001 — Verificação de telefone interrompe fluxo de agendamento
- **Impacto:** Crítico
- **Passos:**
  1. Fazer login → buscar profissional → clicar em agendar
  2. Inserir número de telefone e submeter
  3. Nenhuma ação ocorre após a verificação
- **Esperado:** Sistema continua o fluxo após verificação
- **Atual:** Tela congela sem feedback

### BUG-002 — Número de telefone não é salvo entre sessões
- **Impacto:** Médio
- **Passos:**
  1. Informar número durante agendamento
  2. Iniciar novo agendamento
  3. Sistema solicita o número novamente
- **Esperado:** Número salvo no perfil do usuário

### BUG-003 — SMS não chega após correção do número
- **Impacto:** Alto
- **Passos:**
  1. Digitar número incorreto → corrigir → solicitar reenvio
  2. SMS não é recebido no número corrigido

### BUG-004 — Resultados inconsistentes na pesquisa
- **Impacto:** Médio
- **Passos:**
  1. Buscar por termo válido como "psicologa"
  2. Nenhum resultado é exibido mesmo com profissionais cadastrados
- **Esperado:** Resultados exibidos para termos válidos

---

# 7. Processo de Rollback dos Testes Automatizados

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

Durante os testes exploratórios foram identificados defeitos relevantes na aplicação, incluindo problemas nos fluxos de agendamento, verificação de SMS e recuperação de senha.

Os testes de performance demonstraram boa pontuação geral, com destaque para acessibilidade (96/100) e performance na busca (100/100). O SEO (82/100) é um ponto de atenção para melhorias futuras.

Esses resultados demonstram a importância da aplicação de testes automatizados e exploratórios para garantir a qualidade da plataforma Lacrei Saúde.
