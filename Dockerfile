# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build production version app 
RUN yarn build

# Stage 2: Deployment stage
FROM nginx:stable-alpine

# Set environment variables
# ENV API_URL=http://api.example.com
ENV PORT=80

# Copy the production build from the builder stage to the Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
# COPY nginx.config /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE $PORT

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD ["sh", "-c", "curl -f http://localhost:$PORT/ || exit 1"]

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]