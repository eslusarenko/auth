FROM node:12-alpine AS app
WORKDIR /app

COPY ./package-lock.json ./package.json ./
RUN npm i

COPY . ./

ENV PORT 80
EXPOSE 80

CMD npm start
