import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * Get the id from the request URL and use
 * prisma client to update a user record
 * that matches the id
 *
 * @summary update user
 * @returns {Promise<NextResponse>}
 */

export async function PUT(request: NextRequest): Promise<NextResponse> {
    let updatedUser: Prisma.UserUpdateInput | object = {};
    try {
        await prisma.$connect();
        const url = request.url;
        const _id = getIdFromUrl(url) ?? 0;
        const requestBody: Prisma.UserUpdateInput =
            (await request.json()) as Prisma.UserUpdateInput;

        //console.log(requestBody);
        const donor_id = await prisma.donor.findFirst({
            where: {
                userId: _id
            },
            select: { id: true }
        });

        updatedUser = await prisma.user.update({
            where: { id: _id },
            data: {
                ...requestBody,
                donors: {
                    update: {
                        where: {
                            id: donor_id?.id ?? 0
                        },
                        data: {}
                    }
                }
            },
            include: {
                donors: true
            }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError": {
                    return NextResponse.json(
                        { message: "record to update not found" },
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
    return NextResponse.json({ ...updatedUser }, { status: 200 });
}
