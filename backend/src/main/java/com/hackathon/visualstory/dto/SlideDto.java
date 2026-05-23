package com.hackathon.visualstory.dto;

public class SlideDto {

    private int index;
    private String title;
    private String caption;
    private String narration;

    public SlideDto() {
    }

    public SlideDto(int index, String title, String caption, String narration) {
        this.index = index;
        this.title = title;
        this.caption = caption;
        this.narration = narration;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getNarration() {
        return narration;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }
}
