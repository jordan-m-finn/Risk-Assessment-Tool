import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { address, prompt, radius } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a risk assessment AI. Analyze the location and custom prompt to determine risk level (Low, Medium, High) and estimate occurrences in the last 30 days. Provide numerical values and reasoning."
        },
        {
          role: "user",
          content: `Analyze the following location within ${radius} miles radius: ${address}. Custom prompt: ${prompt}`
        }
      ]
    })

    const analysis = response.choices[0].message.content
    // Parse the AI response to extract risk level and occurrences
    const riskLevel = analysis.toLowerCase().includes('high') ? 'High' 
                   : analysis.toLowerCase().includes('medium') ? 'Medium' 
                   : 'Low'
    
    // Extract a number from the response or estimate based on context
    const occurrences = parseInt(analysis.match(/\d+/)?.[0] || '0') || 
                       (riskLevel === 'High' ? 25 : riskLevel === 'Medium' ? 15 : 5)

    return NextResponse.json({ risk: riskLevel, occurrences, analysis })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}