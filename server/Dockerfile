FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -D typescript

COPY . .

RUN npm install

EXPOSE 4500

CMD ["npm", "run", "dev"]
