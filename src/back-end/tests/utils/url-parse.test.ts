import { getIdFromUrl, getFiltersFromUrl } from "@/backend/utils/url-parse";
import { test, expect, describe } from "@jest/globals";

describe("Extract the id from the URL", () => {
    test("Given a URL with a positive integer as the last path parameter", () => {
        const url = "http://localhost:3000/users/1";
        expect(getIdFromUrl(url)).toBe(1);
        expect(getIdFromUrl(url)).not.toBe("1");
    });

    test("Given a URL with a double digit positive integer as the last path parameter", () => {
        const url = "http://localhost:3000/users/12";
        expect(getIdFromUrl(url)).toBe(12);
    });

    test("Given a URL with a float as the last path parameter", () => {
        const url = "http://localhost:3000/users/1.23";
        expect(getIdFromUrl(url)).toBe(null);
        expect(getIdFromUrl(url)).not.toBe(1);
        expect(getIdFromUrl(url)).not.toBe(1.23);
    });

    test("Given a URL with a 0 as the last path parameter", () => {
        const url = "http://localhost:3000/users/0";
        expect(getIdFromUrl(url)).toBe(0);
    });

    test("Given a URL with a negative integer as the last path parameter", () => {
        const url = "http://localhost:3000/users/-3";
        expect(getIdFromUrl(url)).toBe(null);
        expect(getIdFromUrl(url)).not.toBe(-3);
    });

    test("Given a URL with worded integer as the last path parameter", () => {
        const url = "http://localhost:3000/users/one";
        expect(getIdFromUrl(url)).toBe(null);
        expect(getIdFromUrl(url)).not.toBe(1);
    });

    test("Given a URL with without path parameter", () => {
        const url = "http://localhost:3000/users/";
        expect(getIdFromUrl(url)).toBe(null);
    });

    test("Given a URL with a path parameter that isn't at the end", () => {
        const url = "http://localhost:3000/users/12/user";
        expect(getIdFromUrl(url)).toBe(null);
        expect(getIdFromUrl(url)).not.toBe(12);
    });
});

describe("Extract the filters from the URL", () => {
    test("Given a url with query parameters", () => {
        const url = "http://localhost:3000/users?color=red&model=ferrari";
        expect(getFiltersFromUrl(url)).toEqual({
            color: "red",
            model: "ferrari"
        });
    });

    test("Given a url without query parameters", () => {
        const url = "http://localhost:3000/users?";
        expect(getFiltersFromUrl(url)).toEqual({});
    });
});
