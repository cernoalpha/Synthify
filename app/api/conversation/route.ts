
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Prem from '@premai/prem-sdk';
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";



const APIKEY = process.env.OPENAI_API_KEY

const client = new Prem({
  apiKey: "aTv5jwOxTY9HDLAl7HR3hDWdPHh3gMUhnh"
})

const project_id = 4402

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json()
    const { messages} = body

    if (!userId) {
      new NextResponse("Unauthorized", { status: 401 })
    }
    if (!APIKEY) {
      new NextResponse("API key not configured", { status: 500 })
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial expired", { status: 403 });
    }

    const responseSync = await client.chat.completions.create({
      project_id,
      messages,
      stream: false 
    });
    
    let response = responseSync.choices[0].message
    delete response.tool_calls;

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response)

    

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

