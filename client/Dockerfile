# build environment
FROM node:10-alpine as build
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV NODE_ENV production
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh generate-react-runtime-env.sh /
RUN chmod +x /docker-entrypoint.sh /generate-react-runtime-env.sh
EXPOSE 80
ENTRYPOINT [ "/docket-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]