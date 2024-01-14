import { NextRequest, NextResponse } from "next/server";
import { Campaign } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * Provide the campaign id on the delete request url
 * This route delete the campaign specified by the id
 *
 * @summary Delete a campaign
 * @param request
 * @returns {Promise<NextResponse<{}>>}
 */

export async function DELETE(request: NextRequest) {
    let result: Campaign | object = {};
    try {
        const url = request.url;
        const campaignId = getIdFromUrl(url) ?? 0;
        await prisma.$connect();
        result = await prisma.campaign.delete({
            where: { id: campaignId }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError":
                    return NextResponse.json(
                        { message: "Query engine has thrown an error" },
                        { status: 400 }
                    );
                case "PrismaClientUnknownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown an error relating to request that doesn't have an error code"
                        },
                        { status: 400 }
                    );
                case "PrismaClientValidationError":
                    return NextResponse.json(
                        { message: "Failed Validation" },
                        { status: 400 }
                    );
                default:
                    return;
            }
        }
    } finally {
        await prisma.$disconnect();
    }

    return NextResponse.json(result, { status: 200 });
}
