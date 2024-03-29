# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY next.config.js ./
COPY public ./public
COPY --chown=nextjs:nodejs .next ./.next
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY .env.production ./.env

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]





# # Install dependencies only when needed
# FROM node:16-alpine AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile


# # Rebuild the source code only when needed
# FROM node:16-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN yarn build


# # Production image, copy all the files and run next
# FROM node:16-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.env ./.env

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["node_modules/.bin/next", "start"]