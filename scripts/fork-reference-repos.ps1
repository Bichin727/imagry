# 将赛道二相关参考项目 fork 到 GitHub 账号 cccyyylll888
# 使用前请先登录: gh auth login

$ErrorActionPreference = "Stop"
$gh = if (Get-Command gh -ErrorAction SilentlyContinue) { "gh" } else { "$env:TEMP\gh-cli\bin\gh.exe" }

if (-not (Test-Path $gh) -and $gh -ne "gh") {
    Write-Host "未找到 gh，请先安装 GitHub CLI 或运行 fork 脚本前下载 portable gh" -ForegroundColor Red
    exit 1
}

& $gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "请先登录 GitHub:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor Cyan
    exit 1
}

$repos = @(
    @{ owner = "SannidhyaDas";      name = "AI-StoryWeaver";  note = "多图+Gemini+TTS，最接近产品 Demo" },
    @{ owner = "JosephAssaker";     name = "ImageToStory";    note = "拍图→理解→旁白→视频" },
    @{ owner = "sssingh";           name = "pic-to-story";    note = "BLIP+GPT 最小闭环" },
    @{ owner = "QwenLM";            name = "Qwen-VL";         note = "通义千问-VL 官方" },
    @{ owner = "QwenLM";            name = "Qwen3-VL";        note = "Qwen3 视觉语言模型" },
    @{ owner = "LLaVA-VL";          name = "LLaVA-NeXT";      note = "开源 VLM + Demo" },
    @{ owner = "TencentARC";        name = "SEED-Story";      note = "图文交错长故事" },
    @{ owner = "haoningwu3639";     name = "StoryGen";        note = "CVPR 视觉叙事" },
    @{ owner = "daniel3303";        name = "StoryReasoning";  note = "Qwen2.5-VL 续写 grounding" },
    @{ owner = "chn-lee-yumi";      name = "MaterialSearch";  note = "语义搜图/以图搜图" }
)

Write-Host "`n开始 fork 到账号 cccyyylll888 ...`n" -ForegroundColor Green

foreach ($r in $repos) {
    $full = "$($r.owner)/$($r.name)"
    Write-Host "→ $full  ($($r.note))" -ForegroundColor Cyan
    & $gh repo fork "$full" --clone=false 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ https://github.com/cccyyylll888/$($r.name)`n" -ForegroundColor Green
    } else {
        Write-Host "  ✗ fork 失败（可能已 fork 过）`n" -ForegroundColor Yellow
    }
}

Write-Host "完成。查看: https://github.com/cccyyylll888?tab=repositories" -ForegroundColor Green
