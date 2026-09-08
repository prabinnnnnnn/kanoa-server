#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./migration.sh migration-name"
    exit 1
fi

npx sequelize-cli migration:generate --name "$1" --env development