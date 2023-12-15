import { type NextRequest } from "next/server";

export default function GET(request: NextRequest){
    const  userDeatils = request.body;
    console.log(userDeatils);
}