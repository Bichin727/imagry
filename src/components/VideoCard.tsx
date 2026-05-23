import Link from "next/link"; import { Heart, ShoppingBag } from "lucide-react"; import type { Video } from "@/lib/types"
function formatTime(d: string): string { const m = Math.floor((Date.now()-new Date(d).getTime())/60000); if(m<1)return "刚刚"; if(m<60)return m+"分钟前"; const h = Math.floor(m/60); if(h<24)return h+"小时前"; return Math.floor(h/24)+"天前" }
export default function VideoCard({ video }: { video: Video }) {
  return (<Link href={"/video/"+video.id} className="block group">
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e3dc] shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up">
      <div className="relative aspect-[9/16] bg-[#f5f0ea] overflow-hidden">
        {video.thumbnail_url ? <img src={video.thumbnail_url} alt={video.item_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center"><div className="text-6xl">📦</div></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3"><h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{video.item_name}</h3><p className="text-white/80 text-sm mt-1 line-clamp-2 drop-shadow">{video.story}</p></div>
        <div className="absolute top-3 right-3"><span className="bg-white/80 backdrop-blur-sm text-[#6b6560] text-xs px-2 py-1 rounded-full">{video.style}</span></div>
      </div>
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#6b6560] text-sm"><Heart className="w-4 h-4 text-red-400" /><span>{video.likes}</span></div>
        <div className="flex items-center gap-3"><span className="text-xs text-[#6b6560]">{formatTime(video.created_at)}</span>
        <button onClick={e=>{e.preventDefault();e.stopPropagation();const s=JSON.parse(localStorage.getItem("wanted_items")||"[]");if(!s.includes(video.id)){s.push(video.id);localStorage.setItem("wanted_items",JSON.stringify(s))}}} className="flex items-center gap-1 text-xs bg-[#d97706] text-white px-2 py-1 rounded-full hover:bg-[#b45309] transition-colors"><ShoppingBag className="w-3 h-3"/>我想要</button></div>
      </div>
    </div>
  </Link>)
}
