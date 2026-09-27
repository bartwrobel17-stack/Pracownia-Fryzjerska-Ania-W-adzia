import { createHmac } from "crypto";
import { NextResponse } from "next/server";

function token() {
  return createHmac("sha256", process.env.ADMIN_PASSWORD || "").update("ania-wladzia-admin").digest("hex");
}

export async function POST(request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set("aw_admin", token(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
