export interface Video {
  id: string; title: string; item_name: string; story: string; style: string
  original_photo_url: string; video_url: string; thumbnail_url: string
  likes: number; created_at: string
  /** 与 Spring Boot 任务关联 */
  task_id?: string
  hook?: string
  slides?: { index: number; title: string; caption: string; narration: string }[]
  audio_url?: string
}
export type StyleOption = { id: string; name: string; emoji: string; description: string }
export const STYLE_OPTIONS: StyleOption[] = [
  { id: "manga", name: "日漫风", emoji: "🎌", description: "热血少年漫风格" },
  { id: "ink", name: "水墨国风", emoji: "🏮", description: "传统水墨意境" },
  { id: "pixel", name: "像素复古", emoji: "👾", description: "像素游戏画风" },
  { id: "warm", name: "温暖绘本", emoji: "📖", description: "温馨手绘绘本" },
]
export const AI_STEPS = [ "正在分析物品特征...", "正在编写漫画剧本...", "正在绘制漫画画面...", "正在合成配音视频..." ]
