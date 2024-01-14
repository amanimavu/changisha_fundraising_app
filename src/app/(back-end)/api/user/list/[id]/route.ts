import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * Get the id from the URL (which is a dynamic parameter),
 * then query the database using the prisma client and
 * finally return the user as a response to the client
 *
 * @summary get a user
 * @returns {Promise<NextResponse>}
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
    let user: User | object | null = {};

    try {
        await prisma.$connect();
        const url = request.url;
        const userId = getIdFromUrl(url) ?? 0;
        user =
            (await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    donors: true
                }
            })) ?? {};
        console.log(user);
    } catch (error: unknown) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json({ ...user }, { status: 200 });
}
