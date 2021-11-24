import { mapGetters, mapState } from 'vuex';

export default {
    beforeCreate() {
        const { sectors } = this.$route.query;
        if (Array.isArray(sectors)) {
            this.$store.commit('sectors/enableSectors', sectors);
        } else if (sectors) {
            this.$store.commit('sectors/enableSectors', [sectors]);
        }
    },
    async created() {
        await this.getDeals();
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        changePageTo(page) {
            let newPage = page;
            if (newPage < 1) {
                newPage = 1;
            } else if (newPage > this.lastPage) {
                newPage = this.lastPage;
            }

            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: newPage.toString(),
                },
            });
        },
        async getDeals() {
            const { page } = this;

            this.loading = true;
            const response = await this.$sonarApi.get('deal/deal-watch', {
                params: {
                    page,
                    per_page: 10,
                    industry: this.translatedIndustries,
                    entity: this.$route.query.entity,
                    start_date: this.$route.query.startDate,
                    end_date: this.$route.query.endDate,
                },
            });
            this.$store.commit('setDeals', response.data.data);
            this.$store.commit('setDealPagination', {
                totalDeals: response.data.total,
                lastPage: response.data.last_page,
            });
            this.$store.dispatch('sectors/sendGAForFilter', this.$track);
            this.loading = false;
        },
    },
    computed: {
        ...mapGetters({
            translatedIndustries: 'sectors/translatedIndustries',
        }),
        ...mapState(['deals', 'totalDeals', 'lastPage', 'perPage']),
        page() {
            const { page } = this.$route.query;
            const parsedPage = parseInt(page, 10);
            if (Number.isNaN(parsedPage) || parsedPage < 1) {
                return 1;
            }
            return parsedPage;
        },
        displayPrev() {
            return this.page !== 1;
        },
        displayNext() {
            return this.page !== this.lastPage;
        },
    },
    watch: {
        $route() {
            this.getDeals();
        },
    },
};
