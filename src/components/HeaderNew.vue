<template>
    <div class="l-header">
        <div class="row">
            <nuxt-link to="/">
                <div class="logo-container">
                    <div class="logo" />
                    <span class="divider"></span>
                    <h1 class="l-title">DealWatch</h1>
                </div>
            </nuxt-link>
            <div class="l-header-content">
                <button @click="clickSubmit" class="l-submit">Submit Deal</button>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
let ContactUsEventBus = {};
let DISPLAY_MODAL = '';

if (process.client) {
    ContactUsEventBus = require('nui/cmp/v2/ContactUsModal').ContactUsEventBus;
    DISPLAY_MODAL = require('nui/cmp/v2/ContactUsModal').DISPLAY_MODAL;
}

export default {
    methods: {
        clickSubmit() {
            ContactUsEventBus.$emit(DISPLAY_MODAL, {
                regards_to: 'Submit a Deal',
            });
            this.$track.view('dealwatch-contactusformheadersection-submitcontactinfo');
        },
    },
};
</script>

<style scoped>
.l-header {
    padding: 30px 0px;
    background-color: white;
}

.row {
    padding: 0 3.125rem;
    display: flex;
    align-items: center;
}

.logo {
    background: url('https://cdn2.hubspot.net/hubfs/6633003/NepFin_December2019/images/n-nepfin-dark.ebf4699a.svg')
        no-repeat;
    height: 2.5rem;
    width: 9rem;
    display: inline-block;
    vertical-align: middle;
}

.divider {
    height: 2.5rem;
    width: 1px;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    border-right: 1px solid #dbdbdb;
    display: inline-block;
    vertical-align: middle;
}

.l-title {
    color: var(--battleship-gray);
    @mixin size 4;
    display: inline-block;
    vertical-align: middle;
}

.l-header-content {
    margin-left: auto;
}

.l-submit {
    padding: 0.5rem 1rem;
    color: white;
    background-color: var(--summer-sky);
    @mixin size -1;
    @mixin useTitleFont;
    font-weight: 600;
    outline: none;
}
</style>
