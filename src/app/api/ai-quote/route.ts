import { NextRequest, NextResponse } from "next/server";
import { rateQuote } from "@/lib/openrouter";

export async function POST(req: NextRequest) {
  try {
    const { car, quote } = await req.json();

    if (!car || !quote) {
      return NextResponse.json(
        { error: "Car and quote are required" },
        { status: 400 }
      );
    }

    const answer = await rateQuote(car, quote);
    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}