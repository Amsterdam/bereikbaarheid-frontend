FROM node:16-stretch AS base

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
CMD ["ncu", "-u", "--doctor", "--target minor"]

# Test
FROM base AS test
CMD [ "npm", "run", "test" ]

# Build the app
FROM base AS builder
ARG BUILD_ENV=prod
COPY .env.${BUILD_ENV} /app/.env
RUN npm run build

# Deploy
FROM nginxinc/nginx-unprivileged:mainline-alpine-slim
COPY --from=builder /app/build/. /var/www/html/

ARG NGINX_CONF=nginx.default.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

EXPOSE 80
