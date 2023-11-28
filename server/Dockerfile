FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -D typescript

COPY . .
RUN npm run build

FROM node:18-alpine 

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]