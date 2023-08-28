export const openPage = (pageUrl: any) => {
  cy.intercept('GET', pageUrl).as('getData');
  cy.visit(pageUrl);
  cy.wait('@getData');
};

export const login = () => {
  cy.clearLocalStorage();
  cy.clearAllCookies();
  openPage('http://costssettler.com/');
  cy.get('#username').type('test@gmail.com');
  cy.get('#password').type('password');
  cy.get('#kc-login').click()
};

export const setMobileViewport = () => {
  // iPhone 13 viewport
  cy.viewport(390, 844);
}
