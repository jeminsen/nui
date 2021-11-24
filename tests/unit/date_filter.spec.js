import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import DateFilter from '@/components/Filters/DateFilter.vue';

describe('DateFilter.vue', () => {
    Vue.use(Vuetify);
    let mockPush, wrapper;
    beforeEach(() => {
        mockPush = jest.fn();
        wrapper = shallowMount(DateFilter, {
            mocks: {
                $route: {
                    query: {
                        startDate: '2019-12-25',
                        endDate: '2019-12-31',
                    },
                },
                $router: {
                    push: mockPush,
                },
            },
        });
    });

    it('sets the start date to match the querystring in url', () => {
        expect(wrapper.vm.startDate).toBe('2019-12-25');
    });

    it('sets the end date to match the querystring in url', () => {
        expect(wrapper.vm.endDate).toBe('2019-12-31');
    });

    it('disallows start date that later than end date', () => {
        expect(wrapper.vm.allowedStartDates('2020-12-31')).toBe(false);
    });

    it('allows start date equal to end date', () => {
        expect(wrapper.vm.allowedStartDates('2019-12-31')).toBe(true);
        expect(wrapper.vm.allowedEndDates('2019-12-25')).toBe(true);
    });

    it('disallows end date that is earlier than start date', () => {
        expect(wrapper.vm.allowedEndDates('2018-12-25')).toBe(false);
    });

    it.each([['2019-12-26'], [null]])('updates the url when the start date changes to %s', (startDate) => {
        wrapper.setData({ startDate });
        expect(mockPush.mock.calls.length).toBe(1);
    });

    it.each([['2019-12-30'], [null]])('updates the url when the end date changes to %s', (endDate) => {
        wrapper.setData({ endDate });
        expect(mockPush.mock.calls.length).toBe(1);
    });
});
