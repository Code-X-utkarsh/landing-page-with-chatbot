import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { sdeMasterclassKnowledge } from '@/lib/knowledge';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: sdeMasterclassKnowledge,
            messages,
            temperature: 0.7,
        });

        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message || error.toString() }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
