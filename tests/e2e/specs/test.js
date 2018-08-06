// https://docs.cypress.io/api/introduction/api.html

describe('LobbyClient test', () => {
  it('Already installed game', () => {
    cy.visit('/');
    cy.contains('Welcome to League Sandbox');
    cy.contains('NO').click();
    cy.contains('Step 2');
    cy.get('[type="text"]').type('C:/LeagueSandbox/GameFolder');
    cy.contains('Next').click();
  });

  it('Download game', () => {
    cy.visit('/');
    cy.contains('Welcome to League Sandbox');
    cy.contains('YES').click();
    cy.contains('START DOWNLOAD').click().click();
    cy.contains('JOIN LEAGUE SANDBOX NOW');
  });

  it('Login screen', () => {
    cy.visit('/#/login');
    cy.contains('JOIN LEAGUE SANDBOX NOW');
    cy.contains('Summoner name');
    cy.contains('Host');
    cy.contains('Port');
  });

  it('Not logged should redirect at loggin', () => {
    cy.visit('/#/home');
    cy.url().should('include', '/login');
  });

  it('Create lobby', () => {
    cy.visit('/#/login');
    cy.get('[name="username"]').type('Blitzcrank');
    cy.contains('Host lobby').click();
    cy.url().should('include', '/lobby');
  });
});
