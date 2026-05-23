"use client"; import { useState, useEffect } from "react"; import { useParams } from "next/navigation"; import { ArrowLeft, Heart, ShoppingBag, Share2, Play } from "lucide-react"; import Link from "next/link"; import type { Video } from "@/lib/types"
const MOCK_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
export default function VideoPage() {
  const { id } = useParams(); const [video,setV]=useState<Video|null>(null); const [liked,setLiked]=useState(false); const [wanted,setWanted]=useState(false); const [likes,setLikes]=useState(0); const [playing,setP]=useState(false); const [loading,setL]=useState(true)
  useEffect(()=>{fetch("/api/videos").then(r=>r.ok?r.json():null).then(d=>{const f=d?.find((v:Video)=>v.id===id); if(f){setV(f);setLikes(f.likes||0)} else {setV({id:id as string,title:"老式缝纫机的故事",item_name:"老式缝纫机",story:"它陪我妈妈做了500件衣服，现在它老了，但我的记忆不会褪色。",style:"水墨国风",original_photo_url:"",video_url:MOCK_URL,thumbnail_url:"https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop",likes:42,created_at:new Date().toISOString()});setLikes(42)};setL(false)}).catch(()=>{setV({id:id as string,title:"示例",item_name:"旧物",story:"这是一件有故事的旧物",style:"日漫风",original_photo_url:"",video_url:MOCK_URL,thumbnail_url:"",likes:0,created_at:new Date().toISOString()});setL(false)})},[id])
  useEffect(()=>{const s=JSON.parse(localStorage.getItem("wanted_items")||"[]"); if(s.includes(id)) setWanted(true)},[id])
  const handleLike = () => { setLiked(!liked); setLikes(l=>liked?l-1:l+1) }
  const handleWant = () => { const s=JSON.parse(localStorage.getItem("wanted_items")||"[]"); if(wanted){localStorage.setItem("wanted_items",JSON.stringify(s.filter((x:string)=>x!==id)))} else {s.push(id);localStorage.setItem("wanted_items",JSON.stringify(s))}; setWanted(!wanted) }
  if(loading) return (<div className="min-h-full bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"/></div>)
  return (<div className="min-h-full bg-black relative">
    <header className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center gap-3 bg-gradient-to-b from-black/60 to-transparent"><Link href="/" className="text-white"><ArrowLeft className="w-5 h-5"/></Link><div><h1 className="text-white font-bold text-sm">{video?.item_name}</h1><p className="text-white/60 text-xs">{video?.style}</p></div></header>
    <div className="relative w-full h-full max-h-[calc(100vh-140px)] bg-black flex items-center justify-center">
      {playing ? <video src={video?.video_url||MOCK_URL} className="w-full h-full object-contain" controls={false} autoPlay onEnded={()=>setP(false)}/>
      : <div className="relative w-full h-full"><img src={video?.thumbnail_url||"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=600&fit=crop"} alt={video?.item_name} className="w-full h-full object-cover opacity-80"/><button onClick={()=>setP(true)} className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"><div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"><Play className="w-7 h-7 text-[#d97706] ml-1"/></div></button></div>}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 space-y-3">
      <p className="text-white/90 text-sm leading-relaxed">{video?.story}</p>
      <div className="flex items-center justify-center gap-6 py-2">
        <button onClick={handleLike} className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"><div className={`w-12 h-12 rounded-full flex items-center justify-center ${liked?"bg-red-500/20":"bg-white/10"} transition-colors`}><Heart className={`w-6 h-6 ${liked?"fill-red-500 text-red-500":""}`}/></div><span className={`text-xs ${liked?"text-red-400":"text-white/60"}`}>{likes}</span></button>
        <button onClick={handleWant} className={`flex flex-col items-center gap-1 transition-colors ${wanted?"text-[#f59e0b]":"text-white/80 hover:text-white"}`}><div className={`w-12 h-12 rounded-full flex items-center justify-center ${wanted?"bg-[#f59e0b]/20":"bg-white/10"} transition-colors`}><ShoppingBag className={`w-6 h-6 ${wanted?"fill-[#f59e0b] text-[#f59e0b]":""}`}/></div><span className="text-xs">{wanted?"已标记":"我想要"}</span></button>
        <button onClick={()=>{if(navigator.share){navigator.share({title:video?.item_name,text:video?.story,url:window.location.href})}else{navigator.clipboard.writeText(window.location.href);alert("链接已复制")}}} className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Share2 className="w-5 h-5"/></div><span className="text-xs text-white/60">分享</span></button>
      </div>
    </div>
  </div>)
}
