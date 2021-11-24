<template>
    <InfoColumn title="Sign up for our weekly DealWatch">
        <div class="description">The definitive source for the latest deals in the lower middle market.</div>
        <div id="hbsptForm" class="subscribe-form">
            <!-- <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
            <script>
                hbspt.forms.create({
                    region: 'na1',
                    portalId: '20454437',
                    formId: 'efbdbc66-c7d0-4b7b-8acc-ad6c7875345b',
                });
            </script> -->
        </div>
    </InfoColumn>
</template>

<script>
import InfoColumn from 'nui/cmp/footer/_cmp/info-column.vue';

export default {
    components: { InfoColumn },
    data() {
        return {
            hbsptFormElement: null,
            script: null,
            newsletterSignupScript:
                "hbspt.forms.create({region: 'na1', portalId: '20454437', formId: 'efbdbc66-c7d0-4b7b-8acc-ad6c7875345b', });",
        };
    },
    mounted() {
        this.hbsptFormElement = document.getElementById('hbsptForm');
        this.addScript();
    },
    beforeDestroy() {
        this.script.parentNode.removeChild(this.script);
        this.hbsptFormElement.parentNode.removeChild(this.hbsptFormElement);
        window.removeEventListener('message', this.onFormReady);
    },
    methods: {
        addScript() {
            this.script = document.createElement('script');
            this.script.src = 'https://js.hsforms.net/forms/v2.js';
            this.script.setAttribute('id', 'hbsptScript');
            document.body.appendChild(this.script);
            window.addEventListener('message', this.onFormReady);
            this.script.addEventListener('load', this.createHbsptForm);
        },
        createHbsptForm() {
            const hbsptScript = document.createElement('script');
            hbsptScript.innerHTML = this.newsletterSignupScript;
            this.hbsptFormElement.appendChild(hbsptScript);
        },
        onFormReady(event) {
            if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
                const iframe = document.querySelector('.hs-form-iframe');
                const recaptchaIframe = iframe.contentDocument.querySelector('iframe');
                recaptchaIframe.style.marginLeft = '-8px';
            }
        },
    },
};
</script>

<style scoped>
.description {
    margin-bottom: 1.25rem;
}

.hs-form-iframe {
    max-width: 100%;
}

.subscribe-form {
    font-family: 'Open Sans', sans-serif;
    font-weight: normal !important;
    position: -webkit- sticky;
    top: 150px;
    bottom: 80px;
    background-color: #013859;
    color: white;
    border-radius: 4px;
    text-align: center;
    margin-top: 0px;
    box-shadow: 1px 1px #2a3752;
    padding: 10px;
}

.hs-form-required {
    color: yellow;
}
</style>

<style>
.hs-button {
    background-color: #2eb0de !important;
    border-color: #2eb0de !important;
}
</style>
