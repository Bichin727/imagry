import { NextResponse } from "next/server"; import type { Video } from "@/lib/types"
const MOCK: Video[] = [
  { id:"1",title:"老式缝纫机的故事",item_name:"老式缝纫机",story:"它陪我妈妈做了500件衣服，现在它老了，但我的记忆不会褪色。",style:"水墨国风",original_photo_url:"",video_url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",thumbnail_url:"https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop",likes:42,created_at:new Date(Date.now()-3600000).toISOString() },
  { id:"2",title:"我的第一台游戏机",item_name:"任天堂GameBoy",story:"小学偷偷攒了三年零花钱买来的，陪我度过了无数个放学后的下午。",style:"像素复古",original_photo_url:"",video_url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",thumbnail_url:"https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop",likes:128,created_at:new Date(Date.now()-7200000).toISOString() },
  { id:"3",title:"奶奶的檀木梳",item_name:"檀木梳",story:"奶奶用它梳了一辈子的头，每次闻到檀木香，就像回到了童年的小院。",style:"温暖绘本",original_photo_url:"",video_url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",thumbnail_url:"https://images.unsplash.com/photo-1624454002302-36b024d1c214?w=400&h=600&fit=crop",likes:89,created_at:new Date(Date.now()-14400000).toISOString() },
]
export async function GET() { return NextResponse.json(MOCK) }
