import { getUserCards, getUserProfile } from '../support/user-list.po';

describe.only('user-list', () => {
  beforeEach(() => {
    cy.fixture('user-list.json').as('userListJSON');
    cy.server();
    cy.route('https://jsonplaceholder.typicode.com/users', '@userListJSON').as(
      'userList'
    );
    cy.visit('/');
  });

  it('should display the user cards', () => {
    getUserCards().should('exist').and('have.length', 2);
  });

  it('should navigate to user profile after clicking a card', () => {
    getUserCards().first().click();
    cy.location('pathname').should('match', /\/profile$/);
    getUserProfile().should('exist');
  });
});
