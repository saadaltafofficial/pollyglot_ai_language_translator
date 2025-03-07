console.log(process.env.OPENAI_API_KEY);
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config()


const client = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: ``, 
});

export async function transaltor(data: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [
        { role: 'system', content: 'You are transaltor assistant you will translate to the content to language user is asking for.' },
        { role: "user", content: data}
    ],
    model: 'gpt-4o',
  });
  return chatCompletion
}  