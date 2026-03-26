import { Car } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function lookupPlate(plate: string): Promise<Car> {
  const cleanPlate = plate.toUpperCase().replace(/\s/g, "");

  // TEMP: mock response until DVLA API key arrives
  return {
    id: uuidv4(),
    plate: cleanPlate,
    make: "VOLKSWAGEN",
    model: "GOLF",
    year: 2019,
    colour: "GREY",
    fuelType: "PETROL",
    engineSize: "1800",
    taxStatus: "Taxed",
    motStatus: "Valid",
  };
}