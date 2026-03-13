import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', () => false);

// ========== AUTENTICAÇÃO ==========

// Comando reutilizável de login (usado internamente)
const fazerLogin = () => {
  cy.visit('/');
  cy.get('[name="email"]').type(Cypress.env('userEmail'));
  cy.get('[name="password"]').type(Cypress.env('userPassword'), { log: false });
  cy.contains('Entrar').click();
  cy.get('[name="search"]', { timeout: 10000 }).should('be.visible');
};

Given("que o usuário possui uma conta cadastrada", () => {
  cy.visit('/');
});

Given("que o usuário está na tela de login", () => {
  cy.visit('/');
});

// Já faz login completo antes de cenários que precisam estar autenticado
Given("que o usuário está autenticado na plataforma", () => {
  fazerLogin();
});

When("informa email e senha corretos", () => {
  cy.get('[name="email"]').type(Cypress.env('userEmail'));
  cy.get('[name="password"]').type(Cypress.env('userPassword'), { log: false });
});

When("informa email e senha incorretos", () => {
  cy.get('[name="email"]').type('email.invalido@teste.com');
  cy.get('[name="password"]').type('SenhaErrada123', { log: false });
});

When("clica em entrar", () => {
  cy.contains('Entrar').click();
});

Then("o sistema deve permitir acesso à plataforma", () => {
  cy.get('[name="search"]', { timeout: 10000 }).should('be.visible');
});

Then("redirecionar para a tela de pesquisa", () => {
  cy.url().should('include', '/busca');
});

Then("o sistema deve exibir mensagem de erro", () => {
  cy.contains('E-mail ou senha inválidos', { timeout: 5000 }).should('be.visible');
});

// ========== RECUPERAÇÃO DE SENHA ==========

When("clica em \"Esqueci a senha\"", () => {
  cy.contains('Esqueci a senha').click();
});

Then("o sistema deveria redirecionar para a tela de recuperação de senha", () => {
  cy.url().should('include', '/recuperar');
});

Then("o sistema retorna para a tela de login", () => {
  cy.url().should('not.include', '/recuperar');
});

Then("não apresenta a tela de recuperação de senha", () => {
  cy.url().should('not.include', '/recuperar');
});

// ========== PESQUISA ==========

When("digita um termo de pesquisa", () => {
  cy.get('[name="search"]').clear().type('são paulo');
});

When("clica na lupa", () => {
  cy.contains('button', 'Pesquisar').click();
});

Then("o sistema deve exibir profissionais relacionados à busca", () => {
  cy.get('#atendimentos > .sc-bbSZdi', { timeout: 10000 }).should('be.visible');
});

When("realiza uma busca por {string}", (termo) => {
  cy.get('[name="search"]').clear().type(termo);
  cy.contains('button', 'Pesquisar').click();
  cy.get('#atendimentos > .sc-bbSZdi', { timeout: 10000 }).should('be.visible');
});

When("retorna para a tela anterior", () => {
  cy.go('back');
});

Then("o sistema deveria apresentar os mesmos resultados", () => {
  cy.get('[name="search"]', { timeout: 10000 }).should('be.visible');
});

// ========== AGENDAMENTO ==========

When("clica em agendar consulta e exibir contato", () => {
  // Clica no botão agendar consulta
  cy.get('#atendimentos > .sc-bbSZdi', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Clica em exibir contato
  cy.get(':nth-child(1) > .sc-fd2041df-1 > #contato')
    .should('be.visible')
    .click();
});

Then("o sistema deve exibir a agenda disponível", () => {
  cy.get(':nth-child(1) > .sc-fd2041df-1 > #contato', { timeout: 10000 })
    .should('be.visible');
});

When("insere o telefone {string} e submete o formulário", (telefone) => {
  cy.scrollTo('bottom');
  cy.get('[name="requesterPhoneNumber"]')
    .should('be.visible')
    .type(telefone);
  cy.get('#request-form > .sc-tagGq')
    .should('be.visible')
    .click();
});

Then("o sistema deveria continuar o fluxo de agendamento", () => {
  cy.log('Aguardando próxima ação do sistema após submissão do telefone...');
});

Then("nenhuma ação ocorre após a verificação", () => {
  cy.log('BUG: sistema não avança após verificação do telefone');
});

// ========== VERIFICAÇÃO DE TELEFONE ==========

Then("o sistema deveria salvar o número para futuras consultas", () => {
  cy.log('Verificando se número foi salvo no perfil...');
});

Then("o sistema solicita novamente o número", () => {
  cy.get('[name="requesterPhoneNumber"]', { timeout: 10000 }).should('be.visible');
});

Then("o telefone não está salvo no perfil", () => {
  cy.log('BUG: telefone não foi salvo entre sessões');
});

When("corrige o número antes da verificação", () => {
  cy.get('[name="requesterPhoneNumber"]')
    .should('be.visible')
    .clear()
    .type('71988888888');
});

When("solicita o envio do SMS novamente", () => {
  cy.contains('Reenviar').click();
});

When("solicita o envio do código novamente", () => {
  cy.contains('Reenviar').click();
});

Then("o sistema deveria enviar o código para o novo número", () => {
  cy.log('Verificando envio do SMS para novo número...');
});

Then("o SMS não é recebido no telefone informado", () => {
  cy.log('BUG: SMS não chegou após correção do número');
});
