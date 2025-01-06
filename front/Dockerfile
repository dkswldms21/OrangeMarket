FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./

#nodemon 사용 
CMD ["npm", "run", "dev"]