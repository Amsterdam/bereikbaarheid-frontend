FROM node:18 AS base

ENV BROWSER=none

WORKDIR /app

COPY . /app

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# install dependencies
RUN npm ci

# Test
FROM base AS test
CMD ["npm", "run", "test"]

# Dev
FROM base AS dev
WORKDIR /srv/dev
CMD ["npm", "run", "start"]

# Build the app
FROM base AS builder
RUN npm run build

# Deploy
FROM nginxinc/nginx-unprivileged:mainline-alpine-slim
COPY --from=builder /app/build/. /var/www/html/

ARG NGINX_CONF=${NGINX_CONF}
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

EXPOSE 80
