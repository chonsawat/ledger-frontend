# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY production/package.json .
RUN bun install

FROM base AS prerelease
COPY --from=install /usr/src/app/node_modules node_modules
COPY production/server.js .
COPY ./dist .

ENV VITE_TITLE="Ledger Production"

# Deploy
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "deploy" ]