#!/bin/sh

# shellcheck disable=SC2164

docker-compose up -d

# Instala las dependencias
npm install

# Ejecuta las migraciones de Prisma
npx prisma migrate dev --name "init"

# Inicia el proyecto
npm run start
