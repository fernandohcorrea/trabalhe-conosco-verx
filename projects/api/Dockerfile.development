FROM node:20.16.0-alpine3.19

ARG DK_UID=1000

ARG DK_GID=1000

ENV CLI_PATH='./dist/cli.js'

RUN apk --no-cache add shadow && \
  usermod -u ${DK_UID:-1000} node && \
  groupmod -g ${DK_GID:-1000} node

RUN npm i -g @nestjs/cli

USER node

RUN npm config set update-notifier false

RUN mkdir /home/node/project

WORKDIR /home/node/project
