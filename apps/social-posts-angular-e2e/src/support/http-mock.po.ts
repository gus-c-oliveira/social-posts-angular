export const mockUserListRequest = () => {
  cy.fixture('user-list.json').as('userListJSON');
  cy.server();
  cy.route('https://jsonplaceholder.typicode.com/users', '@userListJSON').as(
    'userList'
  );
};

export const mockUserPostRequest = () => {
  cy.fixture('user-post.json').as('userPostJSON');
  cy.server();
  cy.route(
    'https://jsonplaceholder.typicode.com/posts?userId=1',
    '@userPostJSON'
  ).as('userPost');
};

export const mockPostCommentRequest = () => {
  cy.fixture('user-post-comment.json').as('userPostCommentJSON');
  cy.server();
  cy.route(
    'https://jsonplaceholder.typicode.com/comments?postId=1',
    '@userPostCommentJSON'
  ).as('userPostComment');
};
