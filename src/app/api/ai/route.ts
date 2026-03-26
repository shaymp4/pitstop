import { NextRequest, NextResponse } from "next/server";
import { askAboutCar } from "@/lib/openrouter";

export async function POST(req: NextRequest) {
  try {
    const { car, question } = await req.json();

    if (!car || !question) {
      return NextResponse.json(
        { error: "Car and question are required" },
        { status: 400 }
      );
    }

    const answer = await askAboutCar(car, question);
    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}
