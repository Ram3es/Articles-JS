FROM node:16.13.2 as build-stage

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app 
RUN npm run build


FROM nginx

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
