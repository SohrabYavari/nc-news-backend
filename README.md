# NC NEWS Backend: 
Steps to set project up: 
- create .env files
    - `.env.dev`
    - `.env.test`
- the following must be present in the files: 
```
PGUSER=your_user
PGDATABASE=database_name
PGPASSWORD=your_password
PGHOST=localhost
PGPORT=5432
```
Setting up dbs:
- npm run setup-dbs
- npm run seed-dev
- npm run test-seed

