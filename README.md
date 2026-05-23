# Visual Story — 视觉故事轮播（黑客松 · 赛道二）

拍一张图 → AI 视觉理解 → 生成图文轮播文案 → TTS 配音播放。

## 仓库结构

```text
visual-story-hackathon/
├── backend/          # Spring Boot API
├── miniprogram/      # 微信小程序
└── docs/             # 答辩与 API 说明
```

## 快速启动

### 后端

```bash
cd backend
# 配置环境变量（见 backend/.env.example）
mvn spring-boot:run
```

默认：`http://127.0.0.1:8080`

### 小程序

1. 微信开发者工具 → 导入 `miniprogram/`
2. `miniprogram/config.js` 中设置 `apiBaseUrl`
3. 开发阶段勾选「不校验合法域名」

## 核心 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/vision/story` | 上传图片，返回轮播 slides |
| POST | `/api/tts/speak` | 文本转语音，返回音频 URL |
| GET | `/api/health` | 健康检查 |

详见 [docs/API.md](docs/API.md)

## 环境变量

| 变量 | 说明 |
|------|------|
| `VISION_API_KEY` | 多模态大模型 Key（通义/豆包等，接入时填写） |
| `VISION_PROVIDER` | `mock`（默认演示） / `dashscope` / `openai` |

## 黑客松演示建议

1. 默认 `mock` 模式无需 Key 即可完整演示
2. 现场切换 `food` / `pet` / `travel` 场景
3. 答辩话术：「视觉搜索 + 语音解说，所见即故事」

## License

MIT
