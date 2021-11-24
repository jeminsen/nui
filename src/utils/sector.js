import sectorsJson from '@/def/sectors.json';

const mappedSector = (sector) => {
    let sectorName;

    // TODO Update this when we resolve sector is array issue
    if (Array.isArray(sector)) {
        [sectorName] = sector;
    } else {
        sectorName = sector;
    }

    if (sectorName === 'Telecommunication') {
        sectorName = 'Telecom';
    }
    if (sectorName === 'Information Technology') {
        sectorName = 'Technology';
    }
    if (sectorName === 'Industrial') {
        sectorName = 'Industrials';
    }

    for (const sectorJson of sectorsJson) {
        if (sectorName === sectorJson.name) {
            return sectorJson;
        }
    }
    return null;
};

export { mappedSector };
