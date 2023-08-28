/// <reference types="cypress" />
import { addExampleCircumstance, currentDay, currentMonth, currentYear, login, openPage, setMobileViewport } from '../../support/methods'

describe('Existing circumstance form tests', () => {

  before(() => {
    setMobileViewport();
    login();
    addExampleCircumstance();
  })

  beforeEach(() => {
    openPage('http://costssettler.com/circumstances');
    cy.get('.action-button')
      .first()
      .click();
    setMobileViewport();
  });

  it('Navbar test', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Adding circumstance form test', () => {
    cy.get('#amountInput')
      .should('be.disabled');
    cy.get('#descriptionInput')
      .should('be.disabled');
    cy.get('#dateInput')
      .should('be.disabled');
    cy.get('#timeInput')
      .should('be.disabled');
  });

});