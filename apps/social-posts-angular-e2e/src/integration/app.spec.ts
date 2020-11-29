import { getGreeting } from '../support/app.po';

describe('social-posts-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app title', () => {
    getGreeting().contains('Rede Social');
  });
});
