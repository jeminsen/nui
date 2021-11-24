<template>
    <div class="container">
        <FilterModal :show-modal="showModal" @closeModal="closeModal" />
        <div v-show="!showModal" class="menu">
            <div class="menu-item">
                <button @click="openModal">
                    <img src="/assets/icons/Filter Toggle.svg" />
                    Filters
                </button>
            </div>
            <div v-if="!isAuthenticated" class="menu-item">
                <button @click="login">
                    <img src="/assets/icons/Avatar.svg" />
                    Sign In
                </button>
            </div>
            <div v-else class="menu-item">
                <button @click="logout">
                    <img :src="profilePicture" class="profile-pic" />
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash/core';
import FilterModal from '@/components/FilterModal.vue';

export default {
    name: 'BottomBar',
    components: {
        FilterModal,
    },
    data() {
        return {
            showModal: false,
            scrollY: 0,
            previouslySelectedSectors: [],
        };
    },
    computed: {
        ...mapGetters({
            isAuthenticated: 'isAuthenticated',
            profilePicture: 'profilePicture',
            selectedSectorNames: 'sectors/selectedSectorNames',
        }),
    },
    methods: {
        ...mapActions(['login', 'logout']),
        openModal() {
            this.scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollY}px`;
            this.showModal = true;
            this.previouslySelectedSectors = this.selectedSectorNames;
        },
        closeModal() {
            document.body.style.position = '';
            document.body.style.top = '';
            this.showModal = false;

            if (!_.isEqual(this.previouslySelectedSectors, this.selectedSectorNames)) {
                this.$router.push({
                    name: 'index',
                    query: {
                        ...this.$route.query,
                        sectors: this.selectedSectorNames,
                        page: 1,
                    },
                });
            } else {
                this.$nextTick().then(() => window.scrollTo(0, this.scrollY));
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: None;
    @mixin media large {
        display: initial;
    }
}

.menu-item {
    width: 50%;
    text-align: center;
}

.menu-item > button {
    color: inherit;
    font-size: 0.7rem;
    background-color: inherit;
    border-width: 0;
}

.menu-item > button > img {
    height: 2rem;
    width: 2rem;
    display: block;
    position: relative;
    left: calc(50% - 1rem);
    margin-bottom: 0.5rem;
}

.profile-pic {
    border-radius: 50%;
}

.menu {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-color: var(--black-pearl);
    color: var(--gray-chateau);
    z-index: 1;
}
</style>
