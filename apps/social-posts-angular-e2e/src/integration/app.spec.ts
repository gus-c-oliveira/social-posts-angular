import { getHeader, getLanguageSelector, getUserList } from '../support/app.po';

describe('social-posts-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app header', () => {
    getHeader().should('exist');
  });

  it('should display the language selector', () => {
    getLanguageSelector().should('exist');
  });

  it('should initially display the user list', () => {
    getUserList().should('exist');
  });
});
