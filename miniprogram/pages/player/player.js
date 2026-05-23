const api = require("../../services/api");

Page({
  data: {
    story: null,
    ttsHint: ""
  },

  onLoad() {
    const story = getApp().globalData.lastStory;
    if (story) {
      this.setData({ story });
    } else {
      wx.showToast({ title: "无故事数据", icon: "none" });
    }
  },

  playNarration() {
    const story = this.data.story;
    if (!story || !story.slides || !story.slides.length) return;
    const text = story.slides.map((s) => s.narration).join("。");
    api.speak(text)
      .then((res) => {
        this.setData({
          ttsHint: `配音就绪（${res.durationMs}ms）${res.message || ""}`
        });
        wx.showToast({ title: "TTS 已请求", icon: "success" });
        // Day2: wx.createInnerAudioContext() with full audioUrl
      })
      .catch((err) => {
        wx.showToast({ title: err.message || "TTS 失败", icon: "none" });
      });
  }
});
