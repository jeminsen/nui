function extractInvestorsFromDealResponse(deal) {
    const investors = [];
    if (deal.buyer_or_investor_1_name) {
        investors.push({
            name: deal.buyer_or_investor_1_name,
            url: deal.buyer_or_investor_1_url,
        });
    }
    if (deal.buyer_or_investor_2_name) {
        investors.push({
            name: deal.buyer_or_investor_2_name,
            url: deal.buyer_or_investor_2_url,
        });
    }
    return investors;
}

function extractTargetsFromDealResponse(deal) {
    const targets = [];
    targets.push({
        name: deal.target_company_1_name,
        description: deal.target_company_1_description,
        city: deal.target_company_1_city,
        state: deal.target_company_1_state,
        industry: deal.target_company_1_industry,
        url: deal.target_company_1_url,
    });
    if (deal.target_company_2_name) {
        targets.push({
            name: deal.target_company_2_name,
            description: deal.target_company_2_description,
            city: deal.target_company_2_city,
            state: deal.target_company_2_state,
            industry: deal.target_company_2_industry,
            url: deal.target_company_2_url,
        });
    }
    return targets;
}

function extractPortfolioCompanyFromDealResponse(deal) {
    const portfolioCompanyName = deal.portfolio_company_name;
    if (!portfolioCompanyName) {
        return {};
    }
    return {
        name: portfolioCompanyName,
        url: deal.portfolio_company_url,
    };
}

const extractSellersLendersAdvisorsFromDealResponse = function(deal) {
    const sellersLendersAdvisors = [];
    if (deal.lenders) {
        sellersLendersAdvisors.push({
            type: 'Lenders',
            value: deal.lenders,
        });
    }
    if (deal.buyer_advisors) {
        sellersLendersAdvisors.push({
            type: 'Buyer Advisors',
            value: deal.buyer_advisors,
        });
    }
    if (deal.sellers) {
        sellersLendersAdvisors.push({
            type: 'Sellers',
            value: deal.sellers,
        });
    }
    if (deal.seller_advisors) {
        sellersLendersAdvisors.push({
            type: 'Seller Advisors',
            value: deal.seller_advisors,
        });
    }
    return sellersLendersAdvisors;
};

export const extractEntitiesFromDealResponse = function(deal) {
    return {
        investors: extractInvestorsFromDealResponse(deal),
        portfolioCompany: extractPortfolioCompanyFromDealResponse(deal),
        sellersLendersAdvisors: extractSellersLendersAdvisorsFromDealResponse(deal),
        targets: extractTargetsFromDealResponse(deal),
    };
};
