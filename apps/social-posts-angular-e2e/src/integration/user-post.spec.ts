import {
  mockUserListRequest,
  mockUserPostRequest,
  mockPostCommentRequest,
} from '../support/http-mock.po';
import { getUserCards } from '../support/user-list.po';
import {
  getPostBody,
  getPostImage,
  getPostTitle,
  getCommentItems,
} from '../support/user-post.po';
import { getUserPostItems } from '../support/user-profile.po';

describe('user-post', () => {
  beforeEach(() => {
    mockUserListRequest();
    mockUserPostRequest();
    mockPostCommentRequest();
    cy.visit('/');
    getUserCards().first().click();
    getUserPostItems().first().click();
  });

  it('should display the post elements', () => {
    getPostImage().should('exist');
    getPostTitle().should('exist');
    getPostBody().should('exist');
    getCommentItems().should('exist').and('have.length', 5);
  });
});
