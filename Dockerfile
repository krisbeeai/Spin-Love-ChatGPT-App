# SpinLove ChatGPT App - Dockerfile (Bilingual)
FROM node:20-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Run
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/server.js"]
