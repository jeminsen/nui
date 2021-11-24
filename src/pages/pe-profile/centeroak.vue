<template>
    <section class="pe-profile">
        <Header />
        <section class="pe-card-container">
            <div class="pe-card">
                <section class="pe-card-header">
                    <button class="submit">Submit Edit</button>
                    <h2 class="subtitle">Private Equity Firm</h2>
                    <h1 class="l-title">CenterOak Partners</h1>
                    <p class="desc">
                        CenterOak Partners is a private equity company that specializes in identifying attractive
                        investment opportutnies within niche segments of the three key industry sectors: Industrial
                        Growth, Consumer and Business Services.
                    </p>
                    <div class="icon-info-section">
                        <IconInfo class="icon-info" icon="home">http://www.centeroakpartners.com</IconInfo>
                        <IconInfo class="icon-info" icon="room">Dallas, TX</IconInfo>
                    </div>
                </section>
                <div class="section-divider" />
                <!-- <section class="pe-card-filters">
                    Filters
                </section> -->
                <section class="pe-card-portfolio">
                    <h1 class="section-title">Portfolio</h1>
                    <div class="pe-card-portfolio-container">
                        <PortfolioCard name="Aakash Chemicals">
                            <img src="/assets/portfolio-logos/aakash.png" />
                        </PortfolioCard>
                        <PortfolioCard name="SurfacePrep">
                            <img src="/assets/portfolio-logos/surfaceprep.png" />
                        </PortfolioCard>
                        <PortfolioCard name="Cascade Windows">
                            <img src="/assets/portfolio-logos/cascade.png" />
                        </PortfolioCard>
                        <PortfolioCard name="FullSpeed Automotive">
                            <img src="/assets/portfolio-logos/fullspeed.png" />
                        </PortfolioCard>
                        <PortfolioCard name="Service Champions">
                            <img src="/assets/portfolio-logos/service.png" />
                        </PortfolioCard>
                        <PortfolioCard name="Wetzel's Pretzels">
                            <img src="/assets/portfolio-logos/wetzel.png" />
                        </PortfolioCard>
                    </div>
                </section>
                <section class="pe-card-transactions">
                    <h1 class="section-title">Transactions</h1>
                    <div class="transaction-card-container">
                        <TransactionCard date="07/14/2020" type="consumer"
                            ><a>Service Champions</a>, backed by CenterOak Partners, acquired
                            <a>ABC Cooling Heating & Plumbing</a>, a Hayward, CA-based provider of residential air
                            conditioning and plumbing repair services
                        </TransactionCard>
                        <TransactionCard date="05/11/2020" type="industrials">
                            CenterOak Partners rebranded its surface enhancement solutions business to
                            <a>SurfacePrep</a>, and acquired <a>Temple Associates</a>, a Sacramento, CA-based
                            distributor of loose abrasives and blast equipment
                        </TransactionCard>
                        <TransactionCard date="02/13/2020" type="consumer">
                            <a>Service Champions</a>, backed by CenterOak Partners, acquired
                            <a>Bell Brothers Plumbing Heating and Air</a>, a Mather, CA-based provider of residential
                            air conditioning and plumbing services
                        </TransactionCard>
                        <TransactionCard date="02/03/2020" type="consumer">
                            <a>Cascade Windows</a>, backed by CenterOak Partners, acquired
                            <a>Amerimax Windows & Doors</a>, a Norcross, GA-based manufacturer of vinyl windows and
                            doors
                        </TransactionCard>
                        <TransactionCard date="01/29/2020" type="consumer">
                            <a>FullSpeed Automotive</a>, backed by CenterOak Partners, has acquired
                            <a>American LubeFast</a>, a Lawrenceville, GA based provider of quick lube services
                        </TransactionCard>
                        <TransactionCard date="08/19/2019" type="industrials">
                            <a>Safelite Group</a> has acquired <a>TruRoad Holdings</a>, a Woburn, PA-based provider of
                            on-demand auto glass, advanced driver assistance systems recalibration and claims
                            management, from CenterOak Partners
                        </TransactionCard>
                        <TransactionCard date="05/15/2019" type="consumer">
                            CenterOak Partners has acquired <a>Service Champions</a>, an Orange County, CA based
                            provider of HVAC services for residential homeowners; and merged it with existing portfolio
                            company <a>Moore Home Services</a>
                        </TransactionCard>
                        <TransactionCard date="03/26/2019" type="business">
                            <a>TruRoad Holdings</a>, backed by CenterOak Partners, acquired (i)
                            <a>Apple Auto Glass</a> based in Portland, OR, and (ii)
                            <a>Hudson Valley Auto Glass</a> based in Wappingers Falls, NY, both providers of auto glass
                            replacement and repair
                        </TransactionCard>
                    </div>
                </section>
            </div>
        </section>
        <section class="about-nepfin">
            <div class="container">
                <h2 class="subtitle">About NepFin</h2>
                <p class="desc">
                    NepFin utilizes cutting-edge technology to bring you up-to-date intelligence on the middle market.
                </p>
            </div>
        </section>
        <section class="investment-criteria">
            <div class="container">
                <h1 class="l-title">NepFin's Investment Criteria</h1>
                <div class="cols">
                    <div>
                        <h2 class="col-title">Investment Profile</h2>
                        <ul class="col-content">
                            <li>Up to $30M</li>
                            <li>Senior Secured Term Loans</li>
                            <li>Lead and Participate</li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="col-title">Company Profile</h2>
                        <ul class="col-content">
                            <li>EBITDA $2M+</li>
                            <li>U.S. Based</li>
                            <li>Sponsored & Non-Sponsored</li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="col-title">Transaction Types</h2>
                        <ul class="col-content">
                            <li>Strategic Acquisitions</li>
                            <li>Refinancings</li>
                            <li>Recapitalizations</li>
                            <li>Ownership Transitions</li>
                            <li>Growth Capital</li>
                        </ul>
                    </div>
                </div>
                <div class="ic-divider"></div>
                <button @click="clickSubmit" class="ic-contact">Contact NepFin</button>
            </div>
        </section>
        <client-only>
            <Footer />
        </client-only>
        <!-- <bottom-bar /> -->
    </section>
