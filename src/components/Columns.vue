<template>
    <div class="columns"><slot /></div>
</template>

<script>
export default {
    name: 'Columns',
};
</script>

<style>
.columns {
    display: flex;
    margin: 0 -1rem;
    flex-wrap: wrap;

    @mixin media medium {
        margin: 0;
    }
}

.columns > * {
    box-sizing: border-box;
    margin: 0 1rem;
    max-width: 100%;
    width: calc(50% - 2rem);

    @mixin media medium {
        width: 100%;
        margin: 0;
    }
}
</style>
