import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {User} from "@prisma/client"
import {}

/**
 * Extract the filters from the query parameters.
 * Delete the user records that match the filters
 * user the deleteMany query
 * 
 * @param request
 * @returns {Promise<>}
 */

export async function DELETE(){
    const filters = 
    try{
        await prisma.$connect()
    }
    catch(error){
        //
    }
    finally{
        await prisma.$disconnect()
    }
}