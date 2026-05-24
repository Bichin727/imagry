import { STYLE_OPTIONS, type StyleOption } from "@/lib/types"
export default function StyleSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (<div className="space-y-2">
    <label className="text-sm font-medium text-[#6b6560]">选择漫画风格</label>
    <div className="grid grid-cols-2 gap-2">
      {STYLE_OPTIONS.map((s: StyleOption) => (
        <button key={s.id} onClick={() => onSelect(s.id)}
          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 paper-panel ${selected===s.id?"border-[#c45c26] bg-[#faf0e0] shadow-md":"border-[#ddd0c0] hover:border-[#c9b8a4]"}`}>
          <span className="text-2xl">{s.emoji}</span>
          <div className="text-left"><div className="font-medium text-sm">{s.name}</div><div className="text-xs text-[#6b6560]">{s.description}</div></div>
        </button>))}
    </div>
  </div>)
}
