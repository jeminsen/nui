import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

export const sonarApi = axios.create({
    baseURL: process.env.NUXT_ENV_SOURCING_API,
    paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    },
});

const apiClient = {
    install(Vue) {
        /* eslint-disable no-param-reassign */
        Vue.prototype.axios = axios;
        Vue.prototype.$http = axios;
        Vue.prototype.$sonarApi = sonarApi;
    },
};
Vue.use(apiClient);

export default apiClient;
