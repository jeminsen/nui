<template>
    <ContentSection title="Most Recent Deals">
        <div class="l-recent-deals-grid">
            <DealCard v-for="deal in validDeals" :key="deal.deal_detail_id" :deal="deal" />
        </div>
    </ContentSection>
</template>

<script>
import ContentSection from '@/components/ContentSection.vue';
import DealCard from '@/components/DealCard.vue';

export default {
    components: {
        ContentSection,
        DealCard,
    },
    props: {
        deals: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        validDeals() {
            if (!this.deals) {
                return [];
            }

            // Check that both a Buyer Firm and a Target Company exists
            const validDeals = this.deals.filter((deal) => deal.target_company_name && deal.buyer_firm_name);
            return validDeals;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables';

$card-width: 17rem;
$grid-column-gap: 0.5625rem;
$grid-row-gap: 0.6875rem;

// Calculate the widths at which cards become 2, 3, 4/row.
$l-container-x-padding: $spacing-2 * 2;
@function calculate_card_breakpoint($card-count) {
    $deals-width: ($card-width * $card-count) + ($grid-column-gap * ($card-count - 1));
    $breakpoint: $l-container-x-padding + $deals-width + $sidebar-width;
    @return $breakpoint;
}

.l-recent-deals-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: $grid-column-gap;
    grid-row-gap: $grid-row-gap;

    @media (min-width: calculate_card_breakpoint(2)) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: calculate_card_breakpoint(3)) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: calculate_card_breakpoint(4)) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
</style>
