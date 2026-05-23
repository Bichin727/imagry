package com.hackathon.visualstory.dto;

public class TtsResponse {

    private String audioUrl;
    private long durationMs;
    private String message;

    public TtsResponse() {
    }

    public TtsResponse(String audioUrl, long durationMs, String message) {
        this.audioUrl = audioUrl;
        this.durationMs = durationMs;
        this.message = message;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public long getDurationMs() {
        return durationMs;
    }

    public void setDurationMs(long durationMs) {
        this.durationMs = durationMs;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
