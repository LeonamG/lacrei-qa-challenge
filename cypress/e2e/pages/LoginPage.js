class LoginPage {
  // Seletores
  get emailInput()    { return cy.get('[name="email"]'); }
  get passwordInput() { return cy.get('[name="password"]'); }
  get loginButton()   { return cy.contains('button', 'Entrar'); }
  get searchField()   { return cy.get('[name="search"]', { timeout: 10000 }); }

  // Ações
  visit() {
    cy.visit('/');
  }

  fillEmail(email) {
    this.emailInput.type(email);
  }

  fillPassword(password) {
    this.passwordInput.type(password, { log: false });
  }

  submit() {
    this.loginButton.click();
  }

  loginWith(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  loginAsDefault() {
    this.loginWith(Cypress.env('userEmail'), Cypress.env('userPassword'));
  }

  // Assertions
  shouldBeLoggedIn() {
    this.searchField.should('be.visible');
  }

  shouldStayOnLogin() {
    cy.url().should('not.include', '/busca');
    cy.title().should('not.include', 'Buscar Profissional');
  }

  shouldRedirectToSearch() {
    cy.url().should('include', '/busca');
  }
}

export default new LoginPage();
