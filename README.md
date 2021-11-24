# NepFin DealWatch

> Business Intelligence and Broad Market Research for the Lower Middle Market

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker & Docker Compose

In Docker, DealWatch runs on port 80.

In this project, Docker Compose is used to test the Dockerfile rather than as a development environment.
To test the Dockerfile, run Docker Compose and view the application at http://0.0.0.0:3000:

```bash
$ docker-compose up --build

Recreating deal-watch_deal_watch_ui_1 ... done
Attaching to deal-watch_deal_watch_ui_1
deal_watch_ui_1  |
deal_watch_ui_1  | > deal-watch@1.0.0 start /deal-watch
deal_watch_ui_1  | > nuxt start
deal_watch_ui_1  |
deal_watch_ui_1  | ℹ Listening on: http://172.23.0.2:80/
```

