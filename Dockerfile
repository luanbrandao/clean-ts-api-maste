FROM node:10
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN yarn --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD yarn start