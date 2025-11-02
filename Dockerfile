# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app


FROM base AS install
COPY package.json bun.lock .
RUN bun install --frozen-lockfile


FROM base AS prerelease
COPY --from=install /usr/src/app/node_modules node_modules
COPY . .
ENV VITE_API_URL=http://chonsawat
ENV VITE_TITLE=Ledger


# run the app
# USER bun
EXPOSE 3000/tcp
EXPOSE 5173/tcp
ENTRYPOINT [ "bun", "run", "dev" ]