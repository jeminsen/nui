<template>
    <div>
        <h3 class="filter-heading">Transaction/Discovery Date</h3>
        <p class="filter-text">Filter by date range</p>
        <div class="l-input-container">
            <!-- Start Date Picker -->
            <v-menu top offset-y>
                <template v-slot:activator="{ on }">
                    <v-text-field
                        ref="startDate"
                        v-on="on"
                        v-model="startDate"
                        @click:clear="blur('startDate')"
                        label="Start Date"
                        clearable
                        dark
                        dense
                        filled
                        hide-details
                        readonly
                    />
                </template>
                <v-date-picker v-model="startDate" :allowed-dates="allowedStartDates" />
            </v-menu>

            <!-- End Date Picker -->
            <v-menu top offset-y>
                <template v-slot:activator="{ on }">
                    <v-text-field
                        ref="endDate"
                        v-on="on"
                        v-model="endDate"
                        @click:clear="blur('endDate')"
                        label="End Date"
                        clearable
                        dark
                        dense
                        filled
                        hide-details
                        readonly
                    />
                </template>
                <v-date-picker v-model="endDate" :allowed-dates="allowedEndDates" />
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        startDate: {
            get() {
                return this.$route.query.startDate;
            },
            set(value) {
                this.applyDateFilter('startDate', value);
            },
        },
        endDate: {
            get() {
                return this.$route.query.endDate;
            },
            set(value) {
                this.applyDateFilter('endDate', value);
            },
        },
    },
    methods: {
        allowedStartDates(val) {
            if (this.endDate) {
                return Date.parse(val) <= Date.parse(this.endDate);
            }
            return true;
        },
        allowedEndDates(val) {
            if (this.startDate) {
                return Date.parse(this.startDate) <= Date.parse(val);
            }
            return true;
        },
        applyDateFilter(key, value) {
            this.$router.push({
                query: {
                    ...this.$route.query,
                    [key]: value || undefined,
                    page: 1,
                },
            });
        },
        blur(ref) {
            this.$refs[ref].blur();
        },
    },
};
</script>

<style scoped>
>>> .v-text-field {
    background: var(--marine-blue);
}

.l-input-container {
    margin: 1rem 0;
}

.l-input-container > * {
    margin: 1rem 0;
}

.filter-heading {
    @mixin useTitleFont;
    @mixin size 1;
    font-weight: 600;
}

.filter-text {
    @mixin size -1;
    color: var(--tealish);
}
</style>
