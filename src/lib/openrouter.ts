import { Car, Quote } from "@/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = "openai/gpt-3.5-turbo";

async function chat(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Pitstop",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

export async function askAboutCar(car: Car, question: string): Promise<string> {
  return chat(
    `You are a helpful car expert assistant. The user owns a ${car.year} ${car.make} ${car.model} (${car.fuelType}, ${car.engineSize}cc). 
    Answer this question concisely and in plain english, avoid jargon where possible: ${question}`
  );
}

export async function rateQuote(car: Car, quote: Quote): Promise<string> {
  return chat(
    `You are a car mechanic expert based in the UK. The user has a ${car.year} ${car.make} ${car.model} (${car.fuelType}). 
    A mechanic has quoted them £${quote.price} for: "${quote.fixDescription}". 
    Is this a fair price in the UK market? 
    Respond with:
    1. A verdict: Fair / Expensive / Cheap
    2. A typical price range for this job in the UK
    3. A brief explanation (2-3 sentences max)
    Keep it concise and practical.`
  );
}