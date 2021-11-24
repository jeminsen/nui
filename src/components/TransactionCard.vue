<template>
    <div class="transaction-card">
        <div class="top-container">
            <div class="type-container">
                <template v-if="type === 'industrials'">
                    <img style="width: 20px; height: auto" src="/assets/icons/Industrials.svg" />
                    <span class="type">Industrials</span>
                </template>
                <template v-if="type === 'consumer'">
                    <img style="width: 20px; height: auto" src="/assets/icons/Consumer.svg" />
                    <span class="type">Consumer</span>
                </template>
                <template v-if="type === 'business'">
                    <img style="width: 20px; height: auto" src="/assets/icons/Business Services.svg" />
                    <span class="type">Business Services</span>
                </template>
                <template v-if="type === 'TMT'">
                    <img style="width: 20px; height: auto" src="/assets/icons/TMT.svg" />
                    <span class="type">TMT</span>
                </template>
                <template v-if="type === 'financials'">
                    <img style="width: 20px; height: auto" src="/assets/icons/Financial Services.svg" />
                    <span class="type">Financials</span>
                </template>
            </div>
            <div class="calendar-container">
                <img src="/assets/icons/calendar.svg" />
                <span class="date">{{ date }}</span>
            </div>
        </div>
        <p class="text"><slot></slot></p>
    </div>
</template>

<script>
export default {
    name: 'TransactionCard',
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: '',
        },
        date: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
.transaction-card {
    height: auto;
    padding: 1.25rem;
    padding-bottom: 2rem;
    box-shadow: 0px 2px 6px rgba(8, 35, 48, 0.16), 0px 1px 2px rgba(8, 35, 48, 0.24);
    border-radius: 8px;
}
.top-container {
    height: 2rem;
    margin-bottom: 0.5rem;
    margin-top: -0.25rem;
}
.icon--gray {
    color: var(--light-gray);
}

.calendar-container {
    display: inline-block;
    vertical-align: middle;
}

.type-container {
    display: inline-block;
    padding-right: 1rem;
    vertical-align: middle;
}

.type {
    padding-left: 0.25rem;
    font-size: 0.87rem;
    vertical-align: middle;
}

.date {
    padding-left: 0.25rem;
    font-size: 0.87rem;
    vertical-align: middle;
}

img {
    vertical-align: middle;
}

.text {
    line-height: 1.5;
}
</style>
