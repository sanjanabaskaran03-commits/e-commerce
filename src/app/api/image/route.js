import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export const runtime = "nodejs";

const DEFAULT_WIDTH = 240;
const DEFAULT_QUALITY = 75;
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;

function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");
    const width = clampNumber(searchParams.get("w"), 1, MAX_WIDTH, DEFAULT_WIDTH);
    const height = clampNumber(searchParams.get("h"), 1, MAX_HEIGHT, null);
    const quality = clampNumber(searchParams.get("q"), 40, 90, DEFAULT_QUALITY);

    if (!src || !src.startsWith("/")) {
      return NextResponse.json({ error: "Missing or invalid src" }, { status: 400 });
    }

    const safeSrc = src.replace(/^\/+/, "");
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.normalize(path.join(publicDir, safeSrc));

    if (!filePath.startsWith(publicDir)) {
      return NextResponse.json({ error: "Invalid src path" }, { status: 400 });
    }

    let inputBuffer;
    try {
      inputBuffer = await fs.readFile(filePath);
    } catch (err) {
      if (err?.code === "ENOENT") {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      throw err;
    }

    let pipeline = sharp(inputBuffer).resize({
      width,
      height: height || null,
      fit: "inside",
      withoutEnlargement: true,
    });

    const outputBuffer = await pipeline.webp({ quality }).toBuffer();

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
