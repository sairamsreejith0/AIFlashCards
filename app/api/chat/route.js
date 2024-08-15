import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge
export const runtime = 'edge';

export async function POST(req) {
    console.log("Request received at /api/chat");
    
    try {
        // Parse the request body
        const { message } = await req.json();
        console.log("Message received:", message);

        // Ask OpenAI for a chat completion
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
        });

        console.log('OpenAI API Response:', response);

        // Handle the response (assuming non-streaming)
        const reply = response.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Error in POST handler:', error);
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}
