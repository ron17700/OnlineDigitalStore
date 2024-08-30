FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app .
COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]