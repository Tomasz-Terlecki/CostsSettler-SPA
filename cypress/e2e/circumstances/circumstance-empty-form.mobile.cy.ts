/// <reference types="cypress" />
import { login, openPage, setMobileViewport } from '../../support/methods'

describe('Circumstance empty form tests', () => {

  before(() => {
    login();
  })

  beforeEach(() => {
    setMobileViewport();
    openPage('http://costssettler.com/circumstance/00000000-0000-0000-0000-000000000000');
  });

  it('Navbar test', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Adding circumstance form test', () => {
    cy.get('#amountInput').should('be.visible');
    cy.get('#descriptionInput').should('be.visible');
    cy.get('#dateInput').should('be.visible');
    cy.get('#timeInput').should('be.visible');
    cy.get('#debtorsSelect').should('be.visible');
  });

  it('Add button visibility test', () => {
    cy.get('.save-button')
      .should('be.visible')
      .should('contain', 'Add');
  });

});