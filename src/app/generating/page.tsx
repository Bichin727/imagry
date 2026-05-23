"use client"; import { useEffect, useState, Suspense } from "react"; import { useRouter, useSearchParams } from "next/navigation"; import { Sparkles, CheckCircle } from "lucide-react"; import { AI_STEPS } from "@/lib/types"
function Content() {
  const router = useRouter(); const sp = useSearchParams(); const vid = sp.get("id"); const [step,setStep]=useState(0); const [done,setDone]=useState(false)
  useEffect(() => { if(!vid){router.push("/create");return}
    const t=setInterval(()=>{setStep(p=>{if(p>=AI_STEPS.length-1){clearInterval(t);setDone(true);setTimeout(()=>router.push("/video/"+vid),1000);return p};return p+1})},1500); return ()=>clearInterval(t) },[vid,router])
  return (<div className="min-h-full flex flex-col items-center justify-center px-6">
    {done ? <div className="flex flex-col items-center gap-4 animate-fade-in-up"><div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-10 h-10 text-green-500"/></div><h2 className="text-xl font-bold text-[#2d2a26]">生成完成</h2><p className="text-sm text-[#6b6560]">即将进入播放...</p></div>
    : <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <div className="relative"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fef3c7] to-[#f59e0b] flex items-center justify-center"><Sparkles className="w-10 h-10 text-[#d97706] animate-pulse"/></div><div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#d97706] text-white text-xs flex items-center justify-center font-bold">{step+1}/{AI_STEPS.length}</div></div>
      <h2 className="text-lg font-bold text-[#2d2a26]">AI 正在创作</h2>
      <div className="w-full space-y-3">{AI_STEPS.map((s,i)=>(<div key={i} className="flex items-center gap-3"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${i<step?"bg-green-500 text-white":i===step?"bg-[#d97706] text-white animate-pulse":"bg-[#e8e3dc] text-[#6b6560]"}`}>{i<step?"✓":i+1}</div><span className={`text-sm transition-all duration-300 ${i<=step?"text-[#2d2a26] font-medium":"text-[#6b6560]/40"}`}>{s}</span></div>))}</div>
      <div className="w-full h-2 bg-[#e8e3dc] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-full transition-all duration-500 ease-out" style={{width:((step+1)/AI_STEPS.length*100)+"%"}}/></div>
    </div>}
    <div className="absolute bottom-20 text-center text-xs text-[#6b6560]/60"><p className="mb-1">忆青集 · AI 为你书写旧物故事</p><p>请耐心等待 ~6秒</p></div>
  </div>)
}
export default function GeneratingPage() { return (<div className="min-h-full bg-[#faf7f2]"><Suspense fallback={<div className="min-h-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#e8e3dc] border-t-[#d97706] rounded-full animate-spin"/></div>}><Content/></Suspense></div>) }
