export const toQueryString = (params) => {
        const queryString = Object.keys(params)
            .map(key => {
                if (typeof params[key] === 'object' && params[key] !== null) {
                    return Object.keys(params[key])
                        .map(subKey => `${encodeURIComponent(key + '[' + subKey + ']')}=${encodeURIComponent(params[key][subKey])}`)
                        .join('&');
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            })
            .join('&');
    return queryString;
};
