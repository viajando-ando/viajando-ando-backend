FROM node:12

COPY [".", "/usr/src/"]

WORKDIR /usr/src/

RUN npm install

EXPOSE 8080

RUN set -eux; \
    npm run build; \
    ls -la

CMD ["node", "/usr/src/build/src/api/index.js"]
