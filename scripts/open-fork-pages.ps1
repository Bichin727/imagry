# 在浏览器中打开各项目的 Fork 页面（网络/API 不可用时用手动 fork）
$repos = @(
    "SannidhyaDas/AI-StoryWeaver",
    "JosephAssaker/ImageToStory",
    "sssingh/pic-to-story",
    "QwenLM/Qwen-VL",
    "QwenLM/Qwen3-VL",
    "LLaVA-VL/LLaVA-NeXT",
    "TencentARC/SEED-Story",
    "haoningwu3639/StoryGen",
    "daniel3303/StoryReasoning",
    "chn-lee-yumi/MaterialSearch"
)

Write-Host "将在浏览器打开 Fork 页面，请在每个页面点击 Create fork`n" -ForegroundColor Yellow
foreach ($r in $repos) {
    $url = "https://github.com/$r/fork"
    Write-Host "→ $url"
    Start-Process $url
    Start-Sleep -Seconds 2
}

Write-Host "`n完成后查看: https://github.com/cccyyylll888?tab=repositories" -ForegroundColor Green
