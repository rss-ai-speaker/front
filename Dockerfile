# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1
ARG PNPM_VERSION=8.15.8

# Base stage with Node and pnpm installed
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
RUN npm install -g pnpm@${PNPM_VERSION}

# Dependencies stage
FROM base as deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Build stage
FROM deps as build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Final stage
FROM base as final
ENV NODE_ENV=production
USER node
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY package.json ./
EXPOSE 3000
CMD pnpm start
