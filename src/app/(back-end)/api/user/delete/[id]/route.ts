import { NextResponse, NextRequest } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * A DELETE request is made to this endpoint.
 * The endpoint should contain the id query
 * parameter. The id query param is extracted,
 * a query is made to the prisma client that
 * deletes the user associated with the id
 *
 * @summary delete user associated with the id query param
 * @returns {}
 */

export async function DELETE(request: NextRequest) {
    const url = request.url;
    const userId = getIdFromUrl(url);
    let result: User | object = {};
    try {
        await prisma.$connect();
        if (userId) {
            result = await prisma.user.delete({ where: { id: userId } });
        } else {
            throw new Error("Provide a valid user id");
        }
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError": {
                    return NextResponse.json(
                        { message: error.message.split("\n\n\n")[1] },
                        { status: 404 }
                    );
                }
                default: {
                    return NextResponse.json(
                        { message: "Something went wrong with deletion" },
                        { status: 500 }
                    );
                }
            }
        }
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json(result, { status: 200 });
}
