import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Cypress.on('uncaught:exception', () => false);

Given("que o usuário possui uma conta cadastrada", () => {
  LoginPage.visit();
});

Given("que o usuário está na tela de login", () => {
  LoginPage.visit();
});

Given("que o usuário está autenticado na plataforma", () => {
  LoginPage.loginAsDefault();
  LoginPage.shouldBeLoggedIn();
});

When("informa email e senha corretos", () => {
  LoginPage.fillEmail(Cypress.env('userEmail'));
  LoginPage.fillPassword(Cypress.env('userPassword'));
});

When("informa email e senha incorretos", () => {
  LoginPage.fillEmail('email.invalido@teste.com');
  LoginPage.fillPassword('SenhaErrada123');
});

When("informa email correto e senha incorreta", () => {
  LoginPage.fillEmail(Cypress.env('userEmail'));
  LoginPage.fillPassword('SenhaErrada123');
});

When("informa email com formato inválido {string}", (email) => {
  LoginPage.fillEmail(email);
  LoginPage.fillPassword('SenhaQualquer123');
});

When("deixa os campos em branco", () => {
  // campos permanecem vazios
});

When("clica em entrar", () => {
  LoginPage.submit();
});

Then("o sistema deve permitir acesso à plataforma", () => {
  LoginPage.shouldBeLoggedIn();
});

Then("redirecionar para a tela de pesquisa", () => {
  LoginPage.shouldRedirectToSearch();
});

Then("o sistema deve exibir mensagem de erro", () => {
  LoginPage.shouldStayOnLogin();
});

Then("o sistema não deve permitir o envio do formulário", () => {
  LoginPage.shouldStayOnLogin();
});
