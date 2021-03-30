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
    cy.visit('/');
    getUserCards().first().click();
    getUserPostItems().first().click();
  });

  it('should display the post image', () => {
    getPostImage().should('exist');
  });

  it('should display the post title', () => {
    getPostTitle().should('exist');
  });

  it('should display the post body', () => {
    getPostBody().should('exist');
  });

  it('should display the post comments', () => {
    getCommentItems().should('exist').and('have.length', 5);
  });
});
