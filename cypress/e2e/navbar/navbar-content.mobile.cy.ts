/// <reference types="cypress" />

import { login, openPage, setMobileViewport } from "cypress/support/methods";

describe('Navbar content mobile tests', () => {

  before(() => {
    setMobileViewport();
    login();
  });

  beforeEach(() => {
    openPage('http://costssettler.com/');
    setMobileViewport();
  });

  it('Navbar toggler visible', () => {
    cy.get('#navbar-toggler').should('be.visible');
  });

  it('Navbar content', () => {
    cy.get('#navbar-toggler').click();

    cy.get('#charges-link')
      .should('be.visible')
      .should('have.text', 'Charges');
    cy.get('#circumstances-link')
      .should('be.visible')  
      .should('have.text', 'Circumstances');
    cy.get('#logo-img').should('be.visible');
    cy.get('#name-text')
      .should('be.visible')
      .should('contain', 'Test Test');
    cy.get('#logout-button')
      .should('be.visible')
      .should('contain', 'Logout');
    cy.get('#src-code-dropdown')
      .should('be.visible');
  });

  it('Navbar dropdown content', () => {
    cy.get('#navbar-toggler').click();
    cy.get('#src-code-dropdown').click();
      
    cy.get('#api-src-code')
      .should('be.visible')
      .should('contain', 'API Source code');
    cy.get('#spa-src-code')
      .should('be.visible')
      .should('contain', 'SPA Source code');
  });

  it('Navbar dropdown API source code link redirect', () => {
    cy.get('#navbar-toggler').click();
    cy.get('#src-code-dropdown').click();
    cy.get('#api-src-code').click();

    cy.url().should('contain', 'https://github.com/Tomasz-Terlecki/CostsSettler-API');
  });

  it('Navbar dropdown SPA source code link redirect', () => {
    cy.get('#navbar-toggler').click();
    cy.get('#src-code-dropdown').click();
    cy.get('#spa-src-code').click();

    cy.url().should('contain', 'https://github.com/Tomasz-Terlecki/CostsSettler-SPA');
  });

});