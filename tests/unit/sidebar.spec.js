import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import SideBar from '@/components/Sidebar/Sidebar.vue';

let localVue;

const factory = (getters = {}) => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
        getters,
    });
    return shallowMount(SideBar, {
        localVue,
        store,
        stubs: ['v-spinner'],
    });
};

describe('SideBar.vue', () => {
    it('disables the download button if user is not logged in', () => {
        const wrapper = factory({
            isAuthenticated() {
                return false;
            },
            isEmailVerified() {
                return false;
            },
            isLocked() {
                return true;
            },
        });
        const downloadButton = wrapper.find('a.download-button');
        expect(downloadButton.text()).toBe('Login to Unlock Download');
        expect(downloadButton.classes()).toContain('locked');
    });

    it('disables the download button if user is logged in and but not verified', () => {
        const wrapper = factory({
            isAuthenticated() {
                return true;
            },
            isEmailVerified() {
                return false;
            },
            isLocked() {
                return true;
            },
        });
        const downloadButton = wrapper.find('a.download-button');
        expect(downloadButton.text()).toBe('Verify Email to Unlock');
        expect(downloadButton.classes()).toContain('locked');
    });

    it('enables the download button if user is logged in and verified', () => {
        const wrapper = factory({
            isAuthenticated() {
                return true;
            },
            isEmailVerified() {
                return true;
            },
            isLocked() {
                return false;
            },
        });
        const downloadButton = wrapper.find('a.download-button');
        expect(downloadButton.text()).toBe('Download');
        expect(downloadButton.classes()).not.toContain('locked');
    });
});
