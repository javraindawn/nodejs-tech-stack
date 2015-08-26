#!/usr/bin/env bash

# load env vars
if [ -f .envvars ]; then
  source .envvars
else
  echo "Could not find a .envvars file. Make sure you copy the correct one from the envs directory"
  exit 1
fi

# If no NODE_ENV is set, die
if [ -z $NODE_ENV ]; then
  echo "Your .envvars file must declare a NODE_ENV var"
  exit 1
fi

# Check to see if our node_modules directory does not exist
if [ ! -d $PROJECT_ROOT/node_modules ]; then
  # If not, it was probably wiped out by Vagrant mounting a host volume
  # on the start of the container, which wipes out the the node_modules
  # folder that was created by the image. So we will just copy it back in
  # from the /tmp folder just like we do in the Dockerfile
  cp -a /tmp/app/node_modules $PROJECT_ROOT
fi

if psql -lqt | cut -d \| -f 1 | grep -w $LOCAL_DB_NAME; then
  echo "$LOCAL_DB_NAME database already exists...moving on"
else
  echo "$LOCAL_DB_NAME database does not exist"
  echo "...create MAIN user $LOCAL_DB_USER with password $LOCAL_DB_PASS"
  psql -c "create user \"$LOCAL_DB_USER\" with password '$LOCAL_DB_PASS'"
  
  echo "...create TEST user $TEST_DB_USER with password $LOCAL_DB_PASS"
  psql -c "create user \"$TEST_DB_USER\" with password '$LOCAL_DB_PASS'"
    
  echo "...create MAIN database $LOCAL_DB_NAME with owner $LOCAL_DB_USER encoding='utf8' template template0"
  psql -c "create database \"$LOCAL_DB_NAME\" with owner \"$LOCAL_DB_USER\" encoding='utf8' template template0"
  
  echo "...create TEST database $TEST_DB_NAME with owner $TEST_DB_USER encoding='utf8' template template0"
  psql -c "create database \"$TEST_DB_NAME\" with owner \"$TEST_DB_USER\" encoding='utf8' template template0"
fi

echo "Running migrations..."
sequelize db:migrate

# start app (no debugging)
echo "Starting app..."
nodemon -V index.js
