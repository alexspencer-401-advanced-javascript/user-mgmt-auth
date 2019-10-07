# LAB - 13 and 14 | Backend Routes Using Authorization and Authentication

## User Management, Authorization, Authentication

### Author: Alex Spencer

### Links and Resources
* [submission PR](https://github.com/alexspencer-401-advanced-javascript/user-mgmt-auth/pull/1)
* [travis](https://travis-ci.com/alexspencer-401-advanced-javascript/user-mgmt-auth/builds/130740328)

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app

**Describe what npm scripts do**
- Scripts: 
    - "lint": "eslint .",
    - "pretest": "npm run lint",
    - "jest": "jest --runInBand --verbose",
    - "test": "npm run jest",
    - "test:coverage": "npm run test -- --coverage",
    - "test:watch": "npm run jest -- --watchAll",
    - "test:verbose": "npm run test -- --verbose",
    - "start": "node server.js",
    - "start:watch": "nodemon server.js",
    - "make:admin": "node lib/scripts/make-admin.js"
  