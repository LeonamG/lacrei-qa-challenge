# Desafio QA – Plataforma Lacrei Saúde

## Objetivo

Este repositório documenta a execução de testes manuais e automatizados realizados na plataforma Lacrei Saúde.
O objetivo é validar **qualidade funcional, desempenho, acessibilidade, responsividade e segurança básica** da aplicação.

---

# 1. Configuração do Ambiente de Testes

### Pré-requisitos

Antes de executar os testes, é necessário possuir instalado:

* Node.js (versão 18 ou superior)
* npm
* Git
* Navegador Google Chrome ou Edge

Ferramentas utilizadas no projeto:

* Cypress
* Cucumber
* Google Lighthouse

### Clonar o repositório

```bash
git clone https://github.com/seuusuario/lacrei-qa-challenge.git
cd lacrei-qa-challenge
```

### Instalar dependências

```bash
npm install
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

Os testes automatizados cobrem:

* Fluxo de login
* Busca de profissionais
* Fluxo de cadastro
* Validação de elementos da interface

---

## Testes Manuais

Os cenários de testes manuais estão documentados utilizando **Gherkin**.

Localização:

```
/cypress/e2e/features
```

Exemplo de cenário:

```gherkin
Scenario: Buscar profissional de saúde
Given que estou na página inicial
When digito "Romero Guerra" no campo de busca
And clico em pesquisar
Then devo visualizar os resultados correspondentes
```

---

# 3. Organização da Documentação

A estrutura do projeto foi organizada da seguinte forma:

```
/cypress
   /e2e
      /features
      /step_definitions

/bugs
/performance
/accessibility
/responsiveness
```

Descrição das pastas:

| Pasta          | Conteúdo                           |
| -------------- | ---------------------------------- |
| bugs           | Registro de defeitos encontrados   |
| performance    | Resultados de testes de desempenho |
| accessibility  | Relatórios de acessibilidade       |
| responsiveness | Testes de responsividade           |

---

# 4. Checklist de Segurança Aplicado

Durante a execução dos testes foram verificados os seguintes pontos básicos de segurança:

✔ Validação de campos obrigatórios
✔ Proteção contra envio de formulários vazios
✔ Verificação de fluxo de autenticação
✔ Fluxo de recuperação de senha
✔ Controle de sessão do usuário
✔ Teste de comportamento após verificação de SMS

Possíveis melhorias identificadas:

* Ausência de botão de logout
* Fluxo incompleto de recuperação de senha

---

# 5. Processo de Rollback dos Testes Automatizados

Caso um teste automatizado apresente falha após uma atualização:

1. Verificar se houve alteração no DOM da aplicação.
2. Atualizar seletores utilizados nos testes.
3. Caso o erro seja causado por instabilidade do ambiente, realizar rollback do commit que introduziu a alteração.

Exemplo de rollback utilizando Git:

```bash
git revert <hash-do-commit>
```

Após rollback, os testes devem ser executados novamente para validação da estabilidade.

---

# Conclusão

Durante os testes exploratórios foram identificados defeitos relevantes na aplicação, incluindo problemas nos fluxos de busca, navegação e recuperação de senha.

Esses resultados demonstram a importância da aplicação de testes automatizados e exploratórios para garantir a qualidade da plataforma.
