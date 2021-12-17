FROM node:17-alpine

WORKDIR /srv/iprwc-backend

VOLUME /srv/iprwc-backend/static

COPY package.json package-lock.json ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \
 && npm install \
 && apk del .gyp

COPY ./.docker/entrypoint.sh /docker-entrypoint.sh

COPY . .

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server"]
