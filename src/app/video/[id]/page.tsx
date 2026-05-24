"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, ShoppingBag, Share2, Play, Volume2 } from "lucide-react";
import Link from "next/link";
import Decorations from "@/components/Decorations";
import type { Video } from "@/lib/types";

const MOCK_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setV] = useState<Video | null>(null);
  const [liked, setLiked] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [playing, setP] = useState(false);
  const [loading, setL] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    fetch("/api/videos/" + id)
      .then((r) => (r.ok ? r.json() : null))
      .then((f) => {
        if (f) {
          setV(f);
          setLikes(f.likes || 0);
          setL(false);
          return;
        }
        return fetch("/api/videos")
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            const found = d?.find((v: Video) => v.id === id);
            if (found) {
              setV(found);
              setLikes(found.likes || 0);
            } else {
              setV({
                id: id as string,
                title: "老式缝纫机的故事",
                item_name: "老式缝纫机",
                story:
                  "它陪我妈妈做了500件衣服，现在它老了，但我的记忆不会褪色。",
                style: "水墨国风",
                original_photo_url: "",
                video_url: MOCK_URL,
                thumbnail_url:
                  "https://images.unsplash.com/photo-1611501275019-9b5cda994e8a?w=400&h=600&fit=crop",
                likes: 42,
                created_at: new Date().toISOString(),
              });
              setLikes(42);
            }
            setL(false);
          });
      })
      .catch(() => {
        setV({
          id: id as string,
          title: "示例",
          item_name: "旧物",
          story: "这是一件有故事的旧物",
          style: "日漫风",
          original_photo_url: "",
          video_url: MOCK_URL,
          thumbnail_url: "",
          likes: 0,
          created_at: new Date().toISOString(),
        });
        setL(false);
      });
  }, [id]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("wanted_items") || "[]");
    if (s.includes(id)) setWanted(true);
  }, [id]);

  useEffect(() => {
    if (!video?.slides?.length) return;
    const t = setInterval(() => {
      setSlideIdx((i) => (i + 1) % (video.slides?.length || 1));
    }, 4500);
    return () => clearInterval(t);
  }, [video?.slides?.length]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((l) => (liked ? l - 1 : l + 1));
  };

  const handleWant = () => {
    const s = JSON.parse(localStorage.getItem("wanted_items") || "[]");
    if (wanted) {
      localStorage.setItem(
        "wanted_items",
        JSON.stringify(s.filter((x: string) => x !== id))
      );
    } else {
      s.push(id);
      localStorage.setItem("wanted_items", JSON.stringify(s));
    }
    setWanted(!wanted);
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-[#1a1208] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-900/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeSlide = video?.slides?.[slideIdx];

  return (
    <div className="min-h-[100dvh] bg-[#0d0a07] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none z-[5] mix-blend-soft-light">
        <Decorations variant="immersive" />
      </div>
      <div className="absolute inset-0 film-vignette pointer-events-none z-20" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <header className="absolute top-0 left-0 right-0 z-30 px-4 py-4 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-bold text-base truncate">
            {video?.item_name}
          </h1>
          <p className="text-amber-200/70 text-xs">{video?.style}</p>
        </div>
        {video?.audio_url && (
          <span className="text-amber-300/80" title="已生成配音">
            <Volume2 className="w-5 h-5" />
          </span>
        )}
      </header>

      <div className="absolute inset-0 z-0">
        {playing ? (
          <video
            src={video?.video_url || MOCK_URL}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            onEnded={() => setP(false)}
          />
        ) : (
          <>
            <img
              src={
                video?.thumbnail_url ||
                "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1200&fit=crop"
              }
              alt={video?.item_name}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
            <button
              type="button"
              onClick={() => setP(true)}
              className="absolute inset-0 z-10 flex items-center justify-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-amber-900/40 group-hover:scale-110 transition-transform duration-300 ring-4 ring-amber-500/30">
                <Play className="w-9 h-9 text-[#c45c26] ml-1" fill="#c45c26" />
              </div>
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 pb-8 space-y-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
        {video?.hook && (
          <p className="text-amber-200 text-sm font-medium tracking-wide text-center">
            {video.hook}
          </p>
        )}

        {activeSlide ? (
          <div className="paper-panel rounded-2xl p-4 mx-1 bg-white/95 border-0 animate-fade-in-up">
            <p className="text-[#c45c26] text-xs tracking-widest mb-1">
              第 {slideIdx + 1} 幕 · {activeSlide.title}
            </p>
            <p className="text-[#2a241c] text-sm leading-relaxed">{activeSlide.caption}</p>
            <p className="text-[#6b5f52] text-xs mt-2 italic border-l-2 border-[#e8a35c] pl-2">
              {activeSlide.narration}
            </p>
          </div>
        ) : (
          <p className="text-white/90 text-sm leading-relaxed text-center px-2">
            {video?.story}
          </p>
        )}

        {video?.slides && video.slides.length > 1 && (
          <div className="flex justify-center gap-1.5">
            {video.slides.map((s, i) => (
              <button
                key={s.index}
                type="button"
                onClick={() => setSlideIdx(i)}
                className={`h-1 rounded-full transition-all ${
                  i === slideIdx ? "w-8 bg-amber-400" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-8 pt-1">
          <button
            type="button"
            onClick={handleLike}
            className="flex flex-col items-center gap-1 text-white/80"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                liked ? "bg-red-500/25 ring-1 ring-red-400/50" : "bg-white/10"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${liked ? "fill-red-400 text-red-400" : ""}`}
              />
            </div>
            <span className="text-xs">{likes}</span>
          </button>
          <button
            type="button"
            onClick={handleWant}
            className={`flex flex-col items-center gap-1 ${
              wanted ? "text-amber-400" : "text-white/80"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                wanted ? "bg-amber-500/20" : "bg-white/10"
              }`}
            >
              <ShoppingBag
                className={`w-6 h-6 ${wanted ? "fill-amber-400 text-amber-400" : ""}`}
              />
            </div>
            <span className="text-xs">{wanted ? "已标记" : "我想要"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: video?.item_name,
                  text: video?.story,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("链接已复制");
              }
            }}
            className="flex flex-col items-center gap-1 text-white/80"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-white/50">分享</span>
          </button>
        </div>
      </div>
    </div>
  );
}
