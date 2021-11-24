export const urlize = function(urlLike) {
    if (!urlLike) return '';
    if (!urlLike.startsWith('http')) {
        urlLike = 'https://' + urlLike;
    }
    return urlLike;
};
