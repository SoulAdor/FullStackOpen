// React frontend
npx create-react-app folder-name

npm start

// Create build file
npm run build

npm install axios --save

// Fake backend with json file
npm install json-server --save-dev
npx json-server --port 3001 --watch db.json
// in "scripts"
"server": "json-server -p3001 db.json"
npm run server

// Normalize css
npm install postcss-normalize --save-dev
@import "normalize.css"
// Or
npm install --save normalize.css
Add import 'normalize.css'; 

// Run production build from the root of the frontend project.
npm run build

// build:ui - create build and copy it to backend
"scripts": {
  "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
  "deploy": "git push heroku master",
  "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
  "logs:prod": "heroku logs --tail"
}

// Force props to be passed, check their types
npm install --save prop-types

// Linting
npm add --save-dev eslint-plugin-jest
// Initialize configuration
node_modules/.bin/eslint --init
// Running
npx eslint .
npm run eslint
// Check that hooks are written in right places
npm install eslint-plugin-react-hooks --save-dev

// React testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom
// Do not watch tests
CI=true npm test

// Install redux
npm install redux --save
// For connect
npm install --save react-redux

// Ensure immutability?
npm install --save-dev deep-freeze

// Asynchronous actions
npm install --save redux-thunk

// Devtools
npm install --save redux-devtools-extension

// Router
npm install --save react-router-dom

// Front end bootstrap
npm install --save react-bootstrap

//E2E testing
npm install --save-dev cypress

// Check dependencies
npm outdated --depth 0
npm audit
npm audit fix

// Webpack
npm install --save-dev webpack webpack-cli

-------------------------------------------------------------------------------------------------------------
// Backend

npm init

npm install express --save

// For automaticall restart of server
npm install --save-dev nodemon
// in package.json
"watch": "nodemon index.js",
npm run watch

Postman for testing HTTP commands (GET, POST, DELETE...) OR VS Code REST client plugin

// For logging
npm install --save morgan

// For cross origin access control
npm install cors --save

To make express show static content, the page index.html and the JavaScript etc. it fetches, we need built-in middleware from express called static.

// Heroku
heroku create
git push heroku master
heroku ps:scale web=1
heroku open

// Go to proxy address if current one not found
"proxy": "http://localhost:3001"

// Debug in dev tools
node --inspect index.js

// Mongo DB
npm install mongoose --save
npm install --save mongoose-unique-validator

// For environment variables
npm install dotenv --save

// Linter
npm install eslint --save-dev
node_modules/.bin/eslint --init
"scripts": {
"lint": "eslint ."
}

// For testing
npm install --save-dev jest
// Global install
npm install -g jest

scripts: "test": "jest --verbose"
in the end:
"jest": {
   "testEnvironment": "node"
 }

// So NODE_ENV works
npm install --save-dev cross-env

// Testing API
npm install --save-dev supertest

// Generate password hashes
npm install bcrypt --save
// For windows
npm install bcryptjs -- save

// For tokens
npm install jsonwebtoken --save

// Removes express vulnerabilities
npm install helmet --save

// Security reasons
npm config set ignore-scripts true