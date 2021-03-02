FROM node:alpine as todo-app-build
WORKDIR /client
COPY package.json package-lock.json ./
COPY build /client/build
FROM nginx:latest
LABEL maintainer=Zamar-Zahid
COPY --from=todo-app-build /client/build/ /usr/share/nginx/html
ADD docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh
RUN echo "~/docker-entrypoint.sh" >> .profile
EXPOSE 80