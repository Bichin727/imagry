# 2 天开发路线图

## Day 1

- [x] 项目骨架 + mock 视觉故事 API
- [x] 小程序三页流程（首页 / 拍摄 / 轮播）
- [ ] 接入通义千问-VL 或豆包多模态（替换 `VisionStoryService` mock）
- [ ] 真机联调 `config.js` 域名

## Day 2

- [ ] 接入阿里云 / 腾讯 TTS，返回真实 mp3
- [ ] 播放器 `InnerAudioContext` 同步轮播
- [ ] 分享海报（长图）可选
- [ ] 答辩 Demo 录屏 30s

## 接入视觉 API 位置

`backend/.../service/VisionStoryService.java` → 非 mock 分支

## 接入 TTS 位置

`backend/.../service/TtsService.java` → `synthesize()`
