import { shallowMount } from '@vue/test-utils';
import NInput from 'nui/cmp/inputs/n-input.vue';
import EntitySearchBar from '@/components/EntitySearchBar.vue';

describe('EntitySearchBar.vue', () => {
    it('sets the search text to match the querystring in url', () => {
        const wrapper = shallowMount(EntitySearchBar, {
            mocks: {
                $route: {
                    query: {
                        entity: 'hello',
                    },
                },
            },
        });
        expect(wrapper.vm.entity).toBe('hello');
    });

    it('updates the url when the entity value changes', () => {
        const mockPush = jest.fn();
        const wrapper = shallowMount(EntitySearchBar, {
            mocks: {
                $route: {
                    query: {
                        entity: 'hello',
                    },
                },
                $router: {
                    push: mockPush,
                },
            },
        });
        wrapper.setData({ entity: 'world' });
        wrapper.find(NInput).vm.$emit('enter');
        expect(wrapper.vm.entity).toBe('world');
        expect(mockPush.mock.calls.length).toBe(1);
    });

    it('does not update the url when the entity remained the same', () => {
        const mockPush = jest.fn();
        const wrapper = shallowMount(EntitySearchBar, {
            mocks: {
                $route: {
                    query: {
                        entity: 'hello',
                    },
                },
                $router: {
                    push: mockPush,
                },
            },
        });
        wrapper.setData({ entity: 'hello' });
        wrapper.find(NInput).vm.$emit('enter');
        expect(wrapper.vm.entity).toBe('hello');
        expect(mockPush.mock.calls.length).toBe(0);
    });
});
