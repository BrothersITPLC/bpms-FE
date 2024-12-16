# Stage 1: Build the React app
FROM node:20.18-slim AS build

WORKDIR /app

# Copy the build files into the container
COPY dist ./dist

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built application
RUN npm install -g serve

# Expose the port that your application will run on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]