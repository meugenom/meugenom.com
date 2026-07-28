# Stage 1: Build SPA via Yarn on Node 22
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency manifests
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile || yarn install

# Copy source code and build production bundle (webpack.prod.js)
COPY . .
RUN yarn build

# Stage 2: Serve static build files via Nginx
FROM nginx:alpine
COPY --from=builder app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]