"use client"; import { useState, useEffect } from "react"; import Link from "next/link"; import { Camera, Sparkles, ListFilter } from "lucide-react"; import VideoCard from "@/components/VideoCard"; import type { Video } from "@/lib/types"
const MOCK: Video[] = [
  { id:"1",title:"老式缝纫机的故事",item_name:"老式缝纫机",story:"它陪我妈妈做了500件衣服，现在它老了，但我的记忆不会褪色。",style:"水墨国风",original_photo_url:"",video_url:"",thumbnail_url:"https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop",likes:42,created_at:new Date(Date.now()-3600000).toISOString() },
  { id:"2",title:"我的第一台游戏机",item_name:"任天堂GameBoy",story:"小学偷偷攒了三年零花钱买来的，陪我度过了无数个放学后的下午。",style:"像素复古",original_photo_url:"",video_url:"",thumbnail_url:"https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop",likes:128,created_at:new Date(Date.now()-7200000).toISOString() },
  { id:"3",title:"奶奶的檀木梳",item_name:"檀木梳",story:"奶奶用它梳了一辈子的头，每次闻到檀木香，就像回到了童年的小院。",style:"温暖绘本",original_photo_url:"",video_url:"",thumbnail_url:"https://images.unsplash.com/photo-1624454002302-36b024d1c214?w=400&h=600&fit=crop",likes:89,created_at:new Date(Date.now()-14400000).toISOString() },
]
export default function Home() {
  const [v,setV]=useState<Video[]>([]); const [l,setL]=useState(true)
  useEffect(()=>{fetch("/api/videos").then(r=>r.ok?r.json():null).then(d=>{if(d&&d.length>0)setV(d);else setV(MOCK);setL(false)}).catch(()=>{setV(MOCK);setL(false)})},[])
  return (<div className="min-h-full bg-[#faf7f2]">
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#e8e3dc] px-4 py-3"><div className="flex items-center justify-between"><div><h1 className="text-xl font-bold text-[#2d2a26] tracking-wide">忆青集</h1><p className="text-xs text-[#6b6560] mt-0.5">旧物不言 · AI 代它说</p></div><button className="text-[#6b6560] hover:text-[#2d2a26] transition-colors"><ListFilter className="w-5 h-5"/></button></div></header>
    <div className="px-4 pt-4 pb-2"><Link href="/create" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 active:scale-[0.98]"><Camera className="w-5 h-5"/><span>为旧物拍一段故事</span><Sparkles className="w-4 h-4"/></Link></div>
    {l ? <div className="px-4 space-y-3">{[1,2,3].map(i=><div key={i} className="rounded-2xl overflow-hidden border border-[#e8e3dc]"><div className="aspect-[9/16] animate-shimmer"/></div>)}</div>
    : <div className="px-4 pb-24 columns-2 gap-3 space-y-3">{v.map(video=><VideoCard key={video.id} video={video}/>)}</div>}
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#e8e3dc] py-2 text-center text-xs text-[#6b6560] max-w-lg mx-auto">忆青集 · 让每件旧物被看见</footer>
  </div>)
}
