package com.example.syllabus_service.model;

import lombok.Data;

import java.util.List;

@Data
public class Tag {
    private String id;
    private String name;
    private List<String> syllabusIds;
}
