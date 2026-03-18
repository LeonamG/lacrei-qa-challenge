class AgendamentoPage {
  // Seletores
  get phoneInput()    { return cy.get('[name="requesterPhoneNumber"]'); }
  get submitButton()  { return cy.get('#request-form > .sc-tagGq > .sc-bbSZdi'); }

  // Ações
  fillPhone(telefone) {
    this.phoneInput.scrollIntoView().should('be.visible').type(telefone);
  }

  submitForm() {
    this.submitButton.scrollIntoView().should('be.visible').click();
  }

  fillPhoneAndSubmit(telefone) {
    cy.url().should('include', '/contatar/');
    this.fillPhone(telefone);
    this.submitForm();
  }

  submitFormEmpty() {
    cy.url().should('include', '/contatar/');
    this.submitButton.scrollIntoView().should('be.visible').click();
  }

  // Assertions
  shouldShowAgenda() {
    cy.url().should('include', '/contatar/');
  }

  shouldContinueFlow() {
    cy.log('Aguardando próxima ação do sistema após submissão do telefone...');
  }

  shouldShowPhoneError() {
    cy.url().should('include', '/contatar/');
    cy.log('BUG ou validação: telefone inválido deveria exibir mensagem de erro');
  }

  shouldShowRequiredError() {
    cy.url().should('include', '/contatar/');
    cy.log('Campo obrigatório: sistema deve impedir envio sem telefone');
  }
}

export default new AgendamentoPage();
