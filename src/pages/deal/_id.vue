<template>
    <Main>
        <div class="deal-container">
            <section>
                <deal-header
                    :prev-route="prevRoute"
                    :header-text="dealDescription"
                    :city="deal.target_company_1_city"
                    :date="deal.deal_date"
                    :industry="deal.target_company_1_industry"
                    :state="deal.target_company_1_state"
                    :transaction-type="deal.transaction_type"
                />
                <deal-content :deal="deal" />
            </section>
        </div>
    </Main>
</template>

<script>
import urlSlug from 'url-slug';
import DealHeader from '@/components/DealHeader.vue';
import DealContent from '@/components/DealContent.vue';
import Main from '@/components/Main.vue';
import { buildSchemaScript } from '@/utils/schemas';
import { buildOpenGraphUrlTag, generateDealDescription } from '@/utils/metadata';

export default {
    name: 'DealDetail',

    components: {
        DealContent,
        DealHeader,
        Main,
    },

    data() {
        return {
            deal: null,
        };
    },

    computed: {
        id() {
            return this.$route.params.id;
        },

        dealDescription() {
            if (!this.deal) {
                return undefined;
            }
            return generateDealDescription(this.deal);
        },
        prevRoute() {
            return this.$store.state.prevRoute || { name: 'index' };
        },
    },

    async asyncData({ params, store }) {
        const deal = await store.dispatch('getDealDetail', params.id);
        return { deal };
    },

    head() {
        const deal = this.deal;
        return {
            title: this.dealDescription,
            meta: [
                buildOpenGraphUrlTag(this.$route.path),
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.dealDescription,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.dealDescription,
                },
            ],
            script: [
                buildSchemaScript('Action', {
                    actionStatus: 'CompletedActionStatus',
                    name: deal.transaction_type,
                    agent: {
                        '@type': 'Organization',
                        name: deal.buyer_or_investor_1_name,
                    },
                    object: {
                        '@type': 'Organization',
                        name: deal.target_company_1_name,
                    },
                }),
            ],
        };
    },

    mounted() {
        this.$track.view('dealwatch/deal/detail');
        this.$track.event('dealwatch', 'deal-viewed', this.id);
    },

    methods: {
        getDealDetailsURLString() {
            const description = generateDealDescription(this.deal);
            return urlSlug(description);
        },
        redirectWithHistory(from) {
            this.$store.commit('setPrevRoute', from);
            this.$router.replace({
                name: 'deal-id',
                params: {
                    id: this.id,
                    dealDetails: this.getDealDetailsURLString(),
                },
            });
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.redirectWithHistory(from);
        });
    },
};
</script>

<style scoped>
.failed {
    padding: 1.25rem;
}
</style>
