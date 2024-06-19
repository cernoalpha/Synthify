import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import Replicate from 'replicate';
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const APIKEY = process.env.REPLICATE_API_TOKEN

const replicate = new Replicate({
    auth: APIKEY,
});


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { prompt } = body;


        if (!userId) {
            new NextResponse("Unauthorized", { status: 401 })
        }
        if (!APIKEY) {
            new NextResponse("API key not configured", { status: 500 })
        }
        if (!prompt) {
            return new NextResponse("Missing prompt", { status: 400 });
        }

        const freeTrial = await checkApiLimit()

        if (!freeTrial) {
          return new NextResponse("Free trial expired", { status: 403 });
        }

        const input = {
            prompt: prompt,
            model_version: "stereo-large",
            output_format: "mp3",
            normalization_strategy: "peak"
        };
        
        const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input });

        await increaseApiLimit();

        return NextResponse.json(output)



    } catch (error) {
        console.log("[MUSIC_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}


