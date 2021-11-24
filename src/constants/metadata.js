export const DEFAULT_DESCRIPTION = 'Business Intelligence and Broad Market Research for the Lower Middle Market';
export const DATA_DESCRIPTION =
    'Repository of lower-middle market acquisition and investment transactions in the United States';

export const InvestmentTypes = {
    MAJORITY_ACQUISITION: 'Majority Acquisition',
    MINORITY_INVESTMENT: 'Minority Investment',
};

export const TRANSACTION_TYPE_DISPLAY_ACTIONS = {
    [InvestmentTypes.MAJORITY_ACQUISITION]: 'acquired by',
    [InvestmentTypes.MINORITY_INVESTMENT]: 'invested in by',
};
