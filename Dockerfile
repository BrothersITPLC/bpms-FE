# Stage 1: Build the React app
FROM node:20.18-slim AS build

WORKDIR /app

# Copy the build files into the container
COPY dist ./dist

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
