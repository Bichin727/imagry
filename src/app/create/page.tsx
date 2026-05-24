"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, FileText } from "lucide-react";
import Link from "next/link";
import StyleSelector from "@/components/StyleSelector";
import Decorations, { SectionDivider } from "@/components/Decorations";

export default function CreatePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState("");
  const [story, setStory] = useState("");
  const [style, setStyle] = useState("manga");
  const [gen, setGen] = useState(false);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const r = new FileReader();
      r.onload = (ev) => setPhoto(ev.target?.result as string);
      r.readAsDataURL(f);
    }
  };

  const submit = async () => {
    if (!photo || !story.trim()) return;
    setGen(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo, story: story.trim(), style }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "生成失败");
      }
      const d = await res.json();
      router.push("/generating?id=" + d.id);
    } catch (e) {
      alert(e instanceof Error ? e.message : "生成请求失败，请重试");
      setGen(false);
    }
  };

  return (
    <div className="app-canvas min-h-full pb-8 relative">
      <Decorations variant="minimal" />
      <div className="page-content">
      <header className="sticky top-0 z-30 px-4 pt-4 pb-2">
        <div className="paper-panel rounded-2xl px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-[#2a241c]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-[#2a241c]">为旧物拍故事</h1>
        </div>
      </header>

      <SectionDivider label="旧物档案" />
      <div className="px-4 py-4 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#6b5f52]">拍摄旧物照片</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            className="hidden"
          />
          {photo ? (
            <div className="relative paper-panel rounded-2xl overflow-hidden ring-2 ring-[#c45c26]/30">
              <img src={photo} alt="旧物照片" className="w-full aspect-[4/3] object-cover" />
              <button
                type="button"
                onClick={() => {
                  setPhoto("");
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute top-2 right-2 bg-[#1a1208]/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
              >
                重拍
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full aspect-[4/3] paper-panel rounded-2xl border-2 border-dashed border-[#c9b8a4] flex flex-col items-center justify-center gap-2 hover:border-[#c45c26] hover:bg-[#faf6ef] transition-all"
            >
              <Camera className="w-10 h-10 text-[#c45c26]" />
              <span className="text-sm text-[#6b5f52]">点击拍照或选择照片</span>
            </button>
          )}
        </div>

        <div className="space-y-2 paper-panel rounded-2xl p-4">
          <label className="text-sm font-medium text-[#6b5f52] flex items-center gap-1">
            <FileText className="w-4 h-4" />
            写下这件旧物的故事
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="例如：这部收音机陪我爷爷听了几十年的京剧..."
            rows={4}
            maxLength={300}
            className="w-full bg-transparent text-sm resize-none focus:outline-none placeholder:text-[#6b5f52]/40 leading-relaxed"
          />
          <div className="text-right text-xs text-[#6b5f52]/60">{story.length}/300</div>
        </div>

        <StyleSelector selected={style} onSelect={setStyle} />

        <button
          type="button"
          onClick={submit}
          disabled={!photo || !story.trim() || gen}
          className="w-full py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-40 bg-gradient-to-r from-[#b84e1f] via-[#c45c26] to-[#e8a35c] shadow-lg shadow-[#c45c26]/25 active:scale-[0.98]"
        >
          {gen ? "正在生成..." : "✨ 生成故事视频"}
        </button>
      </div>
      </div>
    </div>
  );
}
