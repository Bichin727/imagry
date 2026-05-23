import { NextRequest, NextResponse } from "next/server"; import { v4 as uuidv4 } from "uuid"
const VID = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
const THUMBS = ["https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop","https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop","https://images.unsplash.com/photo-1624454002302-36b024d1c214?w=400&h=600&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=600&fit=crop"]
const styles:Record<string,string> = { manga:"日漫风", ink:"水墨国风", pixel:"像素复古", warm:"温暖绘本" }
export async function POST(request: NextRequest) {
  try { const { story, style } = await request.json(); await new Promise(r=>setTimeout(r,500))
    return NextResponse.json({ id: uuidv4(), title: "旧物的故事", item_name: "旧物", story: story||"", style: styles[style]||style, original_photo_url: "", video_url: VID, thumbnail_url: THUMBS[Math.floor(Math.random()*THUMBS.length)], likes: 0, created_at: new Date().toISOString() }) }
  catch { return NextResponse.json({ error:"生成失败" },{ status:500 }) }
}
