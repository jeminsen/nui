<template>
    <div class="login-box">
        <a v-if="isAuthenticated" @click="logout" class="l-login">Logout</a>
        <div v-if="isAuthenticated" class="greet-user">
            <img :src="profilePicture" class="profile" />
            {{ userFullName }}
        </div>
        <a v-else @click="login" class="l-login">Sign In</a>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'LoginBox',

    auth: false,

    computed: mapGetters(['isAuthenticated', 'profilePicture', 'userFullName']),

    methods: mapActions(['login', 'logout']),
};
</script>

<style scoped>
.login-box {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    color: var(--tealish);
    margin-bottom: 10px;
}

.l-login {
    font-size: 0.9rem;
    font-weight: 800;
    &:hover {
        cursor: pointer;
    }
}

.greet-user {
    font-size: 0.8rem;
    margin-left: 0;
    font-weight: 800;
}

.profile {
    border-radius: 50%;
    max-height: 24px;
    max-width: 24px;
    vertical-align: middle;
    margin-right: 0.4rem;
}
</style>
