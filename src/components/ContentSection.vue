<template>
    <div class="l-container">
        <h2 class="l-title">
            {{ title }}
        </h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables';

.l-container {
    padding-left: $spacing-2;
    padding-right: $spacing-2;
}
</style>

<style scoped>
.l-container {
    @mixin margin bottom, 2;
}

.l-title {
    @mixin size -1;
    @mixin useTitleFont;
    font-weight: 500;
    @mixin margin bottom, 1;
}
</style>
