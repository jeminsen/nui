<template>
    <div class="home">
        <div class="content-container">
            <Header />
            <Splash />
            <EntitySearchBar />
            <MobileDeals v-if="showMobileDeals" />
            <div v-else>
                <MostRecentDeals :deals="recentDeals" />
                <AdditionalDeals />
            </div>
            <Footer />
            <bottom-bar />
        </div>

        <div class="sidebar-container">
            <login-box />
            <Sidebar />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import EntitySearchBar from '@/components/EntitySearchBar.vue';
import Splash from '@/components/Splash.vue';
import MobileDeals from '@/components/MobileDeals.vue';
import MostRecentDeals from '@/components/MostRecentDeals.vue';
import AdditionalDeals from '@/components/AdditionalDeals.vue';
import BottomBar from '@/components/BottomBar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import LoginBox from '@/components/LoginBox.vue';
import { DATA_DESCRIPTION } from '@/constants/metadata';
import { buildOpenGraphUrlTag } from '@/utils/metadata';
import { buildSchemaScript } from '@/utils/schemas';

export default {
    name: 'Home',
    components: {
        EntitySearchBar,
        Splash,
        MobileDeals,
        MostRecentDeals,
        AdditionalDeals,
        Header,
        Footer,
        Sidebar,
        LoginBox,
        BottomBar,
    },
    head() {
        return {
            meta: [buildOpenGraphUrlTag(this.$route.path)],
            script: [
                buildSchemaScript('Dataset', {
                    name: 'NepFin DealWatch',
                    description: DATA_DESCRIPTION,
                    variableMeasured: 'business equity transaction',
                    license: 'https://www.nepfin.com/terms-of-service',
                    measurementTechnique: 'proprietary',
                }),
            ],
        };
    },
    data() {
        return {
            apiUrl: `${process.env.NUXT_ENV_NHOME_API}lead`,
            recentDeals: [],
            showMobileDeals: false,
        };
    },
    async asyncData({ store }) {
        const recentDeals = await store.dispatch('fetchRecentDeals');
        return { recentDeals };
    },
    mounted() {
        this.showMobileDeals = window.innerWidth <= 962;
        window.addEventListener('resize', this.handleResize);
        this.$track.view('dealwatch/main');
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        // eslint-disable-next-line
        handleResize: _.debounce(function () {
            this.showMobileDeals = window.innerWidth <= 962;
        }, 50),
    },
};
</script>

<style scoped lang="scss">
@import '~@/assets/scss/variables';
.content-container {
    margin-right: $sidebar-width;
}

.sidebar-container {
    position: fixed;
    padding: 0.8rem;
    overflow-x: hidden;
    width: $sidebar-width;
    height: 100%;
    z-index: 100;
    top: 0;
    right: 0;
    background-color: var(--black-pearl);
}
</style>
<style scoped>
.home {
    max-width: 100vw;
}

.l-filter {
    color: var(--edward-gray);
    display: None;
}

.l-filter > button {
    border: 0;
    padding-left: 0.5rem;
    padding-right: 0;
    background-color: initial;
}

.l-filter > button > img {
    vertical-align: bottom;
}

@mixin media large {
    .sidebar-container {
        display: None;
    }

    .content-container {
        margin-right: 0;
        margin-bottom: 4rem;
    }
}
</style>
