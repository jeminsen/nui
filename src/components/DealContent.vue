<template>
    <main class="deal-body">
        <section class="deal-section">
            <h2 class="deal-section-heading">Buyers/Investors</h2>
            <columns>
                <company-card
                    v-for="investor in entities.investors"
                    :key="investor.name"
                    :name="investor.name"
                    :url="investor.url"
                />
            </columns>
        </section>

        <section class="deal-section">
            <h2 class="deal-section-heading">Targets</h2>
            <columns>
                <company-card
                    v-for="target in entities.targets"
                    :key="target.name"
                    :description="target.description"
                    :city="target.city"
                    :name="target.name"
                    :state="target.state"
                    :url="target.url"
                />
            </columns>
        </section>

        <section v-if="entities.portfolioCompany.name" class="deal-section">
            <h2 class="deal-section-heading">Add-On Platform (Portfolio Company)</h2>
            <columns>
                <company-card :name="entities.portfolioCompany.name" :url="entities.portfolioCompany.url" />
            </columns>
        </section>

        <section v-if="entities.sellersLendersAdvisors.length" class="deal-section">
            <h2 class="deal-section-heading">Sellers, Lenders, Advisors</h2>
            <columns>
                <company-card
                    v-for="sellersLendersAdvisors in entities.sellersLendersAdvisors"
                    :body="sellersLendersAdvisors.value"
                    :key="sellersLendersAdvisors.type"
                    :name="sellersLendersAdvisors.type"
                    hide-url
                />
            </columns>
        </section>
    </main>
</template>

<script>
import { extractEntitiesFromDealResponse } from '../utils/api';
import Columns from './Columns.vue';
import CompanyCard from './CompanyCard.vue';

export default {
    name: 'DealContent',

    components: { Columns, CompanyCard },

    props: {
        deal: {
            type: Object,
            required: true,
        },
    },

    computed: {
        entities() {
            return extractEntitiesFromDealResponse(this.deal);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins';

.card {
    @include card;
}
</style>

<style scoped>
.card {
    @mixin margin bottom, 1;
}

.deal-body {
    padding: 1.25rem;
    width: 100vw;
    max-width: 100vw;
}

.deal-section {
    @mixin margin bottom, 1.5;
    break-inside: avoid;
}

.deal-section-heading {
    @mixin margin bottom, 1;
}
</style>
