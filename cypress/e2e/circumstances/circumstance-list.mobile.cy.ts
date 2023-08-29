/// <reference types="cypress" />
import { getRandomInt, login, registerTestUsers, setMobileViewport } from '../../support/methods'

describe('Circumstance list mobile tests', () => {

  let random = getRandomInt(100000);
  let emailPrefix = 'circumstancelist.mobile' + random.toString();

  before(() => {   
    registerTestUsers(emailPrefix);
    setMobileViewport();
    login(emailPrefix);
    cy.visit('http://costssettler.com/circumstances');
  })

  beforeEach(() => {
    setMobileViewport();
  });

  it('Navbar test', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Add button visibility test', () => {
    cy.get('.add-button')
      .should('be.visible')
      .should('contain', 'Add');
  });

  it('Add button click test', () => {
    cy.get('.add-button').click();
    
    cy.url().should('contain', 'http://costssettler.com/circumstance/00000000-0000-0000-0000-000000000000');
    cy.get('.amount-label').should('be.visible');
  });

});