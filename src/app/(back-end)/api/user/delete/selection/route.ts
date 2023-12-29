import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
/**
 * @summary delete selected records
 * @param request
 * @returns {Promise}
 */

export async function POST(request: NextRequest) {
    type selectedUserIds = { ids: number[] };
    const userIds = (await request.json()) as selectedUserIds;
    let deletedCount: Prisma.BatchPayload = { count: 0 };
    try {
        await prisma.$connect();
        deletedCount = await prisma.user.deleteMany({
            where: { id: { in: userIds.ids } }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientUnknownRequestError": {
                    return NextResponse.json(
                        { message: "There is a problem with the resuest" },
                        { status: 400 }
                    );
                }
                default: {
                    return NextResponse.json(
                        { message: "Something went wrong" },
                        { status: 500 }
                    );
                }
            }
        }
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json(deletedCount, { status: 200 });
}
