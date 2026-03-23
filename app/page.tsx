import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Under The Hood
      </h1>

      <input
        type="text"
        placeholder="Enter reg plate"
        className="border p-3 rounded w-64 mb-4"
      />

      <button className="bg-black text-white px-6 py-2 rounded">
        Check Car
      </button>
    </main>
  );
}
