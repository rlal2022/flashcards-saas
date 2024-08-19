import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
The front should be a question, and the back the answer.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const data = await req.text();

  const prompt = `${systemPrompt}\nUser Input: ${data}`;

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const responseText = await response.text();

  const flashcards = JSON.parse(responseText);

  return NextResponse.json(flashcards.flashcards);
}
