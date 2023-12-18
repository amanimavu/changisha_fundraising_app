export const getIdFromUrl = (url: string): number => {
    const parsedUrl: Array<string> = url.split("/");
    return parseInt(parsedUrl[parsedUrl.length - 1]);
};
