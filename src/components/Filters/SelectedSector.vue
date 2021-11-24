<template>
    <div :style="{ borderColor: color, color: color }" class="icon-container">
        <img :src="img_src" class="icon-img" />
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    name: 'SelectedSector',
    props: {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    computed: {
        img_src() {
            return '/' + this.icon;
        },
    },
};
</script>

<style scoped>
.icon-container {
    display: flex;
    border: solid 0.1rem;
    border-radius: 0.8rem;
    font-size: 0.7rem;
    padding: 0.3rem;
    margin: 0.5em 0;
}

.icon-img {
    height: 15px;
    width: 15px;
}

p {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
}
</style>
