FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV production
RUN npm ci --only=production
COPY ./src ./src
EXPOSE 4898
RUN chown -R node /app
USER node
CMD ["npm", "start"]