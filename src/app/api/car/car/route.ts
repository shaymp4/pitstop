export async function POST(req: Request) {
  const { plate } = await req.json();

  // TEMP mock response
  return new Response(
    JSON.stringify({
      make: "BMW",
      model: "320d",
      year: 2016,
      fuel: "Diesel",
    }),
    { status: 200 }
  );
}