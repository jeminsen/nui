<template>
    <div>
        <button :class="{ active: value }" @click="onclick" class="sector-btn">
            <img v-show="value" class="checkmark" src="/assets/icons/Checkmark.svg" />
            <img :src="img_src" class="icon" />
        </button>
        <p class="sector-label">{{ name }}</p>
    </div>
</template>

<script>
export default {
    name: 'SectorCategory',
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Boolean,
            defualt: false,
        },
        bubbleIcon: {
            type: String,
            required: true,
        },
    },
    computed: {
        img_src() {
            return '/' + this.bubbleIcon;
        },
    },
    methods: {
        onclick() {
            this.$emit('input', !this.value);
        },
    },
};
</script>

<style scoped>
.sector-btn {
    width: 100%;
    height: 4.3rem;
    background-color: var(--marine-blue);
    border: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    cursor: pointer;
    display: block;
    position: relative;
    outline: none;
}

.active {
    z-index: 2;
    background-color: #597f62; /* salem with 0.5 opacity */
}

.checkmark {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: rgba(173, 197, 161, 0.5);
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.sector-label {
    text-align: center;
    @mixin size -1;
}
</style>
