import { getUserCards, getUserProfile } from '../support/user-list.po';

describe('user-list', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the user cards', () => {
    getUserCards().should('exist').and('have.length', 10);
  });

  it('should navigate to user profile after clicking a card', () => {
    getUserCards().first().click();
    cy.location('pathname').should('match', /\/profile$/);
    getUserProfile().should('exist');
  });
});
