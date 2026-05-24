import { NextResponse } from "next/server";
import { getVideo } from "@/lib/video-store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const video = getVideo(id);
  if (!video) {
    return NextResponse.json({ error: "未找到该故事" }, { status: 404 });
  }
  return NextResponse.json(video);
}
