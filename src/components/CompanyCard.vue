<template>
    <div class="card">
        <h3 v-text="name" class="card-name" />
        <div v-if="body" v-text="body" class="card-row" />
        <div v-if="description" class="card-row">
            <i class="material-icons icon--gray">info</i>
            {{ description | capitalize }}
        </div>
        <div v-if="state" class="card-row">
            <i class="material-icons icon--gray">room</i>
            {{ city }}, {{ state }}
        </div>
        <div v-if="!hideUrl" class="card-row">
            <i class="material-icons icon--gray">exit_to_app</i>
            <a v-if="url" v-text="url" :href="url | urlize" class="card-link" rel="nofollow" target="_blank" />
            <span v-else class="empty-website">Website not detected</span>
        </div>
    </div>
</template>

<script>
import { capitalize } from '../filters/capitalize';
import { urlize } from '../filters/urlize';

export default {
    name: 'CompanyCard',

    filters: { capitalize, urlize },

    props: {
        name: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            default: undefined,
        },
        city: {
            type: String,
            default: undefined,
        },
        description: {
            type: String,
            default: undefined,
        },
        hideUrl: {
            type: Boolean,
            default: false,
        },
        industry: {
            type: String,
            default: undefined,
        },
        state: {
            type: String,
            default: undefined,
        },
        url: {
            type: String,
            default: undefined,
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
.icon--gray {
    color: var(--light-gray);
}

.card-row {
    align-items: center;
    display: flex;
    margin-top: 0.5rem;
}

.card-row > i {
    font-size: 0.9rem;
    margin-right: 0.5rem;
}

.card-name {
    @mixin margin bottom, 0.5;
    flex-grow: 1;
}

.card-link {
    color: var(--nf-blue);
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.empty-website {
    color: var(--matterhorn);
}
</style>
