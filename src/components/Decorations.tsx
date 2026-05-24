/** 忆青集 · 页面四周装饰（复古纹样 + 旧物小标 + 胶片/邮戳） */

const stroke = "#c9b8a4";
const strokeAccent = "#c45c26";
const fillSoft = "#e8dccf";
const gold = "#d4a574";

function CornerOrnament({ className, flip }: { className?: string; flip?: "x" | "y" | "xy" }) {
  const scale =
    flip === "x"
      ? "scale(-1,1)"
      : flip === "y"
        ? "scale(1,-1)"
        : flip === "xy"
          ? "scale(-1,-1)"
          : undefined;
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      style={scale ? { transform: scale } : undefined}
    >
      <path
        d="M6 6h28M6 6v28M6 6c12 6 20 16 26 28"
        stroke={strokeAccent}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M12 38c0-8 6-16 14-18M38 12c-8 0-16 6-18 14"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M20 20c6 4 10 10 12 18M20 20c4 6 6 12 6 20"
        stroke={gold}
        strokeWidth="0.6"
        opacity="0.4"
      />
      <circle cx="42" cy="42" r="3" fill={fillSoft} stroke={strokeAccent} strokeWidth="0.9" />
      <circle cx="42" cy="42" r="6" stroke={stroke} strokeWidth="0.5" opacity="0.35" />
      <path
        d="M48 14 Q56 22 58 32 M14 48 Q22 56 32 58"
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.35"
      />
      <path d="M8 52 L16 48 L12 56 Z" fill={fillSoft} stroke={stroke} strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function VineCorner({ className, flip }: { className?: string; flip?: "x" | "y" | "xy" }) {
  const scale =
    flip === "x" ? "scale(-1,1)" : flip === "y" ? "scale(1,-1)" : flip === "xy" ? "scale(-1,-1)" : undefined;
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      style={scale ? { transform: scale } : undefined}
    >
      <path
        d="M8 56 C8 40 20 28 36 24 C28 20 16 12 8 8 M36 24 C44 16 52 8 56 4"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="8" cy="8" r="2" fill={strokeAccent} opacity="0.35" />
      <circle cx="56" cy="4" r="1.5" fill={gold} opacity="0.4" />
      <ellipse cx="20" cy="36" rx="4" ry="2.5" fill={fillSoft} stroke={stroke} strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

function ScallopBorder({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 16" fill="none" aria-hidden preserveAspectRatio="none">
      <path
        d="M0 8 Q6 2 12 8 T24 8 T36 8 T48 8 T60 8 T72 8 T84 8 T96 8 T108 8 T120 8 T132 8 T144 8 T156 8 T168 8 T180 8 T192 8 T200 8"
        stroke={stroke}
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M0 12 Q6 6 12 12 T24 12 T36 12 T48 12 T60 12 T72 12 T84 12 T96 12 T108 12 T120 12 T132 12 T144 12 T156 12 T168 12 T180 12 T192 12 T200 12"
        stroke={strokeAccent}
        strokeWidth="0.6"
        opacity="0.25"
      />
    </svg>
  );
}

function FilmStrip({ className, vertical }: { className?: string; vertical?: boolean }) {
  return (
    <svg
      className={className}
      viewBox={vertical ? "0 0 20 120" : "0 0 120 20"}
      fill="none"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width={vertical ? 18 : 118}
        height={vertical ? 118 : 18}
        rx="2"
        fill="#2a241c"
        fillOpacity="0.04"
        stroke={stroke}
        strokeWidth="0.8"
      />
      {Array.from({ length: vertical ? 6 : 8 }).map((_, i) =>
        vertical ? (
          <rect
            key={i}
            x="4"
            y={4 + i * 18}
            width="12"
            height="12"
            rx="1"
            fill={fillSoft}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.6"
          />
        ) : (
          <rect
            key={i}
            x={4 + i * 14}
            y="4"
            width="10"
            height="12"
            rx="1"
            fill={fillSoft}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.6"
          />
        )
      )}
    </svg>
  );
}

function VintageStamp({ className, text }: { className?: string; text: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full border-2 border-dashed border-[#c45c26]/40 bg-[#faf6ef]/80 backdrop-blur-[1px]`}
      style={{ transform: "rotate(-12deg)" }}
    >
      <span className="text-[9px] font-bold tracking-widest text-[#c45c26]/70 uppercase text-center leading-tight px-1">
        {text}
      </span>
    </div>
  );
}

function TapeStrip({ className, rotate }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`${className} h-7 w-16 sm:w-20 opacity-35`}
      style={{
        transform: `rotate(${rotate ?? -4}deg)`,
        background: "linear-gradient(180deg, rgba(232,163,92,0.5), rgba(212,165,116,0.35))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
      }}
      aria-hidden
    />
  );
}

function LanternString({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 280 36" fill="none" aria-hidden>
      <path d="M0 8 Q70 18 140 10 T280 14" stroke={stroke} strokeWidth="0.8" opacity="0.4" />
      {[40, 100, 160, 220].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${i % 2 ? 12 : 6})`}>
          <line x1="8" y1="0" x2="8" y2="6" stroke={strokeAccent} strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="8" cy="12" rx="7" ry="9" fill="#c45c26" fillOpacity="0.12" stroke={strokeAccent} strokeWidth="0.9" />
          <rect x="4" y="4" width="8" height="3" rx="1" fill={gold} fillOpacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

type FloatItem = {
  emoji?: string;
  label?: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  delay: string;
  size?: "sm" | "md" | "lg";
};

const FLOATING: FloatItem[] = [
  { emoji: "📻", top: "8%", left: "2%", rotate: -14, delay: "0s", size: "lg" },
  { emoji: "🧵", top: "14%", right: "3%", rotate: 10, delay: "0.4s", size: "md" },
  { emoji: "📷", top: "36%", left: "0%", rotate: 8, delay: "0.9s", size: "md" },
  { emoji: "⌚", top: "48%", right: "1%", rotate: -8, delay: "1.1s", size: "sm" },
  { emoji: "📖", top: "66%", left: "4%", rotate: -6, delay: "0.6s", size: "md" },
  { emoji: "🪡", top: "74%", right: "5%", rotate: 14, delay: "1.4s", size: "sm" },
  { emoji: "☕", top: "24%", right: "0%", rotate: -5, delay: "0.2s", size: "sm" },
  { emoji: "🎞️", top: "58%", left: "3%", rotate: 12, delay: "1.7s", size: "sm" },
  { emoji: "🪆", top: "82%", left: "12%", rotate: -10, delay: "2s", size: "md" },
  { emoji: "📻", top: "88%", right: "12%", rotate: 6, delay: "1.2s", size: "sm" },
  { emoji: "🧸", top: "20%", left: "10%", rotate: 4, delay: "1.5s", size: "sm" },
  { emoji: "🎹", top: "42%", right: "8%", rotate: -12, delay: "0.7s", size: "sm" },
  { label: "1980", top: "10%", right: "14%", rotate: 8, delay: "0s", size: "sm" },
  { label: "回忆", top: "52%", left: "6%", rotate: -4, delay: "1s", size: "sm" },
  { label: "旧物", top: "78%", right: "2%", rotate: 6, delay: "1.8s", size: "sm" },
];

const sizeMap = { sm: "text-base", md: "text-xl", lg: "text-2xl sm:text-3xl" };

function FloatingIcons() {
  return (
    <>
      {FLOATING.map((item, i) => (
        <span
          key={i}
          className={`decor-float absolute select-none pointer-events-none ${
            item.emoji ? sizeMap[item.size ?? "md"] : ""
          }`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            transform: `rotate(${item.rotate}deg)`,
            animationDelay: item.delay,
          }}
        >
          {item.emoji ? (
            item.emoji
          ) : (
            <span className="decor-label text-[10px] sm:text-xs font-serif tracking-[0.3em] text-[#c45c26]/45 border border-[#c9b8a4]/50 px-2 py-0.5 rounded-sm bg-[#faf6ef]/60">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

function SidePattern({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`absolute ${side === "left" ? "left-0" : "right-0"} top-[18%] h-[55%] w-8 opacity-[0.22] pointer-events-none`}
      viewBox="0 0 32 160"
      fill="none"
      aria-hidden
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} transform={`translate(0, ${i * 16})`}>
          <circle cx="16" cy="6" r="2" fill={i % 2 ? strokeAccent : stroke} fillOpacity="0.5" />
          <path d="M16 10v5M11 13h10" stroke={stroke} strokeWidth="0.7" opacity="0.5" />
          {i % 3 === 0 && (
            <path d="M8 3 Q16 8 24 3" stroke={gold} strokeWidth="0.5" opacity="0.4" />
          )}
        </g>
      ))}
    </svg>
  );
}

function WheelRimTicks({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 10 * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 86 : 90;
        const r2 = i % 3 === 0 ? 98 : 94;
        const x1 = 100 + r1 * Math.cos(a);
        const y1 = 100 + r1 * Math.sin(a);
        const x2 = 100 + r2 * Math.cos(a);
        const y2 = 100 + r2 * Math.sin(a);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 6 === 0 ? strokeAccent : stroke}
            strokeWidth={i % 6 === 0 ? 1.4 : 0.55}
            opacity={i % 6 === 0 ? 0.55 : 0.28}
          />
        );
      })}
      <circle cx="100" cy="100" r="78" stroke={stroke} strokeWidth="0.6" opacity="0.2" strokeDasharray="4 6" />
      <circle cx="100" cy="100" r="68" stroke={strokeAccent} strokeWidth="0.4" opacity="0.15" />
    </svg>
  );
}

function CloudPattern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 60" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
      {[0, 80, 160, 240, 320].map((x, i) => (
        <path
          key={i}
          d={`M${x} 40 Q${x + 20} 20 ${x + 40} 40 T${x + 80} 40`}
          stroke={stroke}
          strokeWidth="0.8"
          opacity="0.2"
          fill={fillSoft}
          fillOpacity="0.15"
        />
      ))}
    </svg>
  );
}

function ThreadCurve({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="none" aria-hidden>
      <path
        d="M10 40 Q60 10 100 40 T190 35"
        stroke={strokeAccent}
        strokeWidth="0.8"
        strokeDasharray="3 4"
        opacity="0.35"
      />
      <circle cx="100" cy="40" r="3" fill={strokeAccent} fillOpacity="0.2" stroke={strokeAccent} strokeWidth="0.8" />
    </svg>
  );
}

type DecorVariant = "full" | "minimal" | "wheel" | "immersive";

function ImmersiveCorners() {
  const c = "rgba(255,220,180,0.25)";
  return (
    <>
      {(["", "scaleX(-1)", "scaleY(-1)", "scale(-1,-1)"] as const).map((t, i) => (
        <svg
          key={i}
          className={`absolute w-16 h-16 ${i === 0 ? "top-2 left-2" : i === 1 ? "top-2 right-2" : i === 2 ? "bottom-24 left-2" : "bottom-24 right-2"}`}
          viewBox="0 0 64 64"
          fill="none"
          style={{ transform: t }}
          aria-hidden
        >
          <path d="M4 4h20M4 4v20M4 4c8 8 14 14 18 22" stroke={c} strokeWidth="1.2" />
          <circle cx="28" cy="28" r="2" stroke={c} strokeWidth="0.8" />
        </svg>
      ))}
      <span className="absolute top-16 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.6em] text-amber-200/20">
        ✦ 忆青集 ✦
      </span>
    </>
  );
}

export default function Decorations({ variant = "full" }: { variant?: DecorVariant }) {
  const isWheel = variant === "wheel";
  const isMinimal = variant === "minimal";
  const isImmersive = variant === "immersive";

  if (isImmersive) {
    return (
      <div className="decor-layer pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden>
        <ImmersiveCorners />
      </div>
    );
  }

  return (
    <div className="decor-layer pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden>
      {/* 角花双层 */}
      <CornerOrnament className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 opacity-90" />
      <CornerOrnament className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-90" flip="x" />
      <CornerOrnament className="absolute bottom-20 left-0 w-14 h-14 sm:w-16 sm:h-16 opacity-80" flip="y" />
      <CornerOrnament className="absolute bottom-20 right-0 w-14 h-14 sm:w-16 sm:h-16 opacity-80" flip="xy" />

      <VineCorner className="absolute top-12 left-10 w-12 h-12 opacity-50" />
      <VineCorner className="absolute top-12 right-10 w-12 h-12 opacity-50" flip="x" />
      <VineCorner className="absolute bottom-32 left-8 w-10 h-10 opacity-40" flip="y" />
      <VineCorner className="absolute bottom-32 right-8 w-10 h-10 opacity-40" flip="xy" />

      <SidePattern side="left" />
      <SidePattern side="right" />

      <FilmStrip className="absolute left-1 top-1/3 w-4 h-28 opacity-50" vertical />
      <FilmStrip className="absolute right-1 top-1/3 w-4 h-28 opacity-50" vertical />

      {!isMinimal && (
        <>
          <LanternString className="absolute top-1 left-0 right-0 w-full h-9 opacity-70" />
          <ScallopBorder className="absolute top-[100px] left-3 right-3 w-[calc(100%-1.5rem)] h-4" />
          <ScallopBorder className="absolute bottom-[72px] left-3 right-3 w-[calc(100%-1.5rem)] h-4 rotate-180" />

          <CloudPattern className="absolute bottom-16 left-0 right-0 h-12 opacity-80" />
          <ThreadCurve className="absolute top-[38%] left-0 right-0 w-full h-16 opacity-60" />

          <TapeStrip className="absolute top-24 left-6" rotate={-6} />
          <TapeStrip className="absolute top-32 right-8" rotate={8} />
          <TapeStrip className="absolute bottom-28 left-10" rotate={4} />

          <VintageStamp className="absolute top-20 right-4 w-14 h-14" text="忆" />
          <VintageStamp className="absolute bottom-36 left-3 w-12 h-12" text="集" />
          <VintageStamp className="absolute top-[45%] right-1 w-16 h-16 opacity-80" text="story" />

          <FloatingIcons />

          {/* 星点底纹 */}
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 4l4 8 9 1.5-6.5 6.5 1.5 9-8-4.5-8 4.5 1.5-9-6.5-6.5 9-1.5z' fill='%23c45c26'/%3E%3Ccircle cx='12' cy='12' r='1' fill='%23c9b8a4'/%3E%3Ccircle cx='68' cy='24' r='1.2' fill='%23d4a574'/%3E%3Ccircle cx='20' cy='68' r='0.8' fill='%23c9b8a4'/%3E%3C/svg%3E")`,
              backgroundSize: "64px 64px",
            }}
          />
          {/* 斜线纸纹 */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 12px,
                rgba(196, 92, 38, 0.15) 12px,
                rgba(196, 92, 38, 0.15) 13px
              )`,
            }}
          />
        </>
      )}

      {isMinimal && (
        <>
          <CornerOrnament className="absolute top-1 left-1 w-12 h-12 opacity-70" />
          <CornerOrnament className="absolute top-1 right-1 w-12 h-12 opacity-70" flip="x" />
          <FloatingIcons />
          <TapeStrip className="absolute top-16 right-6" rotate={5} />
        </>
      )}

      {isWheel && (
        <>
          <WheelRimTicks className="absolute left-1/2 top-[38%] w-[min(96vw,400px)] h-[min(96vw,400px)] -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute left-1/2 top-[38%] w-[min(72vw,300px)] h-[min(72vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c45c26]/10 decor-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(196,92,38,0.06), transparent, rgba(212,165,116,0.08), transparent)",
            }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-[38%] w-1 h-3 bg-[#c45c26]/25 rounded-full origin-bottom"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-min(42vw,175px))`,
              }}
            />
          ))}
          <span className="decor-label absolute left-1/2 top-[12%] -translate-x-1/2 text-[10px] tracking-[0.5em] text-[#c45c26]/35">
            ✦ 记忆轮盘 ✦
          </span>
        </>
      )}
    </div>
  );
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 opacity-80">
      <span className="text-[#c45c26]/40 text-xs">❧</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9b8a4] to-[#c45c26]/30" />
      {label && (
        <span className="text-[10px] tracking-[0.4em] text-[#6b5f52] shrink-0 px-2 py-0.5 border border-[#e8e3dc] rounded-full bg-[#faf6ef]/80">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#c9b8a4] to-[#c45c26]/30" />
      <span className="text-[#c45c26]/40 text-xs">❧</span>
    </div>
  );
}
