FROM oven/bun:latest AS base

FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json  ./
RUN bun install

# Prep for build
FROM deps AS builder
WORKDIR /app
COPY . .

# Set ARGs before ENVs
ARG ENV
ARG DYNAMIC_ID
# Set ENVs
ENV NEXT_PUBLIC_ENV=${ENV}
ENV NEXT_PUBLIC_DYNAMIC_ID=${DYNAMIC_ID}

# Build The Next.js App
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

CMD ["bun", "start"]
