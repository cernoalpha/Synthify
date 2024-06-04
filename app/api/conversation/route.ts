
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const APIKEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey:APIKEY
});



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

    const response = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json(response.choices[0])

    

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

