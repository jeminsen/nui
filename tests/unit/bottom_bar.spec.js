import Vuex from 'vuex';
import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { buildStore } from './store';
import BottomBar from '@/components/BottomBar.vue';
import FilterModal from '@/components/FilterModal.vue';

let localVue;

const factory = (options = {}) => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    const rootOverrides = {
        getters: {
            isAuthenticated: () => true,
            profilePicture: () => '',
        },
    };

    const store = buildStore(rootOverrides);

    return shallowMount(BottomBar, {
        store,
        localVue,
        stubs: ['v-spinner', 'router-link'],
        ...options,
    });
};

describe('BottomBar.vue', () => {
    it('opens the modal and hides the menu when filter button is clicked', async () => {
        const wrapper = factory();
        const filterButton = wrapper.find('button');
        filterButton.trigger('click');
        await Vue.nextTick();
        expect(wrapper.vm.showModal).toBe(true);
        expect(wrapper.find('.menu').isVisible()).toBe(false);
    });

    it('hides the modal and recovers scroll when receiving closeModal event', () => {
        const wrapper = factory();
        window.scrollTo = jest.fn();
        wrapper.setData({ showModal: true, scrollY: 100 });
        wrapper.find(FilterModal).vm.$emit('closeModal');
        expect(wrapper.vm.showModal).toBe(false);
        expect(wrapper.find('.menu').isVisible()).toBe(true);
        return wrapper.vm.$nextTick().then(() => {
            expect(window.scrollTo.mock.calls.length).toBe(1);
            expect(window.scrollTo.mock.calls[0][1]).toBe(100);
        });
    });

    it('pushes the route to router when receiving closeModal event and selected sector has changed', () => {
        const mocks = {
            $router: {
                push: jest.fn(),
            },
            $route: {},
        };
        const wrapper = factory({ mocks });
        window.scrollTo = jest.fn();
        wrapper.setData({ showModal: true, previouslySelectedSectors: ['Some Sector'] });
        wrapper.find(FilterModal).vm.$emit('closeModal');
        expect(mocks.$router.push.mock.calls[0][0].query.sectors).toEqual([]);
        expect(mocks.$router.push.mock.calls.length).toBe(1);
    });
});
