import { del, list, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

function isAdmin(request) {
  if (!process.env.ADMIN_PASSWORD) return false;
  const expected = createHmac("sha256", process.env.ADMIN_PASSWORD).update("ania-wladzia-admin").digest("hex");
  return request.cookies.get("aw_admin")?.value === expected;
}

export async function GET() {
  const { blobs } = await list({ prefix: "gallery/" });
  const photos = blobs.filter(b => /\.(jpg|jpeg|png|webp|gif)$/i.test(b.pathname)).sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  return NextResponse.json({ blobs: photos });
}

export async function POST(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only images" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Max 8 MB" }, { status: 413 });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put("gallery/" + Date.now() + "-" + safeName, file, { access: "public", addRandomSuffix: false });
  return NextResponse.json({ url: blob.url });
}

export async function DELETE(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url } = await request.json();
  if (!url || !url.includes("/gallery/")) return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  await del(url);
  return NextResponse.json({ ok: true });
}
