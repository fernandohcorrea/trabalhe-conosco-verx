#!/usr/bin/env bash
set -e

if [ -z "$POSTGRES_DATABASES" ]; then
    echo "No databases to create"
    exit 0
fi

ARR=($(echo $POSTGRES_DATABASES | tr "|" "\n"))

for DATABASE in "${ARR[@]}"
do

  if [ -z "$DATABASE" ]; then
      echo "No databases to create"
      continue
  fi
  DATA=($(echo $DATABASE | tr ";" "\n"))

  USER_DB=${DATA[0]}
  PASS=${DATA[1]}
  DB=${DATA[2]}

  if [ -z "$USER_DB" ] || [ -z "$PASS" ] || [ -z "$DB" ]; then
    echo "Invalid database params"
    continue
  fi

  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER ${USER_DB} WITH PASSWORD '${PASS}';
    CREATE DATABASE ${DB};
    \connect ${DB}
    GRANT ALL PRIVILEGES ON DATABASE ${DB} TO ${USER_DB};
    GRANT ALL PRIVILEGES ON SCHEMA public TO ${USER_DB};
EOSQL

done