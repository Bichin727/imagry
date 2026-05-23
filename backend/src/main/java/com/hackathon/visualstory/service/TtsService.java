package com.hackathon.visualstory.service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.hackathon.visualstory.config.VisualStoryProperties;
import com.hackathon.visualstory.dto.TtsResponse;

@Service
public class TtsService {

    private final VisualStoryProperties properties;

    public TtsService(VisualStoryProperties properties) {
        this.properties = properties;
    }

    /**
     * MVP: returns placeholder audio metadata. Replace with Aliyun/Tencent TTS on Day2.
     */
    public TtsResponse synthesize(String text, String voice) {
        String id = UUID.randomUUID().toString().replace("-", "");
        long estimatedMs = Math.min(15000, Math.max(1500, text.length() * 120L));

        try {
            Path audioDir = Path.of(properties.getUploadDir(), "tts");
            Files.createDirectories(audioDir);
            Path marker = audioDir.resolve(id + ".txt");
            String body = "TTS placeholder\nvoice=" + voice + "\ntext=" + text;
            Files.writeString(marker, body, StandardCharsets.UTF_8);
        } catch (Exception ignored) {
            // demo mode: still return response without file
        }

        return new TtsResponse(
                "/api/tts/audio/" + id,
                estimatedMs,
                "TTS stub — integrate cloud TTS in TtsService.synthesize()");
    }
}
