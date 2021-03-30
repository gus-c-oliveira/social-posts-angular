# Social Posts

A demo app that displays user profiles and posts.

In this demo:

- Nx for monorepo management to create libs and apps
- State management using Redux/NgRx
- Internationalization
- Communicating with a REST API using a service and HTTP requests
- Routing and route guarding
- Displaying a component in a modal window
- Unit testing using Jest
- End-to-End testing using Cypress
- Lazy-loading feature modules
- Responsive layout

# Play With It!

App is [deployed and live](https://social-posts-angular-gus-c-oliveira.netlify.app/) on Netlify!

# Technologies

- [Angular](https://angular.io/)
- [Nx](https://nx.dev/angular)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Stylelint](https://stylelint.io/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)

# Repository Structure

Apps:

- social-posts-angular is the main repository app.
- social-posts-angular-e2e contains the end-to-end tests for the main app.

Libs:

- comment-store: Store module for post's comments.
- language: module with utilities, components and classes for handling translations inside libs.
- post-store: Store module for user's posts.
- stats-shell: feature module for the Statistics app area.
- testing: utilities for use in unit tests.
- ui: presentational components.
- user-shell: feature module for the User app area.
- user-store: Store module for managing user entities.

# User Data and Images

The app performs HTTP requests to retrieve data from [JSON Placeholder](https://jsonplaceholder.typicode.com/), a fake online REST API for testing and prototyping.
Images are also retrieved via HTTP requests from [Lorem Picsum](https://picsum.photos/).

# Available Languages

The app contains a language selector that allows users to switch between English (US) and Brazilian Portuguese.

# Latest Improvements

This app is still under development. You can check the latest improvements in the [repository's pull requests](https://github.com/gus-c-oliveira/social-posts-angular/pulls?q=is%3Apr+is%3Aclosed).
