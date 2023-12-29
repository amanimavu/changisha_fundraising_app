import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

/**
 * Get the list of all users from the database
 * and send it to the client
 *
 * @summary get all users
 * @returns {Promise<NextResponse>}
 */

export async function GET(): Promise<NextResponse> {
    let users: User[] = [];
    try {
        await prisma.$connect();
        users = await prisma.user.findMany({ include: { donors: true } });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json({ users }, { status: 200 });
}
