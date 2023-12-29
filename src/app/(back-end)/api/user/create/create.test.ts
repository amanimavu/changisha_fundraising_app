/**
 * @jest-environment-node
 */

import { createRequest, RequestOptions } from "node-mocks-http";
import { type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { test, expect } from "@jest/globals";
import { POST as createUser } from "@/api/user/create/route";

test("Testing the endpoint for user creation", async () => {
    type user = Prisma.UserCreateInput | object;
    const body = {
        firstName: "Caroline",
        lastName: "Kawuki",
        userName: "kaki",
        email: "carolinekawuki@gmail.com",
        address: "Nyali",
        password: "Test@1234"
    };
    const requestObject: RequestOptions = {
        method: "POST",
        url: "/api/user/create",
        headers: {
            "content-type": "application/json"
        },
        body
    };
    try {
        const userRequest: unknown = createRequest(requestObject);
        const resp = await createUser(userRequest as NextRequest);
        expect(resp.status).toBe(200);
        const createdUser = (await resp.json()) as user;
        expect(createdUser).toStrictEqual({ ...body, donors: {} });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`${error.name}: ${error.message}`);
        }
    }
});
