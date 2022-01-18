FROM node:17-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build -- --subresource-integrity --aot

FROM nginx:1.21-alpine

RUN apk add --no-cache curl

HEALTHCHECK CMD curl -f http://localhost || exit 1

WORKDIR /srv/iprwc-frontend

RUN rm -r /etc/nginx/conf.d/*
COPY .docker/templates /etc/nginx/templates

COPY --from=builder /usr/src/app/dist/webshop .
