/// <reference types="cypress" />
import { addExampleCircumstance, getRandomInt, login, openPage, registerTestUsers, registerTestUsersMobile, setMobileViewport } from 'cypress/support/methods';

describe('Existing circumstance form tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'existingcircumstanceform.mobile' + random.toString();

  before(() => {   
    setMobileViewport();
    registerTestUsers(emailPrefix, random.toString());
    login(emailPrefix);
    addExampleCircumstance(random.toString() + '1' + ' ' + random.toString() + '1');
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
      .should('be.visible');
    cy.get('#descriptionInput')
      .should('be.visible');
    cy.get('#dateInput')
      .should('be.visible');
    cy.get('#timeInput')
      .should('be.visible');
  });

});