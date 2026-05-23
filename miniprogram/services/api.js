const app = getApp();

function getBaseUrl() {
  return (app && app.globalData.apiBaseUrl) || "http://127.0.0.1:8080/api";
}

function uploadStory(filePath, scene) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${getBaseUrl()}/vision/story`,
      filePath,
      name: "file",
      formData: { scene },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(res.data));
          } catch (e) {
            reject(new Error("invalid json"));
          }
        } else {
          reject(new Error(res.data || `HTTP ${res.statusCode}`));
        }
      },
      fail: reject
    });
  });
}

function speak(text, voice = "default") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${getBaseUrl()}/tts/speak`,
      method: "POST",
      header: { "content-type": "application/json" },
      data: { text, voice },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error((res.data && res.data.error) || `HTTP ${res.statusCode}`));
        }
      },
      fail: reject
    });
  });
}

module.exports = { uploadStory, speak };
