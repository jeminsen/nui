<template>
    <div class="portfolio-card">
        <div class="logo-container">
            <div class="logo"><slot></slot></div>
        </div>
        <div class="name-container">
            <div class="l-name">{{ name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PortfolioCard',
    inheritAttrs: false,
    props: {
        logo: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
.logo-container {
    width: 100%;
    height: 11rem;
    border: 1px solid var(--white-smoke);
    position: relative;
}
.logo {
    border: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
}
.name-container {
    width: 100%;
    height: 2.5rem;
    text-align: center;
    background: var(--white-smoke);
    position: relative;
}

.l-name {
    border: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    font-weight: 700;
}
</style>
