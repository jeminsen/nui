<template>
    <v-app id="app">
        <nuxt />
        <client-only>
            <ContactUsModal :api-url="apiUrl" />
        </client-only>
    </v-app>
</template>

<script>
import Vue from 'vue';

export default {
    data() {
        return {
            apiUrl: `${process.env.NUXT_ENV_NHOME_API}lead`,
        };
    },

    beforeMount() {
        // Register ContactUsModal only in the client
        Vue.component('ContactUsModal', () => import('nui/cmp/v2/ContactUsModal'));

        // Set userId for GA only in client
        if (this.$auth.user) {
            this.$track.ga('set', 'userId', this.$auth.user.sub);
        }
    },
};
</script>

<style>
@import '~normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/css?family=Lora:400i|Montserrat:400,500,600,800|Open+Sans:300,400,400i,600');
@import '~nui/css/common/meta/var.css';

html {
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

@mixin fontsDisplaySettings;

p,
h1,
h2,
h3,
h4,
h5,
h6,
span,
a,
ul,
li {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: inherit;
}

body {
    background-color: var(--white-smoke);
}

/* Vuetify resets */
div.v-application {
    font-family: inherit;
    line-height: inherit;
}
div.v-application a {
    color: inherit;
}
div.v-application p {
    margin-bottom: inherit;
}
div.theme--light.v-application {
    background: inherit;
    color: inherit;
}
</style>
