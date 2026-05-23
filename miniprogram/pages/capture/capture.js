const api = require("../../services/api");

Page({
  data: {
    scene: "food",
    preview: "",
    loading: false
  },

  onLoad(options) {
    this.setData({ scene: options.scene || "food" });
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const path = res.tempFiles[0].tempFilePath;
        this.setData({ preview: path });
      }
    });
  },

  analyze() {
    if (!this.data.preview) return;
    this.setData({ loading: true });
    api.uploadStory(this.data.preview, this.data.scene)
      .then((story) => {
        getApp().globalData.lastStory = story;
        wx.navigateTo({
          url: `/pages/player/player?taskId=${story.taskId}`
        });
      })
      .catch((err) => {
        wx.showToast({ title: err.message || "分析失败", icon: "none" });
      })
      .finally(() => this.setData({ loading: false }));
  }
});
