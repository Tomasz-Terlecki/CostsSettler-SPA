/// <reference types="cypress" />

import { login, setMobileViewport } from "cypress/support/methods";

describe('App logout tests', () => {

  beforeEach(() => {
    setMobileViewport();
    login();
  })
  
  it('Logout from app', () => {
    cy.get('#navbar-toggler').click();
    cy.get('#logout-button').click();

    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

});