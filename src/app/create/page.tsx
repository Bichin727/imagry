"use client"; import { useState, useRef } from "react"; import { useRouter } from "next/navigation"; import { ArrowLeft, Camera, FileText } from "lucide-react"; import Link from "next/link"; import StyleSelector from "@/components/StyleSelector"
export default function CreatePage() {
  const router = useRouter(); const fileRef = useRef<HTMLInputElement>(null)
  const [photo,setPhoto]=useState(""); const [story,setStory]=useState(""); const [style,setStyle]=useState("manga"); const [gen,setGen]=useState(false)
  const handlePhoto = (e:React.ChangeEvent<HTMLInputElement>) => { const f=e.target.files?.[0]; if(f){const r=new FileReader(); r.onload=ev=>setPhoto(ev.target?.result as string); r.readAsDataURL(f)} }
  const submit = async () => { if(!photo||!story.trim()) return; setGen(true)
    try { const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({photo,story:story.trim(),style})}); if(!res.ok) throw Error(""); const d=await res.json(); router.push("/generating?id="+d.id) }
    catch { alert("生成请求失败，请重试"); setGen(false) } }
  return (<div className="min-h-full bg-[#faf7f2]">
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#e8e3dc] px-4 py-3 flex items-center gap-3"><Link href="/" className="text-[#2d2a26]"><ArrowLeft className="w-5 h-5"/></Link><h1 className="text-lg font-bold text-[#2d2a26]">为旧物拍故事</h1></header>
    <div className="px-4 py-4 space-y-5">
      <div className="space-y-2"><label className="text-sm font-medium text-[#6b6560]">拍摄旧物照片</label><input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handlePhoto} className="hidden"/>
        {photo ? <div className="relative rounded-xl overflow-hidden border-2 border-[#d97706]"><img src={photo} alt="旧物照片" className="w-full aspect-[4/3] object-cover"/><button onClick={()=>{setPhoto("");if(fileRef.current)fileRef.current.value=""}} className="absolute top-2 right-2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">重拍</button></div>
        : <button onClick={()=>fileRef.current?.click()} className="w-full aspect-[4/3] bg-white rounded-xl border-2 border-dashed border-[#d4cfc9] flex flex-col items-center justify-center gap-2 hover:border-[#d97706] hover:bg-[#fef3c7] transition-all duration-200"><Camera className="w-10 h-10 text-[#d97706]"/><span className="text-sm text-[#6b6560]">点击拍照或选择照片</span><span className="text-xs text-[#6b6560]/60">支持拍照或从相册选择</span></button>}
      </div>
      <div className="space-y-2"><label className="text-sm font-medium text-[#6b6560] flex items-center gap-1"><FileText className="w-4 h-4"/>写下这件旧物的故事</label><textarea value={story} onChange={e=>setStory(e.target.value)} placeholder="例如：这部收音机陪我爷爷听了几十年的京剧..." rows={4} maxLength={300} className="w-full bg-white rounded-xl border border-[#e8e3dc] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-amber-500/10 transition-all placeholder:text-[#6b6560]/40"/><div className="text-right text-xs text-[#6b6560]/60">{story.length}/300</div></div>
      <StyleSelector selected={style} onSelect={setStyle}/>
      <button onClick={submit} disabled={!photo||!story.trim()||gen} className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[#d97706] to-[#f59e0b] shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]">{gen?"正在生成...":"✨ 生成故事视频"}</button>
    </div>
  </div>)
}
