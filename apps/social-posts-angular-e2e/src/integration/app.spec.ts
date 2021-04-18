import { getHeader, getLanguageSelector, getAuth } from '../support/app.po';

describe('social-posts-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the initial page components', () => {
    getHeader().should('exist');
    getLanguageSelector().should('exist');
    getAuth().should('exist');
  });
});
