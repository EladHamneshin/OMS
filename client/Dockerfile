FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV VITE_API_URI=http://ade0a9e8c300f48708e5fcdcf95a35a4-507123613.eu-central-1.elb.amazonaws.com/oms/api
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
