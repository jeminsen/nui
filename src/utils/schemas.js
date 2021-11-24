/**
 * Returns a Vue Meta-compatible object for a Schema.org structured data definition
 * @param {string} type Schema.org metadata type
 * @param {object} properties features of this metadata type
 */
export const buildSchemaScript = function(type, properties) {
    return {
        type: 'application/ld+json',
        json: {
            '@context': 'http://schema.org',
            '@type': type,
            ...properties,
        },
    };
};
