FROM node:16-stretch as builder

ENV BROWSER=none

WORKDIR /app

COPY package.json \
    package-lock.json \
    /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# install dependencies
RUN npm ci

COPY . /app

ARG BUILD_ENV=prod
COPY .env.${BUILD_ENV} /app/.env

# Build the app
RUN npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=builder /app/build/. /var/www/html/

ARG NGINX_CONF=nginx.default.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

EXPOSE 80
