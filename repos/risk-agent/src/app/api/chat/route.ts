import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY || !process.env.SQLITE_API_KEY) {
  throw new Error('Missing required API keys')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const sqliteApiKey = process.env.SQLITE_API_KEY

export async function POST(req: Request) {
  try {
    // Set a rule where if the user asks for a safety score for a certain place,
    let riskMessage = "If the user asks for a safety score or risk assessment about a place, you should always respond with a safety score between 0 and 10 and refer to it as something along the lines of 'the risk assessment for this particular location scored a _ out of _'. If the users message is not related to safety score or risk assessment, simply respond as normal. The following is the user input: ";
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    
    // calculate weighted average and hard code it
    // Upon entering an address to assess risk, display "in the past 30 days, the average risk score for this location was _ out of _ with quantity of detections being: # masked personell, # fence boundary crossings, etc.
    // Change IP address field in CCTV camera info to Custom Prompt and input only one customPrompt and then send it to the SQLite database in a new table and every time you send a new eelement to that table replace the table. Basically it shouldn't append things to the table.
    // Make the terms and condition/privacy policy actually display
    // set up the fakeyou api integration

    let finalMessage = riskMessage + message;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: finalMessage }],
      model: "gpt-3.5-turbo",
    })

    if (!completion.choices[0].message?.content) {
      throw new Error('No response from OpenAI')
    }

    return NextResponse.json({
      response: completion.choices[0].message.content
    })
  } catch (error: any) {
    console.error('Chat API error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    )
  }
}