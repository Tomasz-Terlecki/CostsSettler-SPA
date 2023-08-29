export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const openPage = (pageUrl: any) => {
  cy.intercept('GET', pageUrl).as('getData');
  cy.visit(pageUrl);
  cy.wait('@getData');
};

export const login = (emailPrefix: string) => {
  cy.clearLocalStorage();
  cy.clearAllCookies();
  openPage('http://costssettler.com/');
  cy.get('#username').type(`${emailPrefix}@gmail.com`);
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

export const addExampleCircumstance = (debtorName: string) => {
  openPage('http://costssettler.com/circumstance/00000000-0000-0000-0000-000000000000');
  cy.get('#amountInput').type('100');
  cy.get('#descriptionInput').type('Test description')
  cy.get('#dateInput').type(`${currentYear()}-${currentMonth()}-${currentDay()}`);
  cy.get('#timeInput').type('10:10');
  cy.get('#debtorsSelect')
    .select(debtorName)
    .first();

  cy.get('.save-button').click();
}

export const registerTestUsers = (emailPrefix: string, name?: string) => {
  cy.clearLocalStorage();
  cy.clearAllCookies();
  openPage('http://costssettler.com/');

  cy.contains('Register').click();
  cy.get('#firstName').type(name ?? 'Test');
  cy.get('#lastName').type(name ?? 'Test');
  cy.get('#email').type(emailPrefix + '@gmail.com');
  cy.get('#password').type('password');
  cy.get('#password-confirm').type('password');
  cy.get('.pf-c-button').click();
  
  cy.get('#logout-button').click();

  cy.contains('Register').click();
  cy.get('#firstName').type(name ? name + '1' : 'Test1');
  cy.get('#lastName').type(name ? name + '1' : 'Test1');
  cy.get('#email').type(emailPrefix + '1@gmail.com');
  cy.get('#password').type('password');
  cy.get('#password-confirm').type('password');
  cy.get('.pf-c-button').click();
  cy.get('#logout-button').click();
}


export const registerTestUsersMobile = (emailPrefix: string, name?: string) => {
  cy.clearLocalStorage();
  cy.clearAllCookies();
  openPage('http://costssettler.com/');

  cy.contains('Register').click();
  cy.get('#firstName').type(name ?? 'Test');
  cy.get('#lastName').type(name ?? 'Test');
  cy.get('#email').type(emailPrefix + '@gmail.com');
  cy.get('#password').type('password');
  cy.get('#password-confirm').type('password');
  cy.get('.pf-c-button').click();
  cy.get('#navbar-toggler').click();
  cy.get('#logout-button').click();

  cy.contains('Register').click();
  cy.get('#firstName').type(name ? name + '1' : 'Test1');
  cy.get('#lastName').type(name ? name + '1' : 'Test1');
  cy.get('#email').type(emailPrefix + '1@gmail.com');
  cy.get('#password').type('password');
  cy.get('#password-confirm').type('password');
  cy.get('.pf-c-button').click();
  cy.get('#navbar-toggler').click();
  cy.get('#logout-button').click();
}