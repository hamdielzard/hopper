import {NextResponse} from "next/server";

const Traceroute = require('nodejs-traceroute');


export async function GET() {
    return NextResponse.json(
        {
            message: "Use POST method to perform traceroute",
        }
    )
}

export async function POST(req) {
    console.log("Performing traceroute")
    const body = await req.json();
    const target = body.target;

    // Check if target is not empty
    if (!target) {
        return NextResponse.json(
            {
                message: "Invalid target"
            }
        );
    }
    // Check if target is a valid domain or IP address
    else if (!target.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) && !
        target.match(/^(?:(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.){1,126}[a-zA-Z]{2,61}|localhost)$/)) {
        return NextResponse.json(
            {
                message: "Invalid target"
            }
        );
    }
    // Check if IP address is within valid range
    if (target.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
        const octets = target.split(".");
        if (octets[0] < 0 || octets[0] > 255 || octets[1] < 0 || octets[1] > 255 || octets[2] < 0 || octets[2] > 255 || octets[3] < 0 || octets[3] > 255) {
            return NextResponse.json(
                {
                    message: "Invalid target"
                }
            );
        }
    }

    if (target === "localhost") {
        return NextResponse.json(
            {
                message: "Localhost is not supported"
            }
        )
    }

    const hops = await performTraceroute(target);

    if (hops.length === 0) {
        return NextResponse.json(
            {
                message: "No hops"
            }
        );
    }

    // If hops was rejected, it will be an error object
    if (hops instanceof Error) {
        return NextResponse.json(
            {
                message: hops.message
            }
        );
    }

    return NextResponse.json(
        {
            message: "Completed",
            target: target,
            hops: hops
        }
    );
}

async function performTraceroute(target) {
    return new Promise((resolve, reject) => {
        try {
            const hops = [];
            const tracer = new Traceroute();
            tracer
                .on('hop', (hop) => {
                    console.log(hop);
                    hops.push(hop);
                })
                .on('close', (code) => {
                    resolve(hops);
                })
                .on('error', (error) => {
                    reject(error);
                });
            tracer.trace(target);
        } catch (error) {
            reject(error);
        }
    });
}