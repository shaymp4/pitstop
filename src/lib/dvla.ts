import { Car } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function lookupPlate(plate: string): Promise<Car> {
  const cleanPlate = plate.toUpperCase().replace(/\s/g, "");

  const res = await fetch(
    "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.DVLA_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationNumber: cleanPlate }),
    }
  );

  if (!res.ok) {
    throw new Error(`Plate lookup failed: ${res.status}`);
  }

  const data = await res.json();

  return {
    id: uuidv4(),
    plate: cleanPlate,
    make: data.make ?? "Unknown",
    model: data.model ?? "Unknown",
    year: data.yearOfManufacture ?? 0,
    colour: data.colour ?? "Unknown",
    fuelType: data.fuelType ?? "Unknown",
    engineSize: data.engineCapacity?.toString(),
    taxStatus: data.taxStatus ?? "Unknown",
    motStatus: data.motStatus ?? "Unknown",
  };
}