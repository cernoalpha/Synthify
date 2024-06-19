
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Prem from '@premai/prem-sdk';


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

    const system_prompt = "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."


    const responseSync = await client.chat.completions.create({
      project_id,
      system_prompt,
      messages,
      stream: false 
    });
    
    let response = responseSync.choices[0].message
    delete response.tool_calls;
    return NextResponse.json(response)

    

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

