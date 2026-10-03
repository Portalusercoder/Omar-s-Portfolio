import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      services?: string[];
      budget?: string;
      details?: string;
      name?: string;
      email?: string;
      delivery?: string;
      source?: string;
    };

    const emailOk = typeof body.email === "string" && /@/.test(body.email);
    if (
      !body.name?.trim() ||
      !emailOk ||
      !body.details ||
      body.details.trim().length < 8
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
