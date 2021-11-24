<template>
    <nuxt-link :to="{ name: 'deal-id', params: { id: deal.deal_detail_id } }" class="card" tag="div">
        <div v-if="industryExists" class="l-sector-container">
            <img :src="iconUrl" class="l-sector-icon" />
            <span class="l-sector">{{ industryName }}</span>
        </div>
        <h3 class="l-target-company">{{ targetCompany }}</h3>
        <h4 class="l-financial-institution">{{ financialInstitution }}</h4>
    </nuxt-link>
</template>

<script>
import { mappedSector } from '@/utils/sector';

export default {
    props: {
        deal: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            targetCompany: this.deal.target_company_name,
            financialInstitution: this.deal.buyer_firm_name,
        };
    },
    computed: {
        matchingIndustry() {
            return mappedSector(this.deal.target_company_industry);
        },
        industryName() {
            return this.matchingIndustry.name;
        },
        iconUrl() {
            return '/' + this.matchingIndustry.icon;
        },
        industryExists() {
            return this.deal.target_company_industry && this.matchingIndustry;
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
.l-sector-container {
    flex-grow: 1;
    margin-bottom: 0.66rem;
    line-height: 0.5;
}
.l-sector-icon {
    vertical-align: middle;
    margin-right: 5px;
    max-width: 0.625rem;
    max-height: 0.625rem;
}
.l-sector {
    @mixin size -2;
    color: var(--gray-chateau);
    vertical-align: middle;
}
.l-target-company {
    @mixin size 2;
}

.no-cssgrid .l-target-company {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.l-financial-institution {
    @mixin size 0;
    color: var(--gray-chateau);
}
</style>
