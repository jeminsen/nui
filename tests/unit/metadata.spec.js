import { generateDealDescription } from '@/utils/metadata';
import { InvestmentTypes } from '@/constants/metadata';

const targetCompanyName = 'ACME Corp';
const buyerInvestorName = 'Big Business Inc';

const MAJORITY_ACQUISITION_DEAL = {
    target_company_1_name: targetCompanyName,
    buyer_or_investor_1_name: buyerInvestorName,
    transaction_type: InvestmentTypes.MAJORITY_ACQUISITION,
};

const MINORITY_INVESTMENT_DEAL = {
    ...MAJORITY_ACQUISITION_DEAL,
    transaction_type: InvestmentTypes.MINORITY_INVESTMENT,
};

const MISSING_TARGET_COMPANY_DEAL = {
    ...MAJORITY_ACQUISITION_DEAL,
    target_company_1_name: null,
};

const MISSING_INVESTOR_DEAL = {
    ...MAJORITY_ACQUISITION_DEAL,
    buyer_or_investor_1_name: null,
};

describe('generateDealDescription()', () => {
    it('generates a majority acquisition description', () => {
        const description = generateDealDescription(MAJORITY_ACQUISITION_DEAL);
        expect(description).toBe('ACME Corp acquired by Big Business Inc');
    });

    it('generates a minority investment description', () => {
        const description = generateDealDescription(MINORITY_INVESTMENT_DEAL);
        expect(description).toBe('ACME Corp invested in by Big Business Inc');
    });

    it('includes a placeholder if target company name missing', () => {
        const description = generateDealDescription(MISSING_TARGET_COMPANY_DEAL);
        expect(description).toBe('Company acquired by Big Business Inc');
    });

    it('includes a placeholder if investor name missing', () => {
        const description = generateDealDescription(MISSING_INVESTOR_DEAL);
        expect(description).toBe('ACME Corp acquired by Investor');
    });
});
