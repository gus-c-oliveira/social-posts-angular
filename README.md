# Social Posts

A demo app that displays user profiles and posts.

In this demo:

- State management using Redux/NgRx
- Internationalization
- Communicating with a REST API using a service and HTTP requests
- Routing
- Displaying a component in a modal window
- Unit testing using Jest
- Using Nx to create libs and apps
- Lazy-loading feature modules

# Play With It!

App is [deployed and live](https://social-posts-angular-gus-c-oliveira.netlify.app/) on Netlify!

# Technologies

- [Angular](https://angular.io/)
- [Jest](https://jestjs.io/)
- [Nx](https://nx.dev/angular) for monorepo development.
- [Stylelint](https://stylelint.io/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)

# App Structure

- UserListComponent retrieves and displays a list of users.
- UserProfileComponent displays the selected user's profile information and posts.
- UserPostComponent opens in a modal, showing the contents and comments of the selected post.

# User Data and Images

The app performs HTTP requests to retrieve data from [JSON Placeholder](https://jsonplaceholder.typicode.com/), a fake online REST API for testing and prototyping.
Images are also retrieved via HTTP requests from [Lorem Picsum](https://picsum.photos/).

# Available Languages

The app contains a language selector that allows users to switch between English (US) and Brazilian Portuguese.

# Latest Improvements

This app is still under development. You can check the latest improvements in the [repository's pull requests](https://github.com/gus-c-oliveira/social-posts-angular/pulls?q=is%3Apr+is%3Aclosed).
