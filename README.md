[Node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[Webpack]: https://webpack.github.io/
[Babel]: https://babeljs.io/
[React]: https://facebook.github.io/react/
[Express]: https://expressjs.com/
[Mocha]: https://mochajs.org/
[MongoDB]: https://www.mongodb.com/
[Redux]: http://redux.js.org/docs/introduction/
[DraftJS]: https://facebook.github.io/draft-js/
[React-Datetime]: https://github.com/YouCanBookMe/react-datetime
[MomentJS]: http://momentjs.com/
[Bootstrap]: http://getbootstrap.com/
[package.json]: https://github.com/hmc-godaddy-clinic-16/editor-section/blob/master/package.json

# GoDaddy Clinic

This repo contains code for the HMC GoDaddy clinic team's project. 

## Tech Stack

The most important dependencies for this app are [Node] and [npm]. [npm] handles
installation of all other dependencies.

Here are the major technologies we used:
   + [Node] - JavaScript framework
   + [npm] - Package manager for Node
   + [Webpack] - Module bundler for Node
   + [Babel] - Transpiler so ES6 JavaScript syntax can be used 
   + [React] - Client side JavaScript framework
   + [Redux] - Central app data storage
   + [Mocha] - Testing 
   + [Express] - Server and API
   + [MongoDB] - Persistent storage

Additional dependencies: 
   + [DraftJS] - Provides text editing capabilities
   + [React-Datetime] - Provides a date and time picking UI
   + [MomentJS] - Library for better date and time handling
   + [Bootstrap] - Front end, mobile first framework
   + See [package.json] for a complete list of dependencies


### Application Structure
The client side code for this app is contained in the src directory.
Within that directory are the actions, reducers, and components folders.
Actions and reducers are related to [Redux] and handle updating the 
application state. Components are [ReactJS] components, and provide
different pieces of the UI logic. 

The server side code for this app is contained in the server directory.
server.js provides an API and handles communication with the database.
The client side code makes calls to that API to persist changes.

## How to get and run this code

### Getting the code
You can download or clone this repository.

### Setting up a client side environment
After you've got the code, go to the top-level directory (the directory
that contains the `package.json` file) and run:
```
npm install
```
_(wait for all the packages to install)_

Note that after this step, you will be able to compile and run the
project. However, it is necessary to set up a server-side environment
through MongoDB to enable data storage/retrieval (see below).
Additionally, in order to enable social media posting, it will also
be necessary to run a Facebook server.

 
### Running the code
Run the command
```
npm start
```
and visit the following URL: [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

Now, you should be able to edit and live-reload your code.

### Setting up a server side environment

It's necessary to have a local installation of [MongoDB] to successfully run the 
server side code locally. See MongoDB's documentation for instructions on
installation and set up at this link: https://docs.mongodb.com/manual/installation/.
You'll also need MongoDB to be running in order for this to work. 

Once you have MongoDB installed, while in the Server directory of this project,
run 
```
node server.js
```
If you now visit localhost:3000/announcements, you should now see something 
similar to the following:
```
[{"_id":"583114642a35736e4aacc3ef","gotAnnouncement":false,"title":"BUY ONE DOZEN GET ONE DOZEN FREE","bodyText":"<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply.","startDate":"2016-06-27T09:00:00.000Z","endDate":"2016-11-05T10:00:00.000Z","imgUrl":"http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg","link":"http://www.thedonutmanca.com/"}]
```
Take note of the value of _id. Because our app does not handle user login or
authentication, we currently use this value to identify what should be accessed in the 
database.

In order for the client side code to communicate properly with the database, in the file src/constants.js,
change the value of SERVER_URL to http://localhost:3000 and change DEFAULT_ID to the value of ```_id```
you saw when you visited http://localhost:3000/announcements.

When you run the app, your changes in the editor should now be persistent.

### Setting up the social media server

In order to enable login/posting to Twitter and Facebook, it is necessary to run a local server
that supports this. 

### Running unit tests
Run the tests
```
npm test
```
Generate a test code coverage report
```
npm run cover
```
the report will be published to `coverage/lcov-report/index.html`


