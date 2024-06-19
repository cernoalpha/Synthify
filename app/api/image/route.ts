import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import Replicate from 'replicate';


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
        const { prompt, amount = 1, resolution = "512x512" } = body;

        const [widthStr, heightStr] = resolution.split("x");
        const width = parseInt(widthStr, 10);
        const height = parseInt(heightStr, 10);
        const numOutputs = parseInt(amount, 10);

        if (!userId) {
            new NextResponse("Unauthorized", { status: 401 })
        }
        if (!APIKEY) {
            new NextResponse("API key not configured", { status: 500 })
        }
        if (!prompt) {
            return new NextResponse("Missing prompt", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("Missing amount", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Missing resolution", { status: 400 });
        }

        const output = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
                input: {
                    width: width,
                    height: height,
                    prompt: prompt,
                    scheduler: "K_EULER",
                    num_outputs: numOutputs,
                    guidance_scale: 9.0,
                    num_inference_steps: 50
                }
            }
        );
        console.log("response", output)
        return NextResponse.json(output)



    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}


