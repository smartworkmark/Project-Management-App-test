import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Card title is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that converts project task titles into detailed, actionable development prompts for Claude Code.

The project is a Tactical Ops Kanban board application built with Next.js, React, TypeScript, and Tailwind CSS.

Generate a clear, specific prompt that:
1. Describes the feature to be implemented
2. Includes technical requirements
3. Specifies any UI/UX considerations
4. Mentions relevant technologies to use
5. Is formatted to be easily copy-pasted into Claude Code

Keep the prompt concise but detailed (2-3 paragraphs).`,

        },
        {
          role: 'user',
          content: `Task Title: ${title}
${description ? `Task Description: ${description}` : ''}

Generate a detailed development prompt for implementing this feature in the Tactical Ops Kanban board app.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const prompt = response.choices[0]?.message?.content || ''

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error('Error generating prompt:', error)

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    )
  }
}
