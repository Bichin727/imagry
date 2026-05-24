"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Decorations from "@/components/Decorations";
import type { Video } from "@/lib/types";

function styleEmoji(style: string): string {
  if (style.includes("水墨")) return "🏮";
  if (style.includes("像素")) return "👾";
  if (style.includes("绘本")) return "📖";
  if (style.includes("日漫")) return "🎌";
  return "📷";
}

function wrapIndex(i: number, len: number): number {
  if (len === 0) return 0;
  return ((i % len) + len) % len;
}

export default function CoverCarousel({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const len = videos.length;

  const go = useCallback(
    (delta: number) => {
      setActive((a) => wrapIndex(a + delta, len));
    },
    [len]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (len === 0) return null;

  const current = videos[active];

  const visibleRange = len <= 5 ? len : 5;
  const half = Math.floor(visibleRange / 2);
  const slots: { video: Video; offset: number; index: number }[] = [];

  for (let o = -half; o <= half; o++) {
    const idx = wrapIndex(active + o, len);
    slots.push({ video: videos[idx], offset: o, index: idx });
  }

  return (
    <div className="relative w-full">
      <Decorations variant="wheel" />
      <div className="wheel-stage relative h-[min(58vh,420px)] flex items-center justify-center z-[1]">
        {/* 转盘底盘 */}
        <div
          className="absolute w-[88%] max-w-[340px] aspect-square rounded-full border border-[#ddd0c0]/80 opacity-60"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,252,245,0.9), rgba(235,220,200,0.5), rgba(255,252,245,0.9))",
            boxShadow: "inset 0 8px 24px rgba(255,255,255,0.5), 0 16px 40px rgba(80,50,30,0.12)",
          }}
        />
        <div
          className="absolute w-[72%] max-w-[280px] aspect-square rounded-full border border-dashed border-[#c9b8a4]/50 animate-[slowSpin_48s_linear_infinite]"
          aria-hidden
        />

        <div className="relative w-full h-full flex items-center justify-center">
          {slots.map(({ video, offset, index }) => {
            const isCenter = offset === 0;
            const abs = Math.abs(offset);
            const rotateY = offset * 32;
            const translateX = offset * 56;
            const scale = isCenter ? 1 : 0.78 - abs * 0.04;
            const opacity = isCenter ? 1 : Math.max(0.2, 0.55 - abs * 0.15);
            const zIndex = 20 - abs;

            const card = (
              <div
                className={`absolute w-[148px] sm:w-[168px] transition-all duration-500 ease-out ${
                  isCenter ? "wheel-glow-ring" : ""
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex,
                  filter: isCenter ? "none" : `blur(${abs * 0.6}px)`,
                  left: "50%",
                  top: "50%",
                }}
              >
                <div
                  className={`paper-panel rounded-2xl overflow-hidden ${
                    isCenter ? "ring-2 ring-[#c45c26]/40" : ""
                  }`}
                  style={{
                    transform: isCenter ? "translateZ(40px)" : "translateZ(0)",
                    boxShadow: isCenter ? "var(--shadow-warm)" : "var(--shadow-card)",
                  }}
                >
                  <div className="relative aspect-[3/4] bg-[#ebe3d8]">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.item_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📦
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/75 via-transparent to-transparent" />
                    {isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 text-[#c45c26] ml-0.5" fill="#c45c26" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-white/85 text-[#6b5f52] backdrop-blur-sm">
                      {styleEmoji(video.style)} {video.style}
                    </div>
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm leading-tight drop-shadow-md">
                          {video.title || video.item_name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );

            if (isCenter) {
              return (
                <Link
                  key={`${video.id}-${index}-center`}
                  href={`/video/${video.id}`}
                  className="block"
                >
                  {card}
                </Link>
              );
            }

            return (
              <button
                key={`${video.id}-${index}-side`}
                type="button"
                className="cursor-pointer block"
                onClick={() => setActive(index)}
                aria-label={`查看 ${video.item_name}`}
              >
                {card}
              </button>
            );
          })}
        </div>
      </div>

      {/* 中心故事摘要 */}
      <div className="px-6 mt-2 text-center animate-fade-in-up min-h-[72px]">
        <p className="text-[#c45c26] text-xs tracking-[0.2em] uppercase mb-1">当前故事</p>
        <h2 className="text-lg font-bold text-[#2a241c]">{current.item_name}</h2>
        <p className="text-sm text-[#6b5f52] mt-1 line-clamp-2 leading-relaxed px-2">
          {current.hook || current.story}
        </p>
      </div>

      {/* 控制 */}
      <div className="flex items-center justify-center gap-6 mt-4 px-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full paper-panel flex items-center justify-center text-[#6b5f52] hover:text-[#2a241c] active:scale-95 transition-all"
          aria-label="上一个"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {videos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#c45c26]" : "w-1.5 bg-[#c9b8a4]"
              }`}
              aria-label={`第 ${i + 1} 个故事`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full paper-panel flex items-center justify-center text-[#6b5f52] hover:text-[#2a241c] active:scale-95 transition-all"
          aria-label="下一个"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center mt-3">
        <Link
          href={`/video/${current.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#c45c26] hover:text-[#a34a1e]"
        >
          <Play className="w-4 h-4" />
          全屏沉浸播放
        </Link>
      </div>
    </div>
  );
}
