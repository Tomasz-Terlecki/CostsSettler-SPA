/// <reference types="cypress" />
import { login, openPage, setMobileViewport } from '../../support/methods'

describe('Charge list tests', () => {

  before(() => {
    login();
  })

  beforeEach(() => {
    setMobileViewport();
    openPage('http://costssettler.com/charges');
  });

  it('Navbar test', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Filters form visibility test', () => {
    cy.get('.filters-form').should('be.visible');
    cy.get('#dateFromInput').should('be.visible');
    cy.get('#dateToInput').should('be.visible');
    cy.get('#searchInput').should('be.visible');
    cy.get('#amountFrom').should('be.visible');
    cy.get('#amountTo').should('be.visible');
  });

  it('Filter button visibility test', () => {
    cy.get('.filter-button')
      .should('be.visible')
      .should('contain', 'Filter');
  });

  it('Filter button visibility test', () => {
    cy.get('app-charge-list')
      .should('be.visible');
  });

});