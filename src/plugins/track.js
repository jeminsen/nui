import Vue from 'vue';
import TrackPlugin from 'nui/plugin/track-plugin';

Vue.use(TrackPlugin, '$track', {
    trackingId: process.env.NUXT_ENV_TRACKING_ID,
    isEnabled: process.env.NUXT_ENV_TRACKING_IS_ENABLED === 'true',
    isDebug: process.env.NUXT_ENV_TRACKING_IS_DEBUG === 'true',
});
