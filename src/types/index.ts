// app/garage/types.ts
export type Car = {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  fuel?: string;
};

export type Quote = {
  fixDescription: string;
  price: number;
};

export type AIResponse = {
  answer: string;
};