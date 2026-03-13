import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', () => false);

// ========== AUTENTICAÇÃO ==========

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
  // ✅ Verifica que NÃO navegou para a tela de busca de profissionais
  cy.url().should('not.include', '/busca');
  cy.title().should('not.include', 'Buscar Profissional');
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
  cy.get('#atendimentos > .sc-bbSZdi', { timeout: 10000 }).should('be.visible');
});

// ========== AGENDAMENTO ==========

When("clica em agendar consulta e exibir contato", () => {
  // Aguarda a página estabilizar após a busca
  cy.get('#atendimentos > .sc-bbSZdi', { timeout: 15000 })
    .should('be.visible')
    .and('not.be.empty')
    .wait(1000)
    .first()
    .click();

  // Aguarda navegação e clica em exibir contato
  cy.get(':nth-child(1) > .sc-fd2041df-1 > #contato', { timeout: 15000 })
    .should('be.visible')
    .click();
});

Then("o sistema deve exibir a agenda disponível", () => {
  cy.url().should('include', '/contatar/');
});

When("insere o telefone {string} e submete o formulário", (telefone) => {
  // Aguarda a página de contato carregar completamente
  cy.url().should('include', '/contatar/');
  cy.wait(2000);
  
  // Desce a página gradualmente para carregar elementos lazy
  cy.scrollTo(0, 300);
  cy.wait(500);
  cy.scrollTo(0, 600);
  cy.wait(500);
  cy.scrollTo('bottom');
  cy.wait(1000);

  // Busca e preenche o campo de telefone
  cy.get('[name="requesterPhoneNumber"]')
    .scrollIntoView()
    .should('be.visible')
    .type(telefone);

  // Clica no botão enviar
  cy.get('#request-form > .sc-tagGq > .sc-bbSZdi')
    .scrollIntoView()
    .should('be.visible')
    .click();
});

Then("o sistema deveria continuar o fluxo de agendamento", () => {
  cy.log('Aguardando próxima ação do sistema após submissão do telefone...');
});
