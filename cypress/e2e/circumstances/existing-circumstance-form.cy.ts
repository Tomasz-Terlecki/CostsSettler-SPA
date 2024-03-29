import { getRandomInt, registerTestUsers } from 'cypress/support/methods';
/// <reference types="cypress" />
import { addExampleCircumstance, login, openPage } from '../../support/methods'

describe('Existing circumstance form tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'existingcircumstanceform' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix, random.toString());
    login(emailPrefix);
    addExampleCircumstance(random.toString() + '1' + ' ' + random.toString() + '1');
  })

  beforeEach(() => {
    openPage('http://costssettler.com/circumstances');
    cy.get('.action-button')
      .first()
      .click();
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