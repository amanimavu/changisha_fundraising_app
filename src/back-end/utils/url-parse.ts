export const getIdFromUrl = (url: string): number | null => {
    const regExp = /(?<=\/)d+$/;
    const match = regExp.exec(url);
    return match && parseInt(match[0], 10);
};
