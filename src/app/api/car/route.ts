import { NextRequest, NextResponse } from "next/server";
import { lookupPlate } from "@/lib/dvla";

export async function POST(req: NextRequest) {
  try {
    const { plate } = await req.json();

    if (!plate) {
      return NextResponse.json(
        { error: "Plate is required" },
        { status: 400 }
      );
    }

    const car = await lookupPlate(plate);
    return NextResponse.json(car);

  } catch (error) {
    return NextResponse.json(
      { error: "Could not find vehicle. Check the plate and try again." },
      { status: 404 }
    );
  }
}