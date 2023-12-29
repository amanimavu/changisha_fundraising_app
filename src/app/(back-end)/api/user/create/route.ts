import { NextResponse, type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

/**
 * Get the contents of the body of the HTTP request
 * Use prisma client to create a User instance then
 * insert the record in the changisha database
 *
 * @summary Create a user
 * @async
 * @param request - HTTP request from the client
 * @returns {Promise<NextResponse>} - Promise of a HTTP response
 */

export async function POST(request: NextRequest) {
    let result: Prisma.UserCreateInput | object = {};
    try {
        //JSON.parse is used to convert JSON string to a JS object
        //It return a type any
        //This is because object in JS is similar to any
        //int, string, boolean, undefined, Object, null are all object types
        //e.g JSON.parse("1") = 1, 1 is an int which is an object
        //try out some code
        const requestBody: Prisma.UserCreateInput =
            (await request.json()) as Prisma.UserCreateInput;

        console.log("request body: ", requestBody);
        await prisma.$connect();
        result = await prisma.user.create({
            data: {
                ...requestBody,
                donors: {
                    create: [{}]
                }
            },
            include: { donors: true }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientValidationError": {
                    const errorMessage = error.message.split("\n\n")[2];
                    return NextResponse.json(
                        { message: errorMessage },
                        { status: 400 }
                    );
                }
                case "SyntaxError": {
                    return NextResponse.json(
                        { message: error.message },
                        { status: 400 }
                    );
                }
                default: {
                    return NextResponse.json(
                        { message: error.message },
                        { status: 500 }
                    );
                }
            }
        }
    } finally {
        await prisma.$disconnect();
    }

    return NextResponse.json({ ...result }, { status: 200 });
}
