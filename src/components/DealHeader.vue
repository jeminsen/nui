<template>
    <div class="title-container">
        <nuxt-link :to="prevRoute" class="back-link">
            <img class="back-icon" src="/assets/icons/Left Arrow.svg" /> Back to List
        </nuxt-link>
        <h1 class="l-title">{{ headerText }}</h1>
        <div class="details">
            <div>
                <i class="material-icons">merge_type</i>
                {{ transactionType }}
            </div>
            <div v-if="industry">
                <img v-if="industry" :src="industryIcon" class="l-icon l-icon--white" />
                <span class="l-sector">{{ industry }}</span>
            </div>
            <div v-if="state">
                <i class="material-icons">room</i>
                <address>
                    <span v-if="city">{{ city }},</span>
                    {{ state }}
                </address>
            </div>
            <div title="Transaction/discovery date">
                <i class="material-icons">today</i>
                <time :datetime="date">{{ date }}</time>
            </div>
        </div>
    </div>
</template>

<script>
import { mappedSector } from '@/utils/sector';

export default {
    name: 'DealHeader',
    props: {
        headerText: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            default: undefined,
        },
        date: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            default: undefined,
        },
        prevRoute: {
            type: Object,
            required: true,
        },
        transactionType: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        industryIcon() {
            return '/' + mappedSector(this.industry).iconWhite;
        },
    },
};
</script>

<style scoped>
.title-container {
    padding: 1.25rem;
    background: var(--nf-blue);
    color: white;
    max-width: 100vw;
}

.back-link {
    @mixin size -1;
}

.back-icon {
    margin-right: 0.625rem;
}

.l-title {
    @mixin size 3;
    @mixin margin top, 2;
}

.details {
    @mixin size 1;
    @mixin margin top, 1;
    display: flex;
    flex-wrap: wrap;
    margin-left: -1rem;
    margin-right: -1rem;
    margin-bottom: -1rem;
}

.details > div {
    margin: 0 1rem;
    display: inline-flex;
    padding-bottom: 1rem;
    @mixin media medium {
        width: 100%;
    }
}

.details > div > address {
    display: inline-block;
    font-style: normal;
}

.l-icon,
.material-icons {
    height: 1.25rem;
    margin-right: 0.5rem;
    vertical-align: bottom;
    width: 1.25rem;
}
</style>
