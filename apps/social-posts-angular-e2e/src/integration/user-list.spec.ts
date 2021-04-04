import { mockUserListRequest } from '../support/http-mock.po';
import { getUserCards, getUserProfile } from '../support/user-list.po';

describe('user-list', () => {
  beforeEach(() => {
    mockUserListRequest();
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
