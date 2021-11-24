<template>
    <div>
        <i class="material-icons l-icon">{{ icon }}</i>
        <span class="text"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: 'IconInfo',
    inheritAttrs: false,
    props: {
        icon: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
.l-icon {
    vertical-align: middle;
    padding-right: 0.2rem;
}
.text {
    vertical-align: middle;
}
</style>
