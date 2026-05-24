# Visual Story — 视觉故事轮播（黑客松 · 赛道二）

拍一张图 → AI 视觉理解 → 生成图文轮播文案 → TTS 配音播放。

---

## 仓库结构

```text
├── backend/          # Spring Boot API（视觉识故事 + TTS）
├── miniprogram/      # 微信小程序
├── src/              # 忆青集 Next.js Web 前端（游园会扫码体验）
├── public/           # 静态资源
└── docs/             # 答辩与 API 说明
```

---

## 统一后端（Web + 小程序）

```text
忆青集 Web (Next.js)  ──→  Spring Boot :8080
微信小程序            ──→  Spring Boot :8080   （同一套 API）
```

| 调用方 | 接口 |
|--------|------|
| Web `/api/generate` | 转发 `POST /api/vision/story` + `POST /api/tts/speak` |
| 小程序 `services/api.js` | 直接 `POST /api/vision/story`、`/api/tts/speak` |

启动顺序：**先 `mvn spring-boot:run`，再 `npm run dev`**。

---

## 忆青集 Web（游园会扫码即用）

> 旧物不言 · AI 代它说

为旧物拍一段漫画故事视频，无需安装，扫码即用。

### 页面流程

| 路由 | 说明 |
|------|------|
| `/` | 首页视频卡片流 + 创建按钮 |
| `/create` | 拍照 + 故事输入 + 4种风格选择 |
| `/generating` | AI 进度动画（分析→剧本→绘画→配音）|
| `/video/[id]` | 全屏播放 + 点赞/我想要/分享 |

### 四种视觉风格
🎌 日漫风 · 🏮 水墨国风 · 👾 像素复古 · 📖 温暖绘本

```bash
# 终端 1
cd backend && mvn spring-boot:run

# 终端 2
cp .env.example .env.local   # 可选
npm install && npm run dev   # http://localhost:3000
```

---

## 快速启动

### 后端

```bash
cd backend
mvn spring-boot:run
# http://127.0.0.1:8080
```

### 小程序

1. 微信开发者工具 → 导入 `miniprogram/`
2. `miniprogram/config.js` 中设置 `apiBaseUrl`

---

## 核心 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/vision/story` | 上传图片，返回轮播 slides |
| POST | `/api/tts/speak` | 文本转语音，返回音频 URL |
| GET | `/api/health` | 健康检查 |

详见 [docs/API.md](docs/API.md)

---

## 环境变量

| 变量 | 说明 |
|------|------|
| `VISION_API_KEY` | 多模态大模型 Key |
| `VISION_PROVIDER` | `mock`（默认）/ `dashscope` / `openai` |

---

## 黑客松演示

1. Mock 模式无需 Key 即可完整演示
2. 游园会：扫码体验忆青集 Web 版，无需安装
3. 答辩话术：「视觉搜索 + 语音解说，所见即故事」

## License

MIT
