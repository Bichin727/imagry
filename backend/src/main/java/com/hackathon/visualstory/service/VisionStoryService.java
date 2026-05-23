package com.hackathon.visualstory.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.visualstory.config.VisualStoryProperties;
import com.hackathon.visualstory.dto.SlideDto;
import com.hackathon.visualstory.dto.StoryResponse;

@Service
public class VisionStoryService {

    private final VisualStoryProperties properties;

    public VisionStoryService(VisualStoryProperties properties) {
        this.properties = properties;
    }

    public StoryResponse generateFromImage(MultipartFile file, String scene) throws IOException {
        String taskId = UUID.randomUUID().toString();
        String normalizedScene = normalizeScene(scene);
        String imageUrl = storeImage(taskId, file);

        if ("mock".equalsIgnoreCase(properties.getVisionProvider())) {
            return buildMockStory(taskId, normalizedScene, imageUrl);
        }

        // TODO Day2: call DashScope / OpenAI vision API using properties.getVisionApiKey()
        return buildMockStory(taskId, normalizedScene, imageUrl);
    }

    public StoryResponse generateFromBase64(String imageBase64, String scene) {
        String taskId = UUID.randomUUID().toString();
        String normalizedScene = normalizeScene(scene);
        String imageUrl = null;

        if ("mock".equalsIgnoreCase(properties.getVisionProvider())) {
            return buildMockStory(taskId, normalizedScene, imageUrl);
        }

        return buildMockStory(taskId, normalizedScene, imageUrl);
    }

    private String storeImage(String taskId, MultipartFile file) throws IOException {
        Path dir = Path.of(properties.getUploadDir(), taskId);
        Files.createDirectories(dir);
        String filename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg";
        Path target = dir.resolve(filename);
        Files.copy(file.getInputStream(), target);
        return "/uploads/" + taskId + "/" + filename;
    }

    private String normalizeScene(String scene) {
        if (scene == null || scene.isBlank()) {
            return "food";
        }
        String s = scene.trim().toLowerCase();
        if ("pet".equals(s) || "travel".equals(s) || "food".equals(s)) {
            return s;
        }
        return "food";
    }

    private StoryResponse buildMockStory(String taskId, String scene, String imageUrl) {
        StoryResponse response = new StoryResponse();
        response.setTaskId(taskId);
        response.setScene(scene);
        response.setImageUrl(imageUrl);

        List<SlideDto> slides = new ArrayList<>();
        switch (scene) {
            case "pet" -> {
                response.setHook("它今天的心情，藏在这一张照片里");
                slides.add(new SlideDto(0, "遇见它", "画面中的小伙伴正在安静陪伴你。", "这一刻，值得被记录下来。"));
                slides.add(new SlideDto(1, "状态解读", "姿态放松，环境安全，适合互动。", "看起来状态不错，可以轻声安抚或陪伴。"));
                slides.add(new SlideDto(2, "今日建议", "保持规律饮食与清洁，记录变化。", "把它写进今日日记，分享给懂你的人。"));
            }
            case "travel" -> {
                response.setHook("风景会说话，你的镜头接住了它");
                slides.add(new SlideDto(0, "打卡瞬间", "构图开阔，主体清晰，氛围到位。", "欢迎来到这一刻的旅行故事。"));
                slides.add(new SlideDto(1, "氛围标签", "适合慢走、拍照、分享。", "光线和色调都很适合做成纪念轮播。"));
                slides.add(new SlideDto(2, "延伸灵感", "可补充当地小知识或下一站推荐。", "把照片变成可传播的旅行卡片。"));
            }
            default -> {
                response.setHook("这道菜的不只味道，还有故事");
                slides.add(new SlideDto(0, "识别结果", "主体是一道日常美食，色泽诱人。", "先别急着吃，听听它背后的故事。"));
                slides.add(new SlideDto(1, "风味解读", "火候与配色都不错，适合分享。", "可以搭配清淡饮品，口感更平衡。"));
                slides.add(new SlideDto(2, "两步做法", "备料、快炒、出锅三步即可完成。", "想动手试试？下一页就是迷你烹饪指南。"));
            }
        }

        response.setSlides(slides);
        return response;
    }
}
