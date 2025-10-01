# Base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (for caching npm install)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose backend port (e.g., 5000)
EXPOSE 5000

# Define environment variables (override at runtime)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
