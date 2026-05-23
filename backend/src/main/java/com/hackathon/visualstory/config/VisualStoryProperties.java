package com.hackathon.visualstory.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "visual-story")
public class VisualStoryProperties {

    private String visionProvider = "mock";
    private String visionApiKey = "";
    private String uploadDir = "uploads";

    public String getVisionProvider() {
        return visionProvider;
    }

    public void setVisionProvider(String visionProvider) {
        this.visionProvider = visionProvider;
    }

    public String getVisionApiKey() {
        return visionApiKey;
    }

    public void setVisionApiKey(String visionApiKey) {
        this.visionApiKey = visionApiKey;
    }

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}
