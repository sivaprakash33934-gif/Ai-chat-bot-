# ==============================================================================
# SYNEX Marketing & Control Center Static Engine
# Stage 1: Static prerender and asset compilation
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Enable libc6-compat for alpine optimizations
RUN apk add --no-cache libc6-compat

# Install dependencies using clean package manifests
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source perimeter
COPY . .

# Prerender all static routes into the /out static bundle
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# ==============================================================================
# Stage 2: Minimalist, hardened Nginx runtime
# Total uncompressed runtime image: ~45MB
# ==============================================================================
FROM nginx:1.27-alpine AS runner

# Remove default boilerplate configuration
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy compiled static export artifacts
COPY --from=builder /app/out /usr/share/nginx/html

# Copy sovereign security-hardened Nginx configuration
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Add non-root operational user for Nginx worker
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
