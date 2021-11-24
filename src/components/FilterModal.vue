<template>
    <transition name="slide">
        <div v-if="showModal" class="modal">
            <div class="modal-header">
                <h1 class="l-title">NepFin DealWatch</h1>
                <button @click="onClick" class="close-btn">
                    <img src="/assets/icons/Close.svg" />
                </button>
            </div>
            <div class="modal-filters">
                <sector-filter />
                <date-filter />
            </div>
            <button @click="onClick" class="modal-btn">Apply</button>
        </div>
    </transition>
</template>

<script>
import DateFilter from '@/components/Filters/DateFilter.vue';
import SectorFilter from '@/components/Filters/SectorFilter.vue';

export default {
    name: 'FilterModal',
    components: {
        DateFilter,
        SectorFilter,
    },
    inheritAttrs: false,
    props: {
        showModal: Boolean,
    },
    methods: {
        onClick() {
            this.$emit('closeModal', false);
        },
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 1.2rem;
    flex-direction: column;
    color: white;
    background-color: var(--black-pearl);
    display: None;
    z-index: 11;

    @mixin media large {
        display: flex;
    }
}

.l-title {
    @mixin size -1;
    @mixin useTitleFont;
    position: relative;
    font-weight: 800;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: -2px;
        left: 0;

        width: 3.25rem;
        height: 2px;
        background-color: var(--tealish);
    }
}
.modal-header {
    display: flex;
    margin-bottom: 2rem;
}

.close-btn {
    margin-left: auto;
    background-color: initial;
    border: 0;
    padding: 0;
}

.modal-btn {
    width: 100%;
    height: 3rem;
    background-color: var(--summer-sky);
    border-color: var(--pacific-blue);
    color: white;
    border-bottom-width: 2px;
}

.modal-filters {
    overflow-y: auto;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(100vh);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s linear;
}
</style>
