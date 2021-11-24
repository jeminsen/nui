<template>
    <ContentSection title="Additional Deals">
        <div class="content">
            <n-paginated-table
                ref="deal_table"
                :fields="fields"
                :api-mode="false"
                :data="deals"
                :per-page="perPage"
                :starting-page="page"
                @row-click="onRowClick"
                data-path="deals"
                track_by="id"
                is-compact
                pagination-path="pagination"
                is-row-clickable
                class="monitor-table highlight-rows"
            />
        </div>
    </ContentSection>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import NPaginatedTable from 'nui/cmp/table/paginated-table.vue';
import dealPagination from './dealPagination';
import ContentSection from '@/components/ContentSection.vue';
import { mappedSector } from '@/utils/sector';

export default {
    components: {
        ContentSection,
        NPaginatedTable,
    },
    mixins: [dealPagination],
    data() {
        return {
            fields: [
                {
                    name: 'deal_date',
                    title: 'Transaction / Discovery Date',
                    callback: (date) => (date ? moment(date).format('L') : 'N/A'),
                },
                {
                    name: 'buyer_firm_name',
                    title: 'Buyer Firm',
                    // eslint-disable-next-line max-len, camelcase
                    callback: (name) => name || 'N/A',
                },
                {
                    name: 'target_company_name',
                    title: 'Company',
                    callback: (name) => name || 'N/A',
                },
                {
                    name: 'transaction_type',
                    title: 'Transaction Type',
                    callback: (transactionType) =>
                        transactionType && transactionType.length ? transactionType : 'N/A',
                },
                {
                    name: 'target_company_industry',
                    title: 'Sector',
                    callback: (sector) => (mappedSector(sector) && mappedSector(sector).name) || 'N/A',
                },
            ],
        };
    },
    computed: {
        ...mapGetters({
            selectedSectorNames: 'sectors/selectedSectorNames',
        }),
    },
    watch: {
        deals() {
            this.updateApiTable();
        },
        page() {
            this.updateApiTable();
        },
        totalDeals() {
            this.updateApiTable();
        },
        selectedSectorNames() {
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: 1,
                    sectors: this.selectedSectorNames,
                },
            });
        },
        loading(val) {
            this.$refs.deal_table.$refs.apiTable.displayLoadingRow = val;
        },
    },
    mounted() {
        this.updateApiTable();
        this.$refs.deal_table.$refs.pagination.$on('change-page', this.handlePageChange);
    },
    methods: {
        onRowClick(dealInfo) {
            this.$router.push({
                name: 'deal-id',
                params: { id: dealInfo.deal_detail_id },
            });
        },
        handlePageChange(page) {
            let newPage = page;
            if (newPage === 'prev') {
                newPage = this.page - 1;
            } else if (newPage === 'next') {
                newPage = this.page + 1;
            }
            this.changePageTo(newPage);
        },
        updateApiTable() {
            this.$refs.deal_table.$refs.apiTable.setData({
                deals: this.deals,
                pagination: {
                    current_page: this.page,
                    last_page: this.lastPage,
                    per_page: this.perPage,
                    total: this.totalDeals,
                },
            });
        },
    },
};
</script>

<style scoped>
.content {
    position: relative;
}

>>> {
    & .monitor-table {
        width: 100%;
        overflow: auto;
        margin-bottom: 2.75rem;
    }

    & .n-table {
        border-spacing: 0;
        width: 100%;
        background-color: white;
        padding-bottom: 2rem;
        margin-bottom: 1.25rem;
    }

    & thead {
        border-bottom: 2px solid var(--black-pearl);
    }

    & thead th {
        background-color: var(--marine-blue);
        color: var(--off-white);
        @mixin useTitleFont;
        @mixin size -2;
        text-transform: uppercase;
        text-align: left;
        font-weight: 600;
    }

    & .monitor-table tbody::before {
        content: '';
        display: block;
        height: 0.65rem;
    }

    & .highlight-rows tr:hover {
        background: var(--summer-sky) !important;
        color: white;
        cursor: pointer;
    }

    & th {
        padding: 1.125rem 0 1.125rem 1.1875rem;
    }

    & td {
        padding-left: 1.1875rem;
        padding-right: 1.1875rem;
        color: inherit;
    }

    & tbody td {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        @mixin size 0;

        &:nth-child(2) {
            font-weight: 800;
        }
    }

    & .monitor-table .pagination {
        margin-bottom: 0;
        justify-content: flex-end !important;
        display: flex !important;
        padding-left: 0;
        list-style: none;
    }

    & .monitor-table .page-link {
        user-select: none;
    }

    & .monitor-table .page-link:hover {
        cursor: pointer;
    }

    & .monitor-table .page-item.active {
        margin-left: -1px;
        border-bottom: 2px solid var(--black-pearl);
        z-index: 2;
    }

    & .monitor-table .page-item {
        background-color: white;
    }

    & .monitor-table .page-item.active {
        margin: 0;
        border-color: var(--marine-blue);
        border-bottom: none;
        background-color: var(--marine-blue);
        color: var(--off-white);
    }

    & .page-item {
        padding: 0.75rem 0.95rem;
        border-right: 1px solid var(--whisper);
        color: var(--gray-chateau);
    }

    & select {
        display: none !important;
    }

    & .d-flex {
        justify-content: flex-end;
    }
}
</style>
