import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import TrackPlugin from 'nui/plugin/track-plugin';
import { buildStore } from './store';
import SectorFilter from '@/components/Filters/SectorFilter.vue';
import SectorCategory from '@/components/Filters/SectorCategory.vue';

import ApiClient from '@/plugins/sonarApi';

const factory = () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ApiClient);
    localVue.use(TrackPlugin, '$track', {
        trackingId: 'UX-12345',
        isEnabled: true,
        isDebug: false,
    });
    const store = buildStore();
    return mount(SectorFilter, { store, localVue });
};

describe('SectorFilter.vue', () => {
    it('starts with 10 sectors initially', () => {
        const wrapper = factory();
        expect(wrapper.findAll(SectorCategory).length).toBe(10);
    });

    it('selects a sector when clicked', () => {
        const wrapper = factory();
        wrapper.find('.sector-btn').trigger('click');
        expect(wrapper.vm.$store.getters['sectors/selectedSectorNames']).toEqual(['Business Services']);
    });

    it('converts selected sectors to query string correctly', () => {
        const wrapper = factory();
        wrapper
            .findAll(SectorCategory)
            .filter((component) => ['Telecom', 'Industrials', 'Technology'].includes(component.props('name')))
            .wrappers.forEach((component) => component.find('.sector-btn').trigger('click'));
        expect(wrapper.vm.$store.getters['sectors/sectorQueryString']).toEqual(
            'industry=Industrial&industry=Telecommunication&industry=Information%20Technology'
        );
    });

    it('sends event data to GA for tracking filter if sectors are selected', async () => {
        const fakeGA = jest.fn();
        const wrapper = factory();
        wrapper.vm.$track.ga = fakeGA;
        wrapper
            .findAll(SectorCategory)
            .filter((component) => ['Industrials', 'Consumer'].includes(component.props('name')))
            .wrappers.forEach((component) => component.find('.sector-btn').trigger('click'));
        await wrapper.vm.$store.dispatch('sectors/sendGAForFilter', wrapper.vm.$track);
        expect(fakeGA).toHaveBeenCalledWith('send', 'event', 'dealwatch', 'filteredby', 'Consumer, Industrials');
    });

    it('does not send event data to GA for tracking filter if no sectors are selected', async () => {
        const fakeGA = jest.fn();
        const wrapper = factory();
        wrapper.vm.$track.ga = fakeGA;
        await wrapper.vm.$store.dispatch('sectors/sendGAForFilter', wrapper.vm.$track);
        expect(fakeGA).not.toHaveBeenCalled();
    });
});
