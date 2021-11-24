<template>
    <div>
        <ContentSection title="Deals">
            <section v-if="selectedSectors.length" class="selected-sectors">
                <selected-sector
                    v-for="sector in selectedSectors"
                    :key="sector.name"
                    :name="sector.name"
                    :icon="sector.bubbleIcon"
                    :color="sector.color"
                />
            </section>

            <v-spinner v-if="loading"></v-spinner>
            <section v-else>
                <deal-card v-for="deal in deals" :key="deal.deal_detail_id" :deal="deal" class="deal-card" />

                <div class="pagination-controls">
                    <button :class="{ hidden: !displayPrev }" @click="changePageTo(page - 1)" class="pagination-button">
                        &lt; Prev
                    </button>
                    <p class="pagination-status">{{ page }} / {{ lastPage }}</p>
                    <button :class="{ hidden: !displayNext }" @click="changePageTo(page + 1)" class="pagination-button">
                        Next &gt;
                    </button>
                </div>
            </section>
        </ContentSection>
        <section class="l-get-list-of-deals">
            <h2 class="l-title">Get Your Copy of the List of Deals</h2>
            <p class="l-desc">Visit DealWatch on your desktop browser to download deals.</p>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dealPagination from './dealPagination';
import ContentSection from '@/components/ContentSection.vue';
import DealCard from '@/components/DealCard.vue';
import SelectedSector from '@/components/Filters/SelectedSector.vue';

export default {
    name: 'MobileDeals',
    components: {
        DealCard,
        ContentSection,
        SelectedSector,
    },
    mixins: [dealPagination],
    computed: {
        ...mapGetters({
            selectedSectors: 'sectors/selectedSectors',
        }),
    },
};
</script>

<style scoped>
.selected-sectors {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    @mixin margin bottom, 2;
}

.deal-card {
    margin-bottom: 0.625rem;
}

.pagination-controls {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    @mixin margin top, 1;
}

.pagination-button {
    @mixin size -1;
    color: var(--edward-gray);
    background: none;
    border: none;

    &.hidden {
        visibility: hidden;
    }

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
}

.pagination-status {
    @mixin size -1;
    color: var(--edward-gray);
}

.l-get-list-of-deals {
    padding: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    color: white;
    background-color: var(--black-pearl);

    @mixin media small {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    & .l-title {
        @mixin useTitleFont;
        @mixin size 3;
        margin-bottom: 1.25rem;
        font-weight: 600;
    }

    & .l-desc {
        font-weight: 300;
        margin-bottom: 1.25rem;
    }
}
</style>
