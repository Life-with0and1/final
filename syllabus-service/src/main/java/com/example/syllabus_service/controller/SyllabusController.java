package com.example.syllabus_service.controller;

import com.example.syllabus_service.model.Syllabus;
import com.example.syllabus_service.service.SyllabusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/syllabus")
public class SyllabusController {

    @Autowired
    private SyllabusService syllabusService;

    // Add Syllabus
    @PostMapping
    public Syllabus addSyllabus(@RequestBody Syllabus syllabus) {
        return syllabusService.addSyllabus(syllabus);
    }

    // Get All Syllabus
    @GetMapping
    public List<Syllabus> getAllSyllabus() {
        return syllabusService.getAllSyllabus();
    }

    // Get Syllabus By Id
    @GetMapping("/{id}")
    public Syllabus getSyllabusById(@PathVariable String id) {
        return syllabusService.getSyllabusById(id)
                .orElseThrow(() -> new IllegalArgumentException("Syllabus not found with this id."));
    }

    // Update syllabus
    @PutMapping("/{id}")
    public Syllabus updateSyllabus(@RequestBody Syllabus syllabus, @PathVariable String id) {
        return syllabusService.updateSyllabus(id, syllabus);
    }

    // Delete Syllabus
    @DeleteMapping("/{id}")
    public String deleteSyllabus(@PathVariable String id) {
        return syllabusService.deleteSyllabus(id);
    }

    // Get Tags By Syllabus Id
    @GetMapping("/{id}/tags")
    public List<String> getTagsBySyllabusId(@PathVariable String id) {
        return syllabusService.getTagsBySyllabusId(id);
    }
}
