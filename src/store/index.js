import Vue from 'vue';

export const state = () => ({
    deals: [],
    perPage: 10,
    totalDeals: 0,
    lastPage: 1,
    prevRoute: null,
});

export const mutations = {
    setDeals(state, deals) {
        Vue.set(state, 'deals', deals);
    },
    setDealPagination(state, { totalDeals, lastPage }) {
        Vue.set(state, 'totalDeals', totalDeals);
        Vue.set(state, 'lastPage', lastPage);
    },
    setPrevRoute(state, prevRoute) {
        state.prevRoute = prevRoute;
    },
};

export const actions = {
    async getDealDetail(context, dealId) {
        const response = await this.$axios.get(`${process.env.NUXT_ENV_SOURCING_API}deal/dealwatch/${dealId}`);
        return response.data;
    },

    async fetchRecentDeals() {
        let recentDeals = [];
        const response = await this.$axios.get(`${process.env.NUXT_ENV_SOURCING_API}deal/deal-watch?per_page=8`);
        if (response && response.data && response.data.data) {
            recentDeals = response.data.data;
        }
        return recentDeals;
    },

    login() {
        this.$auth.$storage.setUniversal('redirect', this.$auth.ctx.route.fullPath);
        this.$auth.loginWith('auth0');
    },

    logout() {
        this.$auth.logout();
    },
};

export const getters = {
    userFullName: (state) => (state.auth.user ? state.auth.user.name : ''),
    profilePicture: (state) => (state.auth.user ? state.auth.user.picture : null),
    isAuthenticated: (state) => state.auth.loggedIn,
    isEmailVerified: (state) => (state.auth.user ? state.auth.user.email_verified : false),
    isLocked: (state, getters) => !getters.isAuthenticated || !getters.isEmailVerified,
};