</template>

<script>
// import BottomBar from '@/components/BottomBar.vue';
import Header from '@/components/HeaderNew.vue';
import Footer from '@/components/Footer/Footer.vue';
import IconInfo from '@/components/IconInfo.vue';
import PortfolioCard from '@/components/PortfolioCard.vue';
import TransactionCard from '@/components/TransactionCard.vue';
import { DATA_DESCRIPTION } from '@/constants/metadata';
import { buildOpenGraphUrlTag } from '@/utils/metadata';
import { buildSchemaScript } from '@/utils/schemas';

let ContactUsEventBus = {};
let DISPLAY_MODAL = '';

if (process.client) {
    ContactUsEventBus = require('nui/cmp/v2/ContactUsModal').ContactUsEventBus;
    DISPLAY_MODAL = require('nui/cmp/v2/ContactUsModal').DISPLAY_MODAL;
}

export default {
    name: 'PEProfilePage',
    components: {
        Header,
        Footer,
        IconInfo,
        PortfolioCard,
        TransactionCard,
        // BottomBar,
    },
    head() {
        return {
            meta: [buildOpenGraphUrlTag(this.$route.path)],
            script: [
                buildSchemaScript('Dataset', {
                    name: 'NepFin DealWatch',
                    description: DATA_DESCRIPTION,
                    variableMeasured: 'business equity transaction',
                    license: 'https://www.nepfin.com/terms-of-service',
                    measurementTechnique: 'proprietary',
                }),
            ],
        };
    },
    data() {
        return {};
    },
    mounted() {
        this.$track.view('dealwatch/main');
    },
    methods: {
        clickSubmit() {
            ContactUsEventBus.$emit(DISPLAY_MODAL, {
                regards_to: 'Submit a Deal',
            });
            this.$track.view('dealwatch-contactusformheadersection-submitcontactinfo');
        },
    },
};
</script>

<style scoped>
.pe-card-container {
    padding-top: 3rem;
    padding-bottom: 3rem;
}
.pe-card {
    background-color: white;
    padding: 4rem;
    padding-top: 3rem;
    max-width: 70rem;
    margin: auto;
    margin-bottom: 2rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    position: relative;
}

.pe-card-header {
    max-width: 40rem;
    color: #333;
}

.subtitle {
    font-family: 'Crimson Text', serif;
    @mixin size 1;
}

.l-title {
    font-family: 'Crimson Text', serif;
    font-weight: 800;
    @mixin size 6;
    position: relative;
    bottom: 0.2rem;
}

.desc {
    line-height: 1.5;
}

.section-divider {
    background-color: #dbdbdb;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    height: 1px;
}

.section-title {
    font-family: 'Crimson Text', serif;
    font-weight: 800;
    @mixin size 5;
    margin-bottom: 1rem;
}

.pe-card-filters {
    margin-bottom: 2rem;
}

.pe-card-portfolio {
    margin-bottom: 3rem;
}

.icon-info-section {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
}

.icon-info {
    margin-bottom: 0.5rem;
}

.pe-card-portfolio-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 2.5rem;
    grid-row-gap: 2.5rem;
}

.transaction-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
}

.transaction-card-container a {
    color: var(--hyperlink-blue);
    font-weight: 800;
    text-decoration: underline;
}

.about-nepfin {
    background-color: white;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
}

.about-nepfin .container {
    max-width: 70rem;
    margin: auto;
}

.about-nepfin .subtitle {
    font-weight: 500;
    font-family: 'Montserrat';
    color: #6eb2e2;
    margin-bottom: 0.25rem;
}

.about-nepfin .desc {
    font-family: 'Lora';
    @mixin size 5;
    max-width: 60rem;
}

.submit {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background: var(--nf-blue);
    color: white;
    padding: 1rem 2.5rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
}

.investment-criteria {
    background-image: url('~@/assets/ic-bg.png');
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-position: 50% 50%;
}

.investment-criteria .container {
    max-width: 70rem;
    margin: auto;
    color: white;
}

.investment-criteria .l-title {
    @mixin size 6;
    font-family: 'Lora';
    font-weight: 400;
    margin-bottom: 3rem;
}

.investment-criteria .cols {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 5rem;
}

.investment-criteria .col-title {
    @mixin size 3;
    font-family: 'Montserrat';
    margin-bottom: 1rem;
    font-weight: 600;
    text-transform: uppercase;
}

.investment-criteria .col-content {
    @mixin size 2;
    line-height: 1.75;
}

.ic-divider {
    width: 110px;
    height: 7px;
    background-color: var(--nf-soft-blue);
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.ic-contact {
    margin-bottom: 1rem;
    @mixin size 3;
    color: white;
    background-color: var(--nf-soft-blue);
    padding: 1.5rem 5rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
