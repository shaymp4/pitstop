export type Car = {
  id: string;
  plate: string;
  make: string;
  model?: string;
  year: number;
  colour: string;
  fuelType: string;
  engineSize?: string;
  taxStatus: string;
  motStatus: string;
};

export type Quote = {
  fixDescription: string;
  price: number;
};

export type AIResponse = {
  answer: string;
};