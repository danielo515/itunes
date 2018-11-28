# Itunes react clone

#### Small yet functional web app to have fun with react and redux

#### Created by: Danielo Rodriguez

## Running the app

This app has a dependency on its back-end.
It used to have a standalone version able to run without any kind of back-end, just by fetching static files and assets.
However, the more complex it got, the more difficult to keep it that way. You can try to execute the standalone version, but the correctness is not guaranteed.

As usual, there are a set of npm scripts to help you try and interact with this app.

1. First make sure to start the back-end server
   1. probably by going to the back-end folder and ...
   1. executing `npm start`. For more details about back-end operation please take a look to its [specific repository](https://github.com/danielo515/itunes-clone)
1. Make sure you have all dependencies installed by executing `npm install` or just `yarn`
1. Pick you favorite script to execute from the list below

The available scripts on this repository are:

- `npm start` a classic that never dies. It starts the development server with some sane defaults
- `npm run start-static` starts app configured for static operation, without a back-end. **Not stable**
- `npm run storybook` starts sotrybook on port 9009, with a small showcase of some components
- `npm run build` bundles the app and saves it to the build directory
- `npm run deploy` bundles the app and deploys it to github pages
