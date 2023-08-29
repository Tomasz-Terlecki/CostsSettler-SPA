/// <reference types="cypress" />

import { getRandomInt, login, registerTestUsers, setMobileViewport } from "cypress/support/methods";

describe('App logout mobile tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'logout.mobile' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix);
  })
  
  beforeEach(() => {
    setMobileViewport();
    login(emailPrefix);
  })
  
  it('Logout from app', () => {
    cy.get('#navbar-toggler').click();
    cy.get('#logout-button').click();

    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

});