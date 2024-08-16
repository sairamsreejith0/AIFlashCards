// app/api/chat/route.js
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client using the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime environment to edge, which optimizes for faster response times
export const runtime = 'edge';

export async function POST(req) {
    console.log("Request received at /api/chat"); // Log when a request is received
    
    try {
        // Parse the incoming JSON request body to extract the 'message' field
        const { message } = await req.json();
        console.log("Message received:", message); // Log the received message

        // Generate a prompt to ask GPT-4 to create 10 Q&A pairs
        const prompt = `Generate 10 questions and answers about the following topic: ${message}`;


        // Send the user's message to the OpenAI API, specifying the GPT-4 model
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }], // The message is formatted for the API
        });

        console.log('OpenAI API Response:', response); // Log the full API response for debugging
        // Process the response to extract questions and answers
        const qaText = response.choices[0].message.content;

        // Split the response by lines and filter out empty lines
        const lines = qaText.split('\n').filter(line => line.trim() !== '');

        // Combine adjacent lines into question-answer pairs
        const qaPairs = [];
        for (let i = 0; i < lines.length; i += 2) {
            const question = lines[i].replace(/^Q:\s*/, '').trim(); // Remove "Q: " from the start
            const answer = (lines[i + 1] || '').replace(/^A:\s*/, '').trim(); // Remove "A: " from the start
            if (question && answer) {
                qaPairs.push({ question, answer });
            }
        }

        return NextResponse.json({ qaPairs });
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
//         // Extract the AI's reply from the response
//         const reply = response.choices[0].message.content;

//         // Return the AI's reply as a JSON response
//         return NextResponse.json({ reply });
//     } catch (error) {
//         console.error('Error in POST handler:', error); // Log any errors that occur

//         // If the error is from the OpenAI API, return detailed error information
//         if (error instanceof OpenAI.APIError) {
//             const { name, status, headers, message } = error;
//             return NextResponse.json({ name, status, headers, message }, { status });
//         } else {
//             // For other errors, return a generic 500 Internal Server Error response
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         }
//     }
// }
