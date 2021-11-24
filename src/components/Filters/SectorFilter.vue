<template>
    <div>
        <h3 class="filter-heading">Sectors</h3>
        <p class="filter-text">Filter for specific sectors</p>
        <div class="grid-container">
            <sector-category
                v-for="(sector, index) in sectors"
                :key="sector.name"
                :name="sector.name"
                :value="sector.value"
                :bubble-icon="sector.bubbleIcon"
                @input="(value) => updateSectors(value, index)"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SectorCategory from './SectorCategory.vue';

export default {
    name: 'SectorFilter',
    components: {
        SectorCategory,
    },
    computed: {
        ...mapGetters({ sectors: 'sectors/sectors' }),
    },
    methods: {
        updateSectors(value, index) {
            this.$store.commit('sectors/updateSectors', {
                value,
                index,
            });
        },
    },
};
</script>

<style scoped>
.filter-heading {
    @mixin size 1;
    @mixin useTitleFont;
    font-weight: 600;
}

.filter-text {
    @mixin size -1;
    color: var(--tealish);
}

.grid-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: white;
    grid-gap: 0.75rem;
}
</style>
