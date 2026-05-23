# API 说明

## GET /api/health

```json
{ "status": "ok", "service": "visual-story" }
```

## POST /api/vision/story

`multipart/form-data`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | file | 是* | 图片文件 |
| scene | string | 否 | `food` / `pet` / `travel`，默认 `food` |

*也可 JSON：`{ "imageBase64": "...", "scene": "food" }`

### 响应

```json
{
  "taskId": "uuid",
  "hook": "一句吸引文案",
  "scene": "food",
  "slides": [
    {
      "index": 0,
      "title": "识别结果",
      "caption": "画面描述",
      "narration": "配音旁白"
    }
  ]
}
```

## POST /api/tts/speak

```json
{ "text": "要朗读的旁白", "voice": "default" }
```

### 响应

```json
{
  "audioUrl": "/api/tts/audio/xxx.mp3",
  "durationMs": 3200
}
```
