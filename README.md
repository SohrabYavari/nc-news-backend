# NC NEWS Backend:

This backend is created using JavaScript, NodeJS, Express.Js and PSQL.

Steps to set project up:

- create .env files
  - `.env.dev`
  - `.env.test`
  - `.env.production`

- the following must be present in the files:


```
PGUSER=your_user
PGDATABASE=database_name
PGPASSWORD=your_password
PGHOST=localhost
PGPORT=5432
```

To run the project:
- `npm install`
- `npm run setup-dbs`
- `./run.zsh`


# File Structure:

```
├ __tests__
│   ├ controllerTests
│   │ ├ API Integration Test
|   ├ Unit tests
├ controllers
│   ├ API endpoints
├ db
│   ├ data
│   ├ seeds
├ middleware
│   ├ Error Handlers
├ models
│   ├ API Queries
├ utils
│   ├ util functions
├ routes
│   ├ API routes
```
