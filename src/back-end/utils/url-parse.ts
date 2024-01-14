/**
 * Extract the id from the URL with the id
 * placed as the lat path parameter
 *
 * @summary extract id from the URL
 * @param url
 * @returns {number| null}
 */
export const getIdFromUrl = (url: string): number | null => {
    const regExp = /(?<=\/)\d+$/;
    const match = regExp.exec(url);
    return match && parseInt(match[0], 10);
};

/**
 * Return an empty object if no filters have been provided
 * Otherwise return all filters, search keywords and sort
 * value provided
 *
 * @summary extract the filters from the URL
 * @param url
 * @returns  {[k: string]: string;}
 */

export const getFiltersFromUrl = (url: string) => {
    const queryString = new URL(url).search;
    const entries = new URLSearchParams(queryString).entries();

    return Object.fromEntries(entries);
};
