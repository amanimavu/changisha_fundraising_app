import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
/**
 * When a DELETE request is made to this endpoint,
 * use deleteMany prisma query to delete all
 * user records in the database
 *
 * @summary delete all users
 * @returns {Promise<NextResponse<{message: string}> | NextResponse<Prisma.BatchPayload>>}
 */

export async function DELETE() {
    let deletedCount: Prisma.BatchPayload = { count: 0 };
    try {
        await prisma.$connect();
        deletedCount = await prisma.user.deleteMany({});
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
