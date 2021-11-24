<template>
    <div class="l-splash">
        <h1 class="l-text">
            Gain insight into the Lower Middle Market
        </h1>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.l-splash {
    height: 12.5rem;
    background-image: url('~@/assets/nepfin-hero.jpg');
    background-size: 100% auto;
    background-position: 50% 100%;
    padding: 1.25rem;
    padding-bottom: 1.875rem;
    display: flex;
    margin-bottom: 1.875rem;

    @mixin media medium {
        height: 11rem;
        padding-bottom: 1.25rem;
    }
}
.l-text {
    @mixin useTitleFont;
    @mixin size 3;
    font-weight: 600;
    color: #fff;
    max-width: 20rem;
    align-self: flex-end;
}
</style>
