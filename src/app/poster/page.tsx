"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=800&h=1000&fit=crop",
    alt: "老式缝纫机",
  },
  {
    src: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&h=1000&fit=crop",
    alt: "旧游戏机",
  },
  {
    src: "https://images.unsplash.com/photo-1624454002302-36b024d1c214?w=800&h=1000&fit=crop",
    alt: "檀木梳",
  },
];

const FEATURES = [
  "旧物旧照 · 写故事 · 共鸣",
  "按年份归档 · 集体回忆",
  "交换故事集",
  "AI 漫画主题生成",
  "关注最高 · 定制相册",
  "开放式结局 · 续写",
];

export default function PosterPage() {
  return (
    <div className="min-h-full bg-[#f7f5f2]">
      <div className="max-w-lg mx-auto poster-luxury">
        {/* 返回 */}
        <div className="absolute top-5 left-5 z-30">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors tracking-wide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            返回
          </Link>
        </div>

        {/* 主视觉：照片占页面主体 */}
        <section className="relative h-[68vh] min-h-[480px] overflow-hidden">
          {/* 三图拼贴，中间主图最大 */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-[3px] bg-[#1a1a1a]">
            <div className="col-span-5 row-span-3 relative overflow-hidden">
              <Image
                src={PHOTOS[0].src}
                alt={PHOTOS[0].alt}
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>
            <div className="col-span-7 row-span-6 relative overflow-hidden">
              <Image
                src={PHOTOS[1].src}
                alt={PHOTOS[1].alt}
                fill
                className="object-cover"
                sizes="60vw"
                priority
              />
            </div>
            <div className="col-span-5 row-span-3 relative overflow-hidden">
              <Image
                src={PHOTOS[2].src}
                alt={PHOTOS[2].alt}
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>
          </div>

          {/* 轻奢渐变遮罩 + 品牌 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/75 via-[#1a1a1a]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-16">
            <p className="text-[10px] tracking-[0.35em] text-[#c9a962] uppercase mb-3">
              YI QING JI
            </p>
            <h1 className="text-[2.75rem] font-light text-white tracking-[0.12em] leading-none mb-3">
              忆青集
            </h1>
            <p className="text-sm text-white/70 font-light tracking-wide">
              旧物不言 · AI 代它说
            </p>
          </div>
        </section>

        {/* 简约信息区 */}
        <section className="px-6 py-8">
          <p className="text-[13px] text-[#6b6560] leading-relaxed font-light mb-8">
            以旧物与旧照片为载体，串联以人为核心的记忆服务。
            写下故事，生成漫画，交换回忆，续写结局。
          </p>

          <ul className="space-y-0 mb-10">
            {FEATURES.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-4 py-3.5 border-b border-[#e8e4df] last:border-0"
              >
                <span className="text-[10px] text-[#c9a962] font-mono w-4 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] text-[#2a2826] font-light tracking-wide">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <footer className="flex items-end justify-between gap-6 pt-2">
            <div>
              <p className="text-[11px] text-[#9a9590] tracking-widest mb-1">扫码体验</p>
              <Link
                href="/create"
                className="text-sm text-[#2a2826] tracking-wide border-b border-[#c9a962] pb-0.5 hover:text-[#c9a962] transition-colors"
              >
                为旧物拍一段故事 →
              </Link>
            </div>
            <div className="w-[72px] h-[72px] bg-white border border-[#e8e4df] flex items-center justify-center shrink-0">
              <span className="text-[9px] text-[#9a9590] text-center leading-tight">
                QR
              </span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
