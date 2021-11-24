<template>
    <Main>
        <Splash />
        <div class="container">
            <h1 v-text="title" />
            <p v-text="message" />
            <p><nuxt-link to="/">Return to the Home Page</nuxt-link></p>
        </div>
    </Main>
</template>

<script>
import Main from '@/components/Main.vue';
import Splash from '@/components/Splash.vue';

export default {
    components: { Main, Splash },

    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },

    computed: {
        title() {
            if (this.statusCode === 404) {
                return 'Page not found';
            }
            return 'An error occurred';
        },

        message() {
            if (this.statusCode === 404) {
                return 'We were unable to find the page you requested';
            }
            return this.error.message;
        },

        statusCode() {
            return (this.error && this.error.statusCode) || 500;
        },
    },
};
</script>

<style scoped>
p {
    margin: 1rem auto;
}

a {
    color: var(--hyperlink-blue);
}
</style>
