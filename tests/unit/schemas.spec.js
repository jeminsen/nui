import { buildSchemaScript } from '@/utils/schemas';
import { DATA_DESCRIPTION } from '@/constants/metadata';

describe('buildSchemaScript()', () => {
    it('returns a Vue Meta-compatible script object for a Schema.org definition', () => {
        const schemaType = 'Dataset';
        const datasetSchema = buildSchemaScript(schemaType, {
            name: 'NepFin DealWatch',
            description: DATA_DESCRIPTION,
            variableMeasured: 'business equity transaction',
            license: 'https://www.nepfin.com/terms-of-service',
            measurementTechnique: 'proprietary',
        });
        expect(datasetSchema.type).toBe('application/ld+json');
        expect(datasetSchema.json['@context']).toBe('http://schema.org');
        expect(datasetSchema.json['@type']).toBe(schemaType);

        const propertyNames = Object.keys(datasetSchema.json);
        expect(propertyNames).toContain('name');
        expect(propertyNames).toContain('description');
        expect(propertyNames).toContain('variableMeasured');
        expect(propertyNames).toContain('license');
        expect(propertyNames).toContain('measurementTechnique');
    });
});
