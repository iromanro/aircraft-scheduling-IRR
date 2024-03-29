# Flight Scheduler

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Assumiptions

- Since all aircrafts have the same base and only differ in passanger size, user can freely switch between aircrafts as needed
- All aircrafts have a base of 'EGKK'. I assumed this was the starting airport but none of the flights depart from that airport so the user is free to start at any airport.
- Only one aircraft can be managed at a time. User must save the current aircraft's schedule before editing another one. Since there is no way to save a rotation to the BE, user is able to change dates or aircrafts at any time.
- Ideally, all selections are saved immediately to avoid conflicts with other users and race conditions but for this exercise, changes are only saved when user has a date and aircraft selected and at least one flight added to rotation.
- While not mentioned in the requirements, I have made the app mobile friendly

## Components

Reusable components for flights and aircraft lists can be found in the components folder.

## State management

Redux is used to store data in three different actions/reducers files in the app folder. This is done to make reducers easier to read and maintain.
