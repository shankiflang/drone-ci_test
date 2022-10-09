FROM node:16-alpine
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