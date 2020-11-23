FROM node:alpine as builder

ENV NODE_ENV=production
ENV PORT=3000
ENV RCON_HOST='factorio.domain.tld'
ENV RCON_PORT=27015
ENV RCON_PASSWORD=
ENV RCON_TIMEOUT=5000

RUN mkdir /app
WORKDIR /app

RUN npm install -g npm@v6.0.1 typescript@next

COPY package.json package-lock.json tsconfig.json /app/
RUN npm ci 

COPY index.ts /app/
COPY factorio/ /app/factorio
COPY views/ /app/views
RUN npm run build

FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/views ./views
COPY --from=builder /app/dist /app/package.json /app/package-lock.json ./

EXPOSE 3000
CMD [ "npm", "start" ]
