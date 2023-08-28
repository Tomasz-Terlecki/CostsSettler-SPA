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

export const currentYear = (): string => new Date().getFullYear().toString();

export const currentMonth = (): string => {
  let month = (new Date().getMonth() + 1).toString();
  month = month.length === 1 
    ? '0' + month
    : month;
  return month;
};

export const currentDay = (): string => {
  let day = new Date().getDate().toString();
  day = day.length === 1 
    ? '0' + day
    : day;
  return day;
}

export const addExampleCircumstance = () => {
  openPage('http://costssettler.com/circumstance/00000000-0000-0000-0000-000000000000');
  cy.get('#amountInput').type('100');
  cy.get('#descriptionInput').type('Test description')
  cy.get('#dateInput').type(`${currentYear()}-${currentMonth()}-${currentDay()}`);
  cy.get('#timeInput').type('10:10');
  cy.get('#debtorsSelect')
    .select('Test1 Test1');

  cy.get('.save-button').click();
}