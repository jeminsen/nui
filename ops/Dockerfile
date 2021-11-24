# ----------------------------------------------------------
# For production
# ----------------------------------------------------------

FROM node:12 as intermediate

ARG app_env

WORKDIR /deal-watch

# place private key and install npm packages
COPY package*.json ./
RUN mkdir -p /root/.ssh && chmod 0700 /root/.ssh && ssh-keyscan gitlab.com > /root/.ssh/known_hosts
COPY ./id_rsa /root/.ssh
RUN chmod 0400 /root/.ssh/id_rsa
RUN npm install --quiet --no-progress

# ----------------------------------------------------------
# Multi-stage build to prevent private key leak
# ----------------------------------------------------------
FROM node:12

COPY --from=intermediate /deal-watch /deal-watch

WORKDIR /deal-watch

ARG app_env

COPY ./nuxt.config.js ./
COPY ./src ./src
COPY ./.env.${app_env} ./

# build our assets
RUN npm run build:$app_env

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80
ENV app_env=$app_env

CMD npm run start:${app_env}
