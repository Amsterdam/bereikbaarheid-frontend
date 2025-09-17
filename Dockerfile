FROM node:20-bookworm AS base

ENV BROWSER=none

WORKDIR /app

COPY . /app

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# install dependencies
RUN npm ci

# Upgrade dependencies
FROM base AS upgrade
RUN npm install -g npm-check-updates

# Build the app
FROM base AS builder
ARG BUILD_ENV=prod
COPY .env.${BUILD_ENV} /app/.env
RUN npm run build

# Deploy
FROM nginx:stable-alpine-slim
COPY --from=builder /app/build/. /var/www/html/

COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

WORKDIR /app
COPY ./env.sh env.sh
# Add bash
RUN apk add --no-cache bash

# Make shell script executable
RUN chmod +x env.sh

# First, run the env.sh script and then start the nginx server
CMD ["/bin/bash", "-c", "/app/env.sh && nginx -g \"daemon off;\""]
