<template>
    <div class="l-header">
        <nuxt-link to="/"><h1 class="l-title">DealWatch</h1></nuxt-link>
        <div class="l-header-content">
            <!-- <button @click="clickSubmit" class="l-submit">Submit Deal</button> -->
            <a
                href="mailto:dealwatchteam@thedealwatch.com?subject=DealWatch%20Submission&body=Please%20provide%20the%20following%3A%0D%0A-Company%20acquired%20(with%20website%20link)%0D%0A-PE%20Sponsor%0D%0A-Platform%20acquirer%20(if%20applicable)%0D%0A-Advisors%20and%2For%20lenders%20involved"
                target="_blank"
                class="l-submit"
                >Submit Deal</a
            >
            <slot />
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
    padding: 1.25rem;
    display: flex;
    align-items: center;
}

.l-title {
    @mixin size -1;
    @mixin useTitleFont;
    font-weight: 800;
    position: relative;
}

.l-title::before {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    left: 0;
    width: 3.25rem;
    height: 2px;
    background-color: var(--tealish);
}

.l-header-content {
    margin-left: auto;
}

.l-submit {
    padding: 0.5rem 1rem;
    color: white;
    appearance: button;
    background-color: var(--summer-sky);
    @mixin size -1;
    @mixin useTitleFont;
    font-weight: 600;
    outline: none;
}
</style>
