# build environment
FROM node:16 as build
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV production
# install dev deps also
RUN npm install --production=false
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh generate-react-custom-config.sh /
RUN chmod +x /docker-entrypoint.sh /generate-react-custom-config.sh
EXPOSE 80
ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]