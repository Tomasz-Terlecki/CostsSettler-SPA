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

  it('Add button test', () => {
    cy.get('.add-button')
      .should('be.visible')
      .should('contain', 'Add');
  });

});