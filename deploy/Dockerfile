FROM node:16.13.2 as build-stage

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build


FROM nginx

COPY ./deploy/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'