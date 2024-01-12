import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getIdFromUrl } from "@/backend/utils/url-parse";

/**
 * A user can modify:
 * 1. decription *
 * 2. start_date and end_date *
 * 3. privacy setting - public, private *
 * 4. campaignTypeId
 * 5. status - active, expired, completed, cancelled *
 * 6. campaign_image *
 * 7. pabill number *
 * 8. goal *
 * 9. title *
 *
 * @summary Update a campaign
 * @param request
 * @returns {Promise<NextResponse<{}>>}
 */

export async function PUT(request: NextRequest) {
    let result: Prisma.CampaignUpdateInput | object = {};
    try {
        const url = request.url;
        const campaignId = getIdFromUrl(url) ?? 0;
        const requestBody: Prisma.CampaignUpdateInput & {
            campaignTypeId?: number;
        } = (await request.json()) as Prisma.CampaignUpdateInput & {
            campaignTypeId?: number;
        };
        const campaignTypeId = requestBody.campaignTypeId;
        delete requestBody.campaignTypeId;
        const campaignUpdateData: Prisma.CampaignUpdateInput = campaignTypeId
            ? {
                  ...requestBody,
                  campaignTypes: { connect: { id: campaignTypeId } }
              }
            : requestBody;
        await prisma.$connect();
        result = await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                ...campaignUpdateData
            }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError":
                    return NextResponse.json(
                        { message: "Query engine has thrown an exception" },
                        { status: 400 }
                    );
                case "PrismaClientUnknownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown an exception that has no error code"
                        },
                        { status: 400 }
                    );
                case "PrismaClientValidationError":
                    return NextResponse.json(
                        { message: "Failed Validation" },
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
