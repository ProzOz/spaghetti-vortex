# Spaghetti Vortex - Nginx Static Site
# Serves the interactive Navier-Stokes explainer on port 80

FROM nginx:alpine

# Copy static site files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx (default CMD from base image)
