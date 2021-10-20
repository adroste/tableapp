FROM node:10
#FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV production
# RUN npm ci --only=production
# move node_modules up for easier mount of app code during development 
# without overriding the node_modules in the container
RUN npm install && mv node_modules ../
COPY ./src ./src
EXPOSE 4898
RUN chown -R node /app
USER node
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]