Cypress.on('uncaught:exception', () => false)

describe('Busca de profissional', () => {

  it('Pesquisar Angélica de Sá', () => {

    cy.visit('/')

    cy.get('[name="email"]').type('qa.testes.leonam@gmail.com')
    cy.get('[name="password"]').type('LEONAMcs@1')

    cy.contains('Entrar').click()

    cy.get('[name="search"]')
      .should('be.visible')
      .clear()
      .type('Romero Guerra')

cy.get('button[aria-label="Pesquisar"]').click()
  })

})