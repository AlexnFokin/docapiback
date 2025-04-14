<<<<<<< HEAD
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.14.0-alpine AS development
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN npm install -g ts-node-dev
EXPOSE 5000
CMD ["npm", "run", "dev"]

FROM node:22.14.0-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
=======
FROM node:22.14.0-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
>>>>>>> 1ff89ae (added test route)
