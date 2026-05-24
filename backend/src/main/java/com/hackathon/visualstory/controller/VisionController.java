package com.hackathon.visualstory.controller;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.visualstory.dto.StoryResponse;
import com.hackathon.visualstory.service.VisionStoryService;

@RestController
@RequestMapping("/api/vision")
public class VisionController {

    private final VisionStoryService visionStoryService;

    public VisionController(VisionStoryService visionStoryService) {
        this.visionStoryService = visionStoryService;
    }

    @PostMapping(value = "/story", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public StoryResponse storyFromFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "scene", defaultValue = "relic") String scene,
            @RequestParam(value = "userStory", required = false) String userStory,
            @RequestParam(value = "style", required = false) String style) throws Exception {
        return visionStoryService.generateFromImage(file, scene, userStory, style);
    }

    @PostMapping(value = "/story", consumes = MediaType.APPLICATION_JSON_VALUE)
    public StoryResponse storyFromJson(@RequestBody Map<String, String> body) {
        String imageBase64 = body.get("imageBase64");
        String scene = body.getOrDefault("scene", "relic");
        String userStory = body.get("userStory");
        String style = body.get("style");
        return visionStoryService.generateFromBase64(imageBase64, scene, userStory, style);
    }
}
