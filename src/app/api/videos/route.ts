import { NextResponse } from "next/server";
import { listVideos } from "@/lib/video-store";

export async function GET() {
  return NextResponse.json(listVideos());
}
