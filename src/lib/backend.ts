/** Spring Boot 后端（与微信小程序共用） */
export const BACKEND_URL =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080";

export interface SlideDto {
  index: number;
  title: string;
  caption: string;
  narration: string;
}

export interface StoryResponse {
  taskId: string;
  hook: string;
  scene: string;
  imageUrl: string | null;
  slides: SlideDto[];
}

const STYLE_LABELS: Record<string, string> = {
  manga: "日漫风",
  ink: "水墨国风",
  pixel: "像素复古",
  warm: "温暖绘本",
};

export function styleLabel(styleId: string): string {
  return STYLE_LABELS[styleId] || styleId || "温暖绘本";
}

/** 调用 Spring Boot：视觉故事（与小程序 /api/vision/story 相同） */
export async function callVisionStory(params: {
  photoDataUrl: string;
  scene?: string;
  userStory?: string;
  style?: string;
}): Promise<StoryResponse> {
  const base64 = params.photoDataUrl.includes(",")
    ? params.photoDataUrl.split(",")[1]
    : params.photoDataUrl;

  const res = await fetch(`${BACKEND_URL}/api/vision/story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageBase64: base64,
      scene: params.scene || "relic",
      userStory: params.userStory || "",
      style: params.style || "warm",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`vision/story ${res.status}: ${text}`);
  }

  return res.json() as Promise<StoryResponse>;
}

export async function callTtsSpeak(text: string): Promise<{
  audioUrl: string;
  durationMs: number;
  message?: string;
}> {
  const res = await fetch(`${BACKEND_URL}/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: "default" }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`tts/speak ${res.status}`);
  }

  return res.json();
}

export function resolveBackendAsset(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
