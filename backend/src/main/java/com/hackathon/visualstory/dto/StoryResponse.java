package com.hackathon.visualstory.dto;

import java.util.List;

public class StoryResponse {

    private String taskId;
    private String hook;
    private String scene;
    private String imageUrl;
    private List<SlideDto> slides;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getHook() {
        return hook;
    }

    public void setHook(String hook) {
        this.hook = hook;
    }

    public String getScene() {
        return scene;
    }

    public void setScene(String scene) {
        this.scene = scene;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<SlideDto> getSlides() {
        return slides;
    }

    public void setSlides(List<SlideDto> slides) {
        this.slides = slides;
    }
}
