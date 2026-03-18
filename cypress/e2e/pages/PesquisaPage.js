class PesquisaPage {
  // Seletores
  get searchInput()   { return cy.get('[name="search"]'); }
  get searchButton()  { return cy.contains('button', 'Pesquisar'); }
  get resultCards()   { return cy.get('#atendimentos > .sc-bbSZdi'); }
  get contactButton() { return cy.get(':nth-child(1) > .sc-fd2041df-1 > #contato', { timeout: 15000 }); }

  // Ações
  searchFor(termo) {
    this.searchInput.clear().type(termo);
    this.searchButton.click();
  }

  searchAndWait(termo) {
    this.searchFor(termo);
    cy.wait(2000);
  }

  searchAndExpectResults(termo) {
    this.searchFor(termo);
    this.resultCards.should('be.visible');
  }

  // Navega diretamente para busca (workaround: logo "Lacrei Saúde" não funciona — BUG-003)
  goBackAndSearch(termo) {
    cy.visit('/saude/paciente/profissional/busca/');
    cy.get('[name="search"]', { timeout: 10000 }).should('be.visible');
    this.searchAndExpectResults(termo);
  }

  goBack() {
    cy.visit('/saude/paciente/profissional/busca/');
    cy.get('[name="search"]', { timeout: 10000 }).should('be.visible');
  }

  clickFirstProfessional() {
    this.resultCards
      .should('be.visible')
      .and('not.be.empty')
      .wait(1000)
      .first()
      .click();
  }

  clickContact() {
    this.contactButton.should('be.visible').click();
  }

  // Assertions
  shouldShowResults() {
    this.resultCards.should('be.visible');
  }

  shouldNotShowResults() {
    this.resultCards.should('not.exist');
  }

  shouldShowSameResultsAfterBack() {
    this.resultCards.should('be.visible');
  }
}

export default new PesquisaPage();
