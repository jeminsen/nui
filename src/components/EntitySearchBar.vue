<template>
    <n-input
        v-model="entity"
        @enter="updateRoute"
        @blur="updateRoute"
        class="entity_input"
        label="Search By Entity Name"
    />
</template>

<script>
import NInput from 'nui/cmp/inputs/n-input.vue';

export default {
    name: 'EntitySearchBar',
    components: {
        NInput,
    },
    data() {
        return {
            entity: null,
        };
    },
    watch: {
        $route() {
            this.entity = this.$route.query.entity;
        },
    },
    created() {
        this.entity = this.$route.query.entity;
    },
    methods: {
        updateRoute() {
            if (this.$route.query.entity !== this.entity) {
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        entity: this.entity || undefined,
                        page: 1,
                    },
                });
            }
        },
    },
};
</script>

<style scoped>
.entity_input {
    padding: 0 20px;
    margin-bottom: 20px;
}
</style>
