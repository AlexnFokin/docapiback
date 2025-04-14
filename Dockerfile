FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci

COPY . .

