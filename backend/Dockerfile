FROM node:10
#FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV production
# RUN npm ci --only=production
RUN npm install
COPY ./src ./src
EXPOSE 4898
RUN chown -R node /app
USER node
CMD ["npm", "start"]