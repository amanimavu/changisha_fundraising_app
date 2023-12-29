export const getIdFromUrl = (url: string): number | null => {
    const regExp = /(?<=\/)d+$/;
    const match = regExp.exec(url);
    return match && parseInt(match[0], 10);
};

export const getFiltersFromUrl = (url: string): string[][] | null => {
    const queryStringRegExp = /(?<=\?).+$/;
    const queryParamPairsRegExp = /[a-z]+=\w+/g;

    const queryString = queryStringRegExp.exec(url);
    const queryParamPairs =
        queryString && queryString[0].match(queryParamPairsRegExp);

    return queryParamPairs && queryParamPairs.map((pair) => pair.split("="));
};
