import { TRANSACTION_TYPE_DISPLAY_ACTIONS } from '@/constants/metadata';

/**
 * Returns a human-readable short description of a deal, like "A acquired by B"
 * @param {object} deal Deal payload from the Sourcing API
 */
export function generateDealDescription(deal) {
    const targetCompany = deal.target_company_1_name || 'Company';
    const buyerCompany = deal.buyer_or_investor_1_name || 'Investor';
    const transactionTypeDisplayAction = TRANSACTION_TYPE_DISPLAY_ACTIONS[deal.transaction_type];

    return `${targetCompany} ${transactionTypeDisplayAction} ${buyerCompany}`;
}

export function buildOpenGraphUrlTag(path) {
    return {
        name: 'og:url',
        content: `${process.env.NUXT_ENV_BASE_URL}${path}`,
    };
}
