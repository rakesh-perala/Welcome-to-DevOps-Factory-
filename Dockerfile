# Use a lightweight web server image
FROM public.ecr.aws/nginx/nginx:alpine


# Copy static site files to nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (default CMD)
