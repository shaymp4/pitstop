"use client";

import { useState } from "react";
import { Car, Quote, AIResponse } from "@/types";

export default function Home() {
  const [plate, setPlate] = useState("");
  const [garage, setGarage] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<Quote>({ fixDescription: "", price: 0 });
  const [quoteFeedback, setQuoteFeedback] = useState("");

  // Add car to garage
  const handleAddCar = async () => {
    if (!plate) return;

    const res = await fetch("/api/car", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate }),
    });

    const data: Car = await res.json();
    setGarage([...garage, data]);
    setPlate("");
  };

  // Ask AI about selected car
  const askAI = async () => {
    if (!selectedCar || !question) return;

    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car: selectedCar, question }),
    });
    const data: AIResponse = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  // Rate mechanic quote
  const rateQuote = async () => {
    if (!selectedCar || !quote.fixDescription || !quote.price) return;

    setLoading(true);
    const res = await fetch("/api/ai-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car: selectedCar, quote }),
    });

    const data: AIResponse = await res.json();
    setQuoteFeedback(data.answer);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Pitstop.</h1>

      {/* Add Car */}
      <div className="mb-4 w-64">
        <input
          type="text"
          placeholder="Enter reg plate"
          className="border p-3 rounded w-full mb-2"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <button
          className="bg-black text-white px-6 py-2 rounded w-full"
          onClick={handleAddCar}
        >
          Add to Garage
        </button>
      </div>

      {/* Garage */}
      {garage.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold mb-2">Your Garage</h2>
          <div className="flex gap-4 flex-wrap">
            {garage.map((car) => (
              <div
                key={car.id}
                className={`border p-3 rounded cursor-pointer ${
                  selectedCar?.id === car.id ? "border-blue-500" : ""
                }`}
                onClick={() => {
                  setSelectedCar(car);
                  setAnswer("");
                  setQuoteFeedback("");
                }}
              >
                <p>{car.make} {car.model}</p>
                <p>{car.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Car Actions */}
      {selectedCar && (
        <div className="w-64">
          <h3 className="font-bold mb-2">Actions for {selectedCar.make} {selectedCar.model}</h3>

          {/* Ask AI */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ask about your car"
              className="border p-2 rounded w-full mb-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={askAI}
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
            {answer && (
              <div className="border p-3 rounded bg-gray-50 mt-2 text-sm">{answer}</div>
            )}
          </div>

          {/* Rate Quote */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Fix description"
              className="border p-2 rounded w-full mb-2"
              value={quote.fixDescription}
              onChange={(e) =>
                setQuote({ ...quote, fixDescription: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Mechanic quote (£)"
              className="border p-2 rounded w-full mb-2"
              value={quote.price || ""}
              onChange={(e) =>
                setQuote({ ...quote, price: Number(e.target.value) })
              }
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
              onClick={rateQuote}
            >
              {loading ? "Checking..." : "Check Quote"}
            </button>
            {quoteFeedback && (
              <div className="border p-3 rounded bg-gray-50 mt-2 text-sm">
                {quoteFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}