import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { car, question } = await req.json();

    const prompt = `
You are a UK car mechanic.
Car: ${car.make} ${car.model} ${car.year}
Issue: ${question}

Give:
- Likely causes in relation to chosen car and issue
- Severity
- UK repair cost (£)
- Short advice
- Whether it's safe to drive
Answer in a concise manner, use bullet points where possible.
Explain to the user like they're a car owner with no mechanic knowledge.
Mention the kind of car the user drives.
`;

    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // free model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = res.data.choices[0].message.content;

    return NextResponse.json({ answer });
  } catch (error: any) {
  console.error("AI ERROR DETAIL:", JSON.stringify(error?.response?.data, null, 2));
  return NextResponse.json({ answer: "AI failed to respond" }, { status: 500 });
    }
}
