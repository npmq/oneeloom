# Use original image Node.js
FROM node:20-alpine

# Install work directory 
  WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install packages
RUN yarn install

# Copy all files of project
COPY . .

# Command run development application
CMD ["yarn", "dev"]