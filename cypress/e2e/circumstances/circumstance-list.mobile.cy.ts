/// <reference types="cypress" />
import { login, setMobileViewport } from '../../support/methods'

describe('Circumstance list tests', () => {

  before(() => {
    setMobileViewport();
    login();
    cy.visit('http://costssettler.com/circumstances');
  })

  beforeEach(() => {
    setMobileViewport();
  });

  it('Navbar test', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Add button visibility test', () => {
    cy.get('.add-button')
      .should('be.visible')
      .should('contain', 'Add');
  });

  it('Add button click test', () => {
    cy.get('.add-button').click();
    
    cy.url().should('contain', 'http://costssettler.com/circumstance/00000000-0000-0000-0000-000000000000');
    cy.get('.amount-label').should('be.visible');
  });

});