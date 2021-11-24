<template>
    <Footer>
        <CompanyLinks :on-click-contact-us="onClickContactUs" />
        <!-- <Location />
        <SocialLinks /> -->
        <NewsletterSignupForm class="newsletterSignup" />
    </Footer>
</template>

<script>
import CompanyLinks from 'nui/cmp/footer/FooterContent/CompanyLinks.vue';
/*  import Location from 'nui/cmp/footer/FooterContent/Location.vue';  */
/*  import SocialLinks from 'nui/cmp/footer/FooterContent/SocialLinks.vue';  */
import Footer from 'nui/cmp/footer/Footer.vue';
import NewsletterSignupForm from './NewsletterSignupForm.vue';

let ContactUsEventBus = {};
let DISPLAY_MODAL = '';

if (process.client) {
    ContactUsEventBus = require('nui/cmp/v2/ContactUsModal').ContactUsEventBus;
    DISPLAY_MODAL = require('nui/cmp/v2/ContactUsModal').DISPLAY_MODAL;
}

export default {
    components: {
        Footer,
        CompanyLinks,
        /*  Location,  */
        NewsletterSignupForm,
        /*  SocialLinks,  */
    },

    methods: {
        onClickContactUs() {
            ContactUsEventBus.$emit(DISPLAY_MODAL);
            this.$track.view('dealwatch-contactusformfooterlink-submitcontactinfo');
        },
    },
};
</script>

<style scoped>
.newsletterSignup {
    max-width: 22rem;
}

@mixin media large {
    >>> .Cookie--base {
        bottom: 5rem;
        max-width: calc(100vw - 2rem);
    }
    >>> .Cookie__content {
        max-width: initial;
    }
}
</style>
