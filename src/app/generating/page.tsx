"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, CheckCircle } from "lucide-react";
import { AI_STEPS } from "@/lib/types";
import Decorations from "@/components/Decorations";

function Content() {
  const router = useRouter();
  const sp = useSearchParams();
  const vid = sp.get("id");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!vid) {
      router.push("/create");
      return;
    }
    const t = setInterval(() => {
      setStep((p) => {
        if (p >= AI_STEPS.length - 1) {
          clearInterval(t);
          setDone(true);
          setTimeout(() => router.push("/video/" + vid), 1000);
          return p;
        }
        return p + 1;
      });
    }, 1500);
    return () => clearInterval(t);
  }, [vid, router]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 relative">
      {done ? (
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center ring-4 ring-green-200/50">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[#2a241c]">生成完成</h2>
          <p className="text-sm text-[#6b5f52]">即将进入全屏沉浸播放...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-xs paper-panel rounded-3xl p-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#faf0e0] to-[#e8a35c] flex items-center justify-center shadow-inner">
              <Sparkles className="w-11 h-11 text-[#c45c26] animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#c45c26] text-white text-xs flex items-center justify-center font-bold shadow-md">
              {step + 1}/{AI_STEPS.length}
            </div>
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[#c45c26]/30 animate-[slowSpin_12s_linear_infinite]"
              aria-hidden
            />
          </div>
          <h2 className="text-lg font-bold text-[#2a241c]">AI 正在创作</h2>
          <div className="w-full space-y-3">
            {AI_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-green-600 text-white"
                      : i === step
                        ? "bg-[#c45c26] text-white animate-pulse"
                        : "bg-[#e8e3dc] text-[#6b5f52]"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm ${i <= step ? "text-[#2a241c] font-medium" : "text-[#6b5f52]/40"}`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-[#e8e3dc] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c45c26] to-[#e8a35c] rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / AI_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      <p className="absolute bottom-16 text-center text-xs text-[#6b5f52]/70">
        忆青集 · 盘面旋转，故事即将登场
      </p>
    </div>
  );
}

export default function GeneratingPage() {
  return (
    <div className="app-canvas min-h-full relative">
      <Decorations variant="wheel" />
      <Suspense
        fallback={
          <div className="min-h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#e8e3dc] border-t-[#c45c26] rounded-full animate-spin" />
          </div>
        }
      >
        <Content />
      </Suspense>
    </div>
  );
}
