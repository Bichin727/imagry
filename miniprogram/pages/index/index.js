Page({
  data: { scene: "food" },

  pickScene(e) {
    const scene = e.currentTarget.dataset.scene;
    this.setData({ scene });
    wx.setStorageSync("scene", scene);
  },

  goCapture() {
    wx.navigateTo({ url: `/pages/capture/capture?scene=${this.data.scene}` });
  },

  onShow() {
    const scene = wx.getStorageSync("scene");
    if (scene) this.setData({ scene });
  }
});
