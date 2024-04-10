import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            message: "Hopper API is working correctly",
            version: "1.0",
            availableEndpoints: [
                {
                    "GET": [
                        "/traceroute",

                    ],
                    "POST": [
                        "/traceroute"
                    ]
                }
            ]
        }
    )
}