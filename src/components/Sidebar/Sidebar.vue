<template>
    <div>
        <sector-filter />
        <date-filter />
        <div class="download-container">
            <h3 class="download-heading">Download</h3>
            <p class="download-text">
                Download a copy of the deals from DealWatch (Currently limited to 100 rows per download)
            </p>
            <a :class="['download-button', { locked: isLocked }, { disabled: disabled }]" @click="downloadCsv">
                <img v-if="isLocked" src="/assets/icons/Lock.svg" />
                {{ downloadButtonMessage }}
            </a>
        </div>
    </div>
</template>

<script>
import fileDownload from 'js-file-download';
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import DateFilter from '@/components/Filters/DateFilter.vue';
import SectorFilter from '@/components/Filters/SectorFilter.vue';

export default {
    components: {
        DateFilter,
        SectorFilter,
    },
    computed: {
        ...mapGetters({
            selectedSectors: 'sectors/selectedSectors',
            selectedSectorNames: 'sectors/selectedSectorNames',
            sectorQueryString: 'sectors/sectorQueryString',
            translatedIndustries: 'sectors/translatedIndustries',
            isAuthenticated: 'isAuthenticated',
            isEmailVerified: 'isEmailVerified',
            isLocked: 'isLocked',
        }),
        downloadButtonMessage() {
            if (!this.isAuthenticated) {
                return 'Login to Unlock Download';
            }
            if (!this.isEmailVerified) {
                return 'Verify Email to Unlock';
            }
            return 'Download';
        },
        disabled() {
            return this.isAuthenticated && !this.isEmailVerified;
        },
    },
    methods: {
        ...mapActions(['login']),
        gaDownloadEvent() {
            this.$track.event('dealwatch', 'csv-download', this.selectedSectorNames.join(', '));
        },
        getAccessToken() {
            return this.$auth.getToken('auth0');
        },
        async downloadCsv() {
            if (!this.isAuthenticated) {
                this.login();
                return;
            }

            if (!this.isEmailVerified) {
                return;
            }

            const token = await this.getAccessToken();
            const { data } = await this.$sonarApi.get('deal/dealwatch-csv', {
                responseType: 'blob',
                headers: { Authorization: token },
                params: {
                    industry: this.translatedIndustries,
                    entity: this.$route.query.entity || undefined,
                    start_date: this.$route.query.startDate || undefined,
                    end_date: this.$route.query.endDate || undefined,
                },
            });
            const filename = `NepFin_DealWatch_${moment().format('YYYY-MM-DD')}.csv`;
            fileDownload(data, filename);
            this.gaDownloadEvent();
        },
    },
};
</script>

<style scoped>
div {
    /*border: 2px solid blue;*/
    color: white;
}

.download-heading {
    @mixin size 1;
    @mixin useTitleFont;
    font-weight: 600;
}

.download-text {
    @mixin size -1;
    color: var(--tealish);
}

.download-container {
    @mixin padding top, 1;
    border-top: 2px solid var(--summer-sky);
}

.download-button {
    display: block;
    @mixin margin top, 1;
    width: 100%;
    line-height: 3rem;

    border-bottom: 4px solid var(--pacific-blue);
    background: var(--summer-sky);
    color: var(--off-white);
    text-align: center;
    font-weight: 600;

    &:hover {
        cursor: pointer;
    }
}

.download-button > img {
    vertical-align: text-bottom;
    margin-left: 10px;
    margin-right: 10px;
}

.download-button.locked {
    border-bottom: 4px solid var(--battleship-gray);
    background: var(--gray-chateau);
    color: var(--battleship-gray);
}

.download-button.disabled {
    &:hover {
        cursor: not-allowed;
    }
}
</style>
