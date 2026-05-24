import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  callVisionStory,
  callTtsSpeak,
  resolveBackendAsset,
  styleLabel,
} from "@/lib/backend";
import { saveVideo } from "@/lib/video-store";
import type { Video } from "@/lib/types";

const DEMO_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export async function POST(request: NextRequest) {
  try {
    const { photo, story, style } = await request.json();

    if (!photo || !String(story || "").trim()) {
      return NextResponse.json({ error: "请上传照片并填写故事" }, { status: 400 });
    }

    const storyText = String(story).trim();
    const styleId = style || "warm";

    let vision;
    try {
      vision = await callVisionStory({
        photoDataUrl: photo,
        scene: "relic",
        userStory: storyText,
        style: styleId,
      });
    } catch (e) {
      console.error("Spring Boot vision/story failed:", e);
      return NextResponse.json(
        {
          error: "无法连接 Java 后端，请先运行: cd backend && mvn spring-boot:run",
        },
        { status: 503 }
      );
    }

    const narrations = (vision.slides || []).map((s) => s.narration).filter(Boolean);
    const fullNarration = narrations.length
      ? narrations.join("。")
      : storyText;

    let audioUrl = "";
    try {
      const tts = await callTtsSpeak(fullNarration);
      audioUrl = resolveBackendAsset(tts.audioUrl);
    } catch (e) {
      console.warn("TTS skipped:", e);
    }

    const id = vision.taskId || uuidv4();
    const thumb =
      photo.startsWith("data:") || photo.startsWith("http")
        ? photo
        : resolveBackendAsset(vision.imageUrl);

    const video: Video = {
      id,
      task_id: vision.taskId,
      title: vision.hook || "旧物的故事",
      item_name: vision.slides?.[0]?.title || "旧物",
      story: storyText,
      hook: vision.hook,
      style: styleLabel(styleId),
      slides: vision.slides,
      original_photo_url: photo,
      video_url: DEMO_VIDEO,
      thumbnail_url: thumb,
      audio_url: audioUrl || undefined,
      likes: 0,
      created_at: new Date().toISOString(),
    };

    saveVideo(video);
    return NextResponse.json(video);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "生成失败" }, { status: 500 });
  }
}
