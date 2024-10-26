import { NextResponse } from "next/server";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
    headers: {
      Authorization: PEXELS_API_KEY!,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch images from Pexels" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
