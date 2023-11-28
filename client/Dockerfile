FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV VITE_API_URI=http://localhost
COPY . .
RUN npm run build

# Use an official Nginx image as the production environment
FROM nginx:alpine

# Copy built files from the build environment to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose the default Nginx port
EXPOSE 80

# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]