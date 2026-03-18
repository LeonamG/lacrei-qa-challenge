import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PesquisaPage from "../pages/PesquisaPage";

When("digita um termo de pesquisa", () => {
  PesquisaPage.searchInput.clear().type('são paulo');
});

When("clica na lupa", () => {
  PesquisaPage.searchButton.click();
});

When("clica na lupa sem digitar nada", () => {
  PesquisaPage.searchInput.clear();
  PesquisaPage.searchButton.click();
  cy.wait(2000);
});

When("realiza uma busca por {string}", (termo) => {
  PesquisaPage.searchAndWait(termo);
});

When("realiza uma busca com resultados por {string}", (termo) => {
  PesquisaPage.searchAndExpectResults(termo);
});

When("retorna e busca novamente por {string}", (termo) => {
  PesquisaPage.goBackAndSearch(termo);
});

When("retorna para a tela anterior", () => {
  PesquisaPage.goBack();
});

Then("o sistema deve exibir profissionais relacionados à busca", () => {
  PesquisaPage.shouldShowResults();
});

Then("o sistema não deveria exibir resultados", () => {
  PesquisaPage.shouldNotShowResults();
});

Then("alguns resultados não são exibidos", () => {
  cy.log('BUG: resultados inconsistentes na pesquisa — termo válido não retorna profissionais');
});

Then("o sistema não deve exibir resultados para busca inválida", () => {
  PesquisaPage.shouldNotShowResults();
});

Then("o sistema deveria apresentar os mesmos resultados", () => {
  PesquisaPage.shouldShowSameResultsAfterBack();
});
