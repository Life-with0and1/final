package com.example.syllabus_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document(collection = "syllabus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Syllabus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private String subject;

    private String description;

    private List<String> topics;

    private String duration;

    private List<String> tags;

}
