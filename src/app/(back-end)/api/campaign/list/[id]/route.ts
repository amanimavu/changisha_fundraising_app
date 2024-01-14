import { NextRequest, NextResponse } from "next/server";
import { Campaign } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * @summary Get a specific campaign
 * @param request
 */

export async function GET(request: NextRequest) {
    let result: Campaign | object = {};
    try {
        await prisma.$connect();
        const url = request.url;
        const campaignId = getIdFromUrl(url) ?? 0;
        result =
            (await prisma.campaign.findUnique({ where: { id: campaignId } })) ??
            {};
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown an error relating to the request"
                        },
                        { status: 400 }
                    );
                case "PrismaClientUnknownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown error relating the request but has no error code"
                        },
                        { status: 400 }
                    );
                case "PrismaClientValidationError":
                    return NextResponse.json(
                        { message: "Failed validation" },
                        { status: 400 }
                    );
                default:
                    return NextResponse.json(
                        { message: "Something went wrong" },
                        { status: 500 }
                    );
            }
        }
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json(result, { status: 200 });
}
