# Dockerfile
FROM node:20-slim

WORKDIR /app

COPY . .

RUN npm install -g .

LABEL org.opencontainers.image.source="https://github.com/komunite/kalfa"
LABEL org.opencontainers.image.description="Kalfa CLI ve proje şablon paketi"
LABEL org.opencontainers.image.licenses="MIT"

ENTRYPOINT ["kalfa"]
