package com.hackathon.visualstory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TtsRequest {

    @NotBlank
    @Size(max = 2000)
    private String text;

    private String voice = "default";

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getVoice() {
        return voice;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }
}
