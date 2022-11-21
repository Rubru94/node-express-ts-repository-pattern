FROM node:15.11-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
# COPY patches/ ./patches/
RUN npm install
COPY . .
EXPOSE 3000
CMD if [[ -z "${NODE_ENV}" ]] ; then npm run start ; else npm run start:${NODE_ENV} ; fi