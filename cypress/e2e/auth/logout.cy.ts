/// <reference types="cypress" />

import { login, getRandomInt, registerTestUsers } from "cypress/support/methods";

describe('App logout tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'logout' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix);
  })

  beforeEach(() => {
    login(emailPrefix);
  })
  
  it('Logout from app', () => {
    cy.get('#logout-button').click();

    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

});