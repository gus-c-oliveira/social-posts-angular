import {
  mockUserListRequest,
  mockUserPostRequest,
} from '../support/http-mock.po';
import { getUserCards } from '../support/user-list.po';
import {
  getAboutMeSection,
  getUserAddress,
  getUserCompany,
  getUserFriends,
  getUserName,
  getUserPost,
  getUserPostItems,
} from '../support/user-profile.po';

describe('user-profile', () => {
  beforeEach(() => {
    mockUserListRequest();
    mockUserPostRequest();
    cy.visit('/');
    getUserCards().first().click();
  });

  it('should display the user profile elements', () => {
    getUserName().should('contain', 'Bret');
    getAboutMeSection()
      .should('contain', 'Leanne Graham')
      .and('contain', '1-770-736-8031 x56442')
      .and('contain', 'hildegard.org')
      .and('contain', 'Sincere@april.biz');
    getUserFriends().should('exist').and('have.length', 1);
    getUserAddress()
      .should('contain', 'Kulas Light')
      .and('contain', 'Apt. 556')
      .and('contain', 'Gwenborough')
      .and('contain', '92998-3874')
      .and('contain', '-37.3159 | 81.1496');
    getUserCompany()
      .should('contain', 'Romaguera-Crona')
      .and('contain', 'Multi-layered client-server neural-net')
      .and('contain', 'harness real-time e-markets');
    getUserPostItems().should('exist').and('have.length', 3);
  });

  it('should navigate to friend profile when clicking on friend item', () => {
    getUserFriends().first().click();
    getUserName().should('contain', 'Antonette');
  });

  it('should display the post component when clicking an user post', () => {
    getUserPostItems().first().click();
    getUserPost().should('exist');
  });
});
