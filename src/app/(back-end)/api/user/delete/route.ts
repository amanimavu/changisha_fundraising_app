import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getFiltersFromUrl } from "@/backend/utils/url-parse";
/**
 * When a DELETE request is made to this endpoint,
 * check if filters have been provided, if they have
 * extract them and make a delete query for user records
 * that match the filter, otherwise delete all user records
 *
 * @summary delete all users
 * @param request
 * @returns {Promise<NextResponse<{message: string}> | NextResponse<Prisma.BatchPayload>>}
 */

export async function DELETE(request: NextRequest) {
    const filters = getFiltersFromUrl(request.url);
    let deletedCount: Prisma.BatchPayload = { count: 0 };
    try {
        await prisma.$connect();
        if (Object.keys(filters).length) {
            deletedCount = await prisma.user.deleteMany({
                where: filters
            });
        } else {
            deletedCount = await prisma.user.deleteMany({});
        }
        return NextResponse.json(deletedCount, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientInitializationError": {
                    return NextResponse.json(
                        {
                            message:
                                "Something went wrong when starting and connecting to the DB"
                        },
                        { status: 500 }
                    );
                }
                case "PrismaClientRustPanicError": {
                    return NextResponse.json(
                        { message: "Underlaying engine has crashed" },
                        { status: 500 }
                    );
                }
                default: {
                    return NextResponse.json(
                        { message: "Something went wrong with the request" },
                        { status: 400 }
                    );
                }
            }
        }
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json(deletedCount, { status: 200 });
}
