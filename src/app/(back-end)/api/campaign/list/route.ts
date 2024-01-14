import { NextRequest, NextResponse } from "next/server";
import { Prisma, Campaign } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getFiltersFromUrl } from "@/backend/utils/url-parse";

/**
 * A user can filter by date:
 * 1. date range - from start date to end date
 * 2. Status
 * 3. CampaignTypeId
 *
 * Enable server side search too when the search
 * query parameter is provided
 *
 * @summary list campaigns that match filters or all campaign
 * @param request
 * @returns {Promise<NextResponse<{}>>}
 */

export async function GET(request: NextRequest) {
    let selectQueryObj: Prisma.CampaignFindManyArgs;
    let result: Campaign[] | object[] = [{}];

    try {
        const url = request.url;
        const { search = null, ...filters } = getFiltersFromUrl(url);
        await prisma.$connect();
        if (search !== null) {
            selectQueryObj = {
                where: {
                    ...filters,
                    AND: {
                        title: { contains: search }
                    }
                }
            };
        } else {
            selectQueryObj = {
                where: { ...filters }
            };
        }
        result = await prisma.campaign.findMany(selectQueryObj);
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            switch (error.name) {
                case "PrismaClientKnownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown an error related to request"
                        },
                        { status: 400 }
                    );
                case "PrismaClientUnknownRequestError":
                    return NextResponse.json(
                        {
                            message:
                                "Query engine has thrown an error related to request that doesn't have an error code"
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
                        { message: "Somthing went wrong" },
                        { status: 500 }
                    );
            }
        }
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json({ ...result }, { status: 200 });
}
