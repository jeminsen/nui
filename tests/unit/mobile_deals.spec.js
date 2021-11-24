import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import TrackPlugin from 'nui/plugin/track-plugin';
import { buildStore } from './store';
import MobileDeals from '@/components/MobileDeals.vue';
import ApiClient from '@/plugins/sonarApi';
let localVue;

const factory = (mocks = {}, mockStore) => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ApiClient);
    localVue.use(TrackPlugin, '$track', {
        trackingId: 'UX-12345',
        isEnabled: true,
        isDebug: false,
    });
    const $sonarApi = {
        get: jest.fn(() => ({
            data: {
                data: [],
                last_page: 1,
            },
        })),
    };
    const store = buildStore(mockStore);
    return mount(MobileDeals, {
        store,
        localVue,
        mocks: { $sonarApi, ...mocks },
        stubs: ['v-spinner', 'router-link'],
    });
};

describe('MobileDeals.vue', () => {
    it('sets up the sectors using multiple query string from url', () => {
        const sectors = ['Industrials', 'Telecom', 'Technology'];
        const $route = {
            query: {
                sectors,
            },
        };
        const wrapper = factory({ $route });
        const selectedSectorNames = wrapper.vm.selectedSectors.map((sector) => sector.name);
        expect(selectedSectorNames).toEqual(sectors);
    });

    it('sets up the sectors using single query string from url', () => {
        const sectors = 'Industrials';
        const $route = {
            query: {
                sectors,
            },
        };
        const wrapper = factory({ $route });
        expect(wrapper.vm.$store.getters['sectors/selectedSectorNames']).toEqual([sectors]);
    });

    it('sets the pagination correctly from url', () => {
        const $route = {
            query: {
                page: '4',
            },
        };
        const storeOverrides = {
            getters: {
                isAuthenticated: () => true,
                isEmailVerified: () => true,
            },
        };
        const wrapper = factory({ $route }, storeOverrides);
        expect(wrapper.vm.page).toEqual(4);
    });

    it('updates the router querystring when pagination changes', async () => {
        const $route = {
            query: {
                page: '3',
            },
        };
        const $sonarApi = {
            get: jest.fn(() => ({
                data: {
                    data: [],
                    last_page: 3,
                },
            })),
        };
        const $router = { push: jest.fn() };

        const wrapper = factory({ $route, $sonarApi, $router });
        await wrapper.vm.$nextTick();
        const button = wrapper.find('.pagination-button');
        button.trigger('click');
        expect($router.push).toBeCalledWith({ query: { page: '2' } });
    });
});
