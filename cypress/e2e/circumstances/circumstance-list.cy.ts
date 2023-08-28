/// <reference types="cypress" />
import { login, openPage } from '../../support/methods'

describe('Circumstance list tests', () => {

  before(() => {
    login();
  })

  beforeEach(() => {
    openPage('http://costssettler.com/circumstances');
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