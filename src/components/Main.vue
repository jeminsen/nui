<template>
    <div class="content-container">
        <Header />
        <slot />
        <client-only>
            <Footer />
        </client-only>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            apiUrl: `${process.env.NUXT_ENV_NHOME_API}lead`,
        };
    },
};
</script>
