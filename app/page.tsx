
"use client";

import { useState } from "react";


export default function Home() {
  const [plate, setPlate] = useState(""); //saves user input for reg plate
  const [car, setCar] = useState<any>(null); //saves car details response from API
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckCar = async () => {
    const res = await fetch("/api/car", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate }),
    });

    const data = await res.json();
    setCar(data);
  };

  const askAI = async () => {
  if (!car) {
    alert("Enter a plate first");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ car, question }),
  });

  const data = await res.json();
  setAnswer(data.answer);

  setLoading(false);
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Pitstop.</h1>

      <input
        type="text"
        placeholder="Enter reg plate"
        className="border p-3 rounded w-64 mb-4"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <button
        className="bg-black text-white px-6 py-2 rounded mb-4"
        onClick={handleCheckCar}
      >
        Check Car
      </button>

      {car && (
        <div className="border p-4 rounded w-64 text-center">
          <p><strong>Make:</strong> {car.make}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Fuel:</strong> {car.fuel}</p>
        </div>
      )}

      {car && (
  <div className="mt-4 w-64">
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
        <div className="border p-3 rounded bg-gray-50 mt-3 text-sm">
          {answer}
        </div>
      )}
  </div>
)}
    </main>
  );
}
