package com.hackathon.visualstory.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.visualstory.dto.TtsRequest;
import com.hackathon.visualstory.dto.TtsResponse;
import com.hackathon.visualstory.service.TtsService;

@RestController
@RequestMapping("/api/tts")
public class TtsController {

    private final TtsService ttsService;

    public TtsController(TtsService ttsService) {
        this.ttsService = ttsService;
    }

    @PostMapping("/speak")
    public TtsResponse speak(@Valid @RequestBody TtsRequest request) {
        return ttsService.synthesize(request.getText(), request.getVoice());
    }
}
