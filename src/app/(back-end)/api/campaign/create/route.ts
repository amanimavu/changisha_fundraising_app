import { NextRequest, NextResponse } from "next/server";
import { Prisma, Campaign } from "@prisma/client";
import prisma from "@/lib/prisma";

/**
 * @summary Create a campaign
 * @async
 * @param request
 * @returns {Promise<NextResponse<{}>>}
 */
export async function POST(request: NextRequest) {
    let result: Campaign | object = {};
    try {
        const requestBody: Prisma.CampaignCreateInput & {
            campaignTypeId?: number;
            categoryIds?: number[];
        } = (await request.json()) as Prisma.CampaignCreateInput & {
            campaignTypeId?: number;
            categoryIds?: number[];
        };
        await prisma.$connect();
        const campaignTypeId = requestBody.campaignTypeId;
        const categoryIds = requestBody.categoryIds;
        delete requestBody.campaignTypeId;
        delete requestBody.categoryIds;
        const campaignData: Prisma.CampaignCreateInput = requestBody;

        result = await prisma.campaign.create({
            data: {
                ...campaignData,
                metrics: { create: {} },
                campaignTypes: {
                    connect: { id: campaignTypeId as number }
                },
                campaignsToCategories: {
                    create: [
                        ...(categoryIds?.map((categoryId) => ({
                            categories: { connect: { id: categoryId } }
                        })) ?? [])
                    ]
                }
            }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "An error from the query engine with an error code"
                        },
                        { status: 400 }
                    );
                case "PrismaClientUnknownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "An error from the query engine without an error code"
                        },
                        { status: 400 }
                    );
                case "PrismaClientValidationError":
                    return NextResponse.json(
                        { message: "Validation failed" },
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

    return NextResponse.json({ ...result }, { status: 200 });
}
