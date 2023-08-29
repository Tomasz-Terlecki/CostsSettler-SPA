/// <reference types="cypress" />

import { getRandomInt, login, openPage, registerTestUsers } from "cypress/support/methods";

describe('Navbar content tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'navbar' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix, random.toString());
    login(emailPrefix);
  })

  beforeEach(() => {
    openPage('http://costssettler.com/');
  });
  
  it('Navbar content', () => {
    cy.get('#charges-link')
      .should('be.visible')
      .should('have.text', 'Charges');
    cy.get('#circumstances-link')
      .should('be.visible')  
      .should('have.text', 'Circumstances');
    cy.get('#logo-img').should('be.visible');
    cy.get('#name-text')
      .should('be.visible')
      .should('contain', random.toString() + ' ' +  random.toString());
    cy.get('#logout-button')
      .should('be.visible')
      .should('contain', 'Logout');
    cy.get('#src-code-dropdown')
      .should('be.visible');
  });

  it('Navbar dropdown content', () => {
    cy.get('#src-code-dropdown').click();
      
    cy.get('#api-src-code')
      .should('be.visible')
      .should('contain', 'API Source code');
    cy.get('#spa-src-code')
      .should('be.visible')
      .should('contain', 'SPA Source code');
  });

  it('Navbar dropdown API source code link redirect', () => {
    cy.get('#src-code-dropdown').click();
    cy.get('#api-src-code').click();

    cy.url().should('contain', 'https://github.com/Tomasz-Terlecki/CostsSettler-API');
  });

  it('Navbar dropdown SPA source code link redirect', () => {
    cy.get('#src-code-dropdown').click();
    cy.get('#spa-src-code').click();

    cy.url().should('contain', 'https://github.com/Tomasz-Terlecki/CostsSettler-SPA');
  });

});