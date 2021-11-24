import sectors from '@/def/sectors.json';

const sectorTranslationMap = {
    Industrials: 'Industrial',
    Technology: 'Information Technology',
    Telecom: 'Telecommunication',
};

export const state = () => ({
    sectors: sectors.map((sector) => ({ ...sector, value: false })),
});

export const mutations = {
    updateSectors(state, { value, index }) {
        state.sectors[index].value = value; // eslint-disable-line no-param-reassign
    },
    enableSectors(state, sectorsParam) {
        for (const sector of state.sectors) {
            sector.value = sectorsParam.includes(sector.name);
        }
    },
};

export const actions = {
    sendGAForFilter({ getters }, ga) {
        const sectorNames = getters.selectedSectorNames;
        if (sectorNames.length > 0) {
            ga.event('dealwatch', 'filteredby', sectorNames.join(', '));
        }
    },
};

export const getters = {
    sectors: (state) => state.sectors,
    selectedSectors: (state) => state.sectors.filter((sector) => sector.value),
    selectedSectorNames: (state, getters) => getters.selectedSectors.map((sector) => sector.name),
    translatedIndustries: (state, getters) => {
        const sectorNames = getters.selectedSectorNames;
        const industries = sectorNames.map((sector) => {
            const transformedSector = sectorTranslationMap[sector];
            if (transformedSector) {
                return transformedSector;
            }
            return sector;
        });
        return industries;
    },
    sectorQueryString: (state, getters) => {
        const industries = getters.translatedIndustries;
        return industries.map((industry) => `industry=${encodeURIComponent(industry)}`).join('&');
    },
};
