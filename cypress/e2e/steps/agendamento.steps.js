import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PesquisaPage from "../pages/PesquisaPage";
import AgendamentoPage from "../pages/AgendamentoPage";

When("clica em agendar consulta e exibir contato", () => {
  PesquisaPage.clickFirstProfessional();
  PesquisaPage.clickContact();
});

Then("o sistema deve exibir a agenda disponível", () => {
  AgendamentoPage.shouldShowAgenda();
});

When("insere o telefone {string} e submete o formulário", (telefone) => {
  AgendamentoPage.fillPhoneAndSubmit(telefone);
});

When("submete o formulário sem preencher o telefone", () => {
  AgendamentoPage.submitFormEmpty();
});

Then("o sistema deveria continuar o fluxo de agendamento", () => {
  AgendamentoPage.shouldContinueFlow();
});

Then("o sistema deve exibir erro de telefone inválido", () => {
  AgendamentoPage.shouldShowPhoneError();
});

Then("o sistema deve exibir erro de campo obrigatório", () => {
  AgendamentoPage.shouldShowRequiredError();
});
