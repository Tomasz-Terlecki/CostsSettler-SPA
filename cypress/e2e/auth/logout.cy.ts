/// <reference types="cypress" />

import { login } from "cypress/support/methods";

describe('App logout tests', () => {

  beforeEach(() => {
    login();
  })
  
  it('Logout from app', () => {
    cy.get('#logout-button').click();

    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

});