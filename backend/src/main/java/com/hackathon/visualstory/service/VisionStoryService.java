package com.hackathon.visualstory.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.visualstory.config.VisualStoryProperties;
import com.hackathon.visualstory.dto.SlideDto;
import com.hackathon.visualstory.dto.StoryResponse;

@Service
public class VisionStoryService {

    private static final Map<String, String> STYLE_LABELS = Map.of(
            "manga", "日漫风",
            "ink", "水墨国风",
            "pixel", "像素复古",
            "warm", "温暖绘本");

    private final VisualStoryProperties properties;

    public VisionStoryService(VisualStoryProperties properties) {
        this.properties = properties;
    }

    public StoryResponse generateFromImage(MultipartFile file, String scene, String userStory, String style)
            throws IOException {
        String taskId = UUID.randomUUID().toString();
        String normalizedScene = normalizeScene(scene);
        String imageUrl = storeImage(taskId, file);
        return resolveStory(taskId, normalizedScene, imageUrl, userStory, style);
    }

    public StoryResponse generateFromBase64(String imageBase64, String scene, String userStory, String style) {
        String taskId = UUID.randomUUID().toString();
        String normalizedScene = normalizeScene(scene);
        return resolveStory(taskId, normalizedScene, null, userStory, style);
    }

    private StoryResponse resolveStory(String taskId, String scene, String imageUrl, String userStory, String style) {
        if ("mock".equalsIgnoreCase(properties.getVisionProvider())) {
            return buildMockStory(taskId, scene, imageUrl, userStory, style);
        }
        // TODO: real vision API
        return buildMockStory(taskId, scene, imageUrl, userStory, style);
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
            return "relic";
        }
        String s = scene.trim().toLowerCase();
        if ("pet".equals(s) || "travel".equals(s) || "food".equals(s) || "relic".equals(s)) {
            return s;
        }
        return "relic";
    }

    private String styleLabel(String styleKey) {
        if (styleKey == null || styleKey.isBlank()) {
            return "温暖绘本";
        }
        return STYLE_LABELS.getOrDefault(styleKey.trim().toLowerCase(), styleKey);
    }

    private StoryResponse buildMockStory(
            String taskId, String scene, String imageUrl, String userStory, String styleKey) {
        StoryResponse response = new StoryResponse();
        response.setTaskId(taskId);
        response.setScene(scene);
        response.setImageUrl(imageUrl);

        String styleName = styleLabel(styleKey);
        String narrative = userStory != null ? userStory.trim() : "";
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
            case "food" -> {
                response.setHook("这道菜的不只味道，还有故事");
                slides.add(new SlideDto(0, "识别结果", "主体是一道日常美食，色泽诱人。", "先别急着吃，听听它背后的故事。"));
                slides.add(new SlideDto(1, "风味解读", "火候与配色都不错，适合分享。", "可以搭配清淡饮品，口感更平衡。"));
                slides.add(new SlideDto(2, "两步做法", "备料、快炒、出锅三步即可完成。", "想动手试试？下一页就是迷你烹饪指南。"));
            }
            default -> buildRelicSlides(response, slides, narrative, styleName);
        }

        response.setSlides(slides);
        return response;
    }

    private void buildRelicSlides(
            StoryResponse response, List<SlideDto> slides, String userStory, String styleName) {
        if (userStory.isEmpty()) {
            response.setHook("旧物不言 · AI 代它说");
            slides.add(new SlideDto(0, "初见旧物", "照片里是一件承载时光的老物件。", "它沉默地守在那里，等待被倾听。"));
            slides.add(new SlideDto(1, "画风演绎", "将以「" + styleName + "」呈现它的故事。", "每一道纹理，都是一段可以讲述的记忆。"));
            slides.add(new SlideDto(2, "记忆收束", "把故事留给懂你的人。", "分享出去，让旧物再次被看见。"));
            return;
        }

        String hook = userStory.length() > 24 ? userStory.substring(0, 24) + "…" : userStory;
        response.setHook(hook);

        String itemGuess = "旧物";
        if (userStory.contains("收音机")) {
            itemGuess = "收音机";
        } else if (userStory.contains("缝纫机")) {
            itemGuess = "缝纫机";
        } else if (userStory.contains("梳")) {
            itemGuess = "梳子";
        } else if (userStory.length() >= 4) {
            itemGuess = userStory.substring(0, Math.min(8, userStory.length()));
        }

        slides.add(new SlideDto(0, "它的名字", "关于「" + itemGuess + "」的一张照片。", userStory));
        slides.add(new SlideDto(
                1,
                styleName + "叙事",
                "AI 将以「" + styleName + "」把记忆变成可传播的漫画故事。",
                "画面会围绕你写下的细节展开。"));
        slides.add(new SlideDto(
                2,
                "配音预告",
                "旁白将用温柔的声音，把故事讲给刷到的人听。",
                userStory.length() > 60 ? userStory.substring(0, 60) + "…" : userStory));
    }
}
