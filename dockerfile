# Build the app
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# Serve with NGINX
FROM nginx:alpine

# Copy built files to NGINX public directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
