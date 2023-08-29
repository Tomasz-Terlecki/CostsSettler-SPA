/// <reference types="cypress" />

import { getRandomInt, registerTestUsers, setMobileViewport } from "cypress/support/methods";

describe('App login mobile test', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'login.mobile' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix);
  })

  beforeEach(() => {
    setMobileViewport();

    cy.clearLocalStorage();
    cy.clearAllCookies();
    cy.visit('http://costssettler.com/');
  })


  it('Login page visible', () => {
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#kc-login').should('be.visible');
  });
  

  it('Username only', () => {
    cy.get('#username').type('invalid@email.com')
    cy.get('#kc-login').click();

    cy.get('#input-error').should('contain', 'Invalid username or password.');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });


  it('Password only', () => {
    cy.get('#password').type('password')
    cy.get('#kc-login').click();

    cy.get('#input-error').should('contain', 'Invalid username or password.');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });


  it('Invalid credentials', () => {
    cy.get('#username').type('test@gmail.com')
    cy.get('#password').type('123')
    cy.get('#kc-login').click();

    cy.get('#input-error').should('contain', 'Invalid username or password.');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });


  it('Valid credentials', () => {
    cy.get('#username').type(emailPrefix + '@gmail.com')
    cy.get('#password').type('password')
    cy.get('#kc-login').click();

    cy.get('.navbar')
      .should('be.visible');
  });

});