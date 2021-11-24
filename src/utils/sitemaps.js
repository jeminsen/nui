// Use a relative path instead because Nuxt's config file can't resolve path aliases.
import axios from 'axios';

/**
 * Returns a URL path with the leading domain stripped.
 * Assumes that the URL does not include a protocol.
 * @param {string} url URL path without protocol
 */
function stripLeadingDomain(url) {
    return url.substring(url.indexOf('/') + 1);
}

/**
 * Returns a list of deal URLs from the Sourcing API.
 */
export async function fetchDealSitemapEntries(sourcingApiBase) {
    const sitemapEndpoint = sourcingApiBase + 'deal/dealwatch/sitemap';
    try {
        const { data } = await axios.get(sitemapEndpoint);
        return data.map((deal) => stripLeadingDomain(deal.loc));
    } catch (err) {
        console.error(`Could not reach sitemap endpoint: ${sitemapEndpoint}`);
    }
}
