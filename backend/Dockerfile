FROM node:17-alpine

RUN apk add --no-cache tini

WORKDIR /srv/iprwc-backend

VOLUME /srv/iprwc-backend/static

COPY package.json package-lock.json ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \
 && npm install \
 && apk del .gyp

COPY ./.docker/entrypoint.sh /docker-entrypoint.sh

COPY . .

ENTRYPOINT ["/sbin/tini", "--", "/docker-entrypoint.sh"]
CMD ["server"]
