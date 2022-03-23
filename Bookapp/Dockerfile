FROM node as build
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@7.11.2

COPY . /app
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

