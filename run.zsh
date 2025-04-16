#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

# Run the commands to seed the Database
echo -e "${RED}Seeding the database...${RESET}"
node './db/seeds/run-seed.js'
echo -e "${GREEN}Databse Seeded${RESET}"

# Run the server
npx nodemon './listen.js'