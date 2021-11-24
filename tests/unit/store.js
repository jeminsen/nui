import Vuex from 'vuex';

import * as rootStore from '@/store';
import * as sectorsStore from '@/store/sectors';

function applyStoreModuleOverrides(moduleConfig, overrides) {
    moduleConfig = { ...moduleConfig };
    if (!overrides) {
        return moduleConfig;
    }
    if (overrides.getters) {
        moduleConfig.getters = Object.assign(moduleConfig.getters, overrides.getters);
    }
    if (overrides.mutations) {
        moduleConfig.mutations = Object.assign(moduleConfig.mutations, overrides.mutations);
    }
    if (overrides.actions) {
        moduleConfig.actions = Object.assign(moduleConfig.actions, overrides.actions);
    }
    return moduleConfig;
}

/**
 * Returns a project-compatible Vuex store instance with optional overrides.
 * @param {object} rootOverrides Vuex config object with overrides for the root module
 * @param {object} sectorsOverrides Vuex config object with overrides for the sectors module
 */
export function buildStore(rootOverrides, sectorsOverrides) {
    const storeConfig = applyStoreModuleOverrides(rootStore, rootOverrides);
    const sectorsStoreConfig = applyStoreModuleOverrides(sectorsStore, sectorsOverrides);
    const store = new Vuex.Store({
        ...storeConfig,
        modules: {
            sectors: {
                ...sectorsStoreConfig,
                namespaced: true,
            },
        },
    });
    return store;
}
