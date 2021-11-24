import mixins from 'nui/css/mixins';
import dotenv from 'dotenv';
import { DEFAULT_DESCRIPTION } from './src/constants/metadata';
import { fetchDealSitemapEntries } from './src/utils/sitemaps';

const dotEnvForNodeEnv = {
    development: '.env.dev',
    production: '.env.prod',
    staging: '.env.staging',
};

const dotEnvFile = dotEnvForNodeEnv[process.env.NODE_ENV];

const dotenvInstance = dotenv.config({ path: dotEnvFile });
const envVars = dotenvInstance.parsed;

export default {
    dev: process.env.NODE_ENV === 'development',
    mode: 'universal',
    srcDir: 'src/',
    env: {
        NUXT_ENV_AUTH_DOMAIN: process.env.NUXT_ENV_AUTH_DOMAIN,
        NUXT_ENV_AUTH_CLIENT_ID: process.env.NUXT_ENV_AUTH_CLIENT_ID,
        NUXT_ENV_SOURCING_API: process.env.NUXT_ENV_SOURCING_API,
        NUXT_ENV_NHOME_API: process.env.NUXT_ENV_NHOME_API,
        NUXT_ENV_TRACKING_ID: process.env.NUXT_ENV_TRACKING_ID,
        NUXT_ENV_TRACKING_IS_ENABLED: process.env.VUE_APP_TRACKING_IS_ENABLED,
        NUXT_ENV_TRACKING_IS_DEBUG: process.env.NUXT_ENV_TRACKING_IS_DEBUG,
        NUXT_ENV_SENTRY_ENABLED: process.env.NUXT_ENV_SENTRY_ENABLED,
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'Home',
        titleTemplate: '%s | DealWatch',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'og:site_name', content: 'DealWatch' },
            { name: 'og:type', content: 'website' },
            { name: 'og:image', content: 'https://f.hubspotusercontent30.net/hubfs/20454437/Favicon-Trans.png' },
            { name: 'og:locale', content: 'en_US' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || DEFAULT_DESCRIPTION,
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'Home | DealWatch',
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content: process.env.npm_package_description || DEFAULT_DESCRIPTION,
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&family=Montserrat:wght@400;500;600;800&family=Lora:ital@1&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap',
            },
        ],
        script: [
            { src: '/js/css-grid-polyfill.js', async: true, defer: true },
            { src: 'https://js.hs-scripts.com/6633003.js', id: 'hs-script-loader', async: true, defer: true },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['normalize.css', 'nui/css/common/meta/var.css', 'material-design-icons/iconfont/material-icons.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/track', mode: 'client' },
        { src: '~/plugins/spinner', mode: 'client' },
        { src: '~/plugins/sonarApi' },
    ],
    /*
     ** Middleware to run during the request-response cycle
     */
    middleware: ['auth'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/vuetify-module
        // ['@nuxtjs/vuetify', { treeshake: true }],
        '@nuxtjs/vuetify',
        // Doc: https://github.com/nuxt-community/dotenv-module
        ['@nuxtjs/dotenv', { filename: dotEnvFile, path: './' }],
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // ['@nuxtjs/google-analytics', { id: process.env.NUXT_ENV_TRACKING_ID }],
        '@nuxtjs/auth',
        // Doc: https://github.com/nuxt-community/sitemap-module
        '@nuxtjs/sitemap',
        // Doc: https://github.com/nuxt-community/sentry-module
        '@nuxtjs/sentry',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 },
                        },
                    ],
                ];
            },
        },
        transpile: ['nui'],
        extend(config, ctx) {
            config.node = {
                fs: 'empty'
            }
        },
        postcss: {
            plugins: {
                'postcss-import': { path: ['node_modules'], filter: (path) => !path.startsWith('~') },
                'postcss-mixins': { mixins },
            },
            preset: {
                stage: 1,
                autoprefixer: {},
                features: {
                    'custom-properties': {
                        importFrom: [{ customProperties: mixins.declareThemeColors() }],
                    },
                    // Prevents css-grid-polyfill from messing with grid-column-gap
                    'gap-properties': false,
                },
            },
        },
    },
    auth: {
        strategies: {
            auth0: {
                domain: process.env.NUXT_ENV_AUTH_DOMAIN,
                client_id: process.env.NUXT_ENV_AUTH_CLIENT_ID,
                audience: 'Dealwatch Service',
                scope: ['openid', 'profile', 'email', 'download:deal'],
            },
        },
    },
    router: {
        extendRoutes(routes) {
            // Add optional dealDetails parameter to deal-id route
            const dealIdRoute = routes.find((route) => route.name === 'deal-id');
            if (dealIdRoute) {
                dealIdRoute.path = '/deal/:id/:dealDetails?';
            }
        },
    },
    sentry: {
        dsn: 'https://c4bf1252fb954c4c8222cfac7c799e7c@sentry.io/1494705',
        disabled: !(process.env.NUXT_ENV_SENTRY_ENABLED === 'true') || true,
    },
    sitemap: {
        routes: async () => {
            const entries = await fetchDealSitemapEntries(envVars.NUXT_ENV_SOURCING_API);
            return entries;
        },
    },
};
