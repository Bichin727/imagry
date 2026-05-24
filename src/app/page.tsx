"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Sparkles } from "lucide-react";
import CoverCarousel from "@/components/CoverCarousel";
import Decorations, { SectionDivider } from "@/components/Decorations";
import type { Video } from "@/lib/types";

const MOCK: Video[] = [
  {
    id: "1",
    title: "老式缝纫机的故事",
    item_name: "老式缝纫机",
    story: "它陪我妈妈做了500件衣服，现在它老了，但我的记忆不会褪色。",
    style: "水墨国风",
    original_photo_url: "",
    video_url: "",
    thumbnail_url:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop",
    likes: 42,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "我的第一台游戏机",
    item_name: "任天堂GameBoy",
    story: "小学偷偷攒了三年零花钱买来的，陪我度过了无数个放学后的下午。",
    style: "像素复古",
    original_photo_url: "",
    video_url: "",
    thumbnail_url:
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=600&fit=crop",
    likes: 128,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    title: "奶奶的檀木梳",
    item_name: "檀木梳",
    story: "奶奶用它梳了一辈子的头，每次闻到檀木香，就像回到了童年的小院。",
    style: "温暖绘本",
    original_photo_url: "",
    video_url: "",
    thumbnail_url:
      "https://images.unsplash.com/photo-1624454002302-36b024d1c214?w=400&h=600&fit=crop",
    likes: 89,
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
];

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.length > 0) setVideos(d);
        else setVideos(MOCK);
        setLoading(false);
      })
      .catch(() => {
        setVideos(MOCK);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-canvas min-h-full pb-28 relative">
      <Decorations variant="full" />
      <div className="page-content">
      <header className="sticky top-0 z-30 px-4 pt-4 pb-3">
        <div className="paper-panel paper-inset header-glow frame-ornate rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8a35c] to-[#c45c26] flex items-center justify-center text-white text-lg shadow-md shrink-0">
            忆
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[#2a241c] tracking-wide">忆青集</h1>
            <p className="text-xs text-[#6b5f52] mt-0.5 truncate">
              旧物 × AI 叙事 × 可分享
            </p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-2 pb-1 text-center">
        <p className="text-sm text-[#6b5f52] leading-relaxed">
          拍下旧物，让记忆在盘面上缓缓旋转
          <br />
          <span className="text-[#c45c26] font-medium">旧物不言 · AI 代它说</span>
        </p>
      </section>

      <div className="px-4 py-3">
        <Link
          href="/create"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#b84e1f] via-[#c45c26] to-[#e8a35c] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#c45c26]/25 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
        >
          <Camera className="w-5 h-5" />
          <span>为旧物拍一段故事</span>
          <Sparkles className="w-4 h-4 opacity-90" />
        </Link>
      </div>

      <SectionDivider label="故事轮盘" />
      <section className="mt-1 relative">
        {loading ? (
          <div className="wheel-stage h-[min(58vh,420px)] flex items-center justify-center px-8">
            <div className="w-full max-w-[168px] aspect-[3/4] rounded-2xl animate-shimmer paper-panel" />
          </div>
        ) : (
          <CoverCarousel videos={videos} />
        )}
      </section>

      <footer className="fixed bottom-0 left-0 right-0 z-30 max-w-lg mx-auto">
        <div className="mx-3 mb-3 paper-panel frame-ornate rounded-xl py-2.5 text-center text-xs text-[#6b5f52]">
          ✦ 忆青集 · 让每件旧物被看见 ·{" "}
          <Link href="/poster" className="text-[#c45c26] hover:underline">
            查看海报
          </Link>{" "}
          ✦
        </div>
      </footer>
      </div>
    </div>
  );
}
