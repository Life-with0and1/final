package com.example.syllabus_service.service;

import com.example.syllabus_service.feign.TagClient;
import com.example.syllabus_service.model.Syllabus;
import com.example.syllabus_service.model.Tag;
import com.example.syllabus_service.repository.SyllabusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SyllabusService {

    @Autowired
    private SyllabusRepository syllabusRepository;

    @Autowired
    private TagClient tagClient;

    // Add syllabus
    public Syllabus addSyllabus(Syllabus syllabus) {
        Syllabus createdSyllabus = syllabusRepository.save(syllabus);
        for (String tagName : syllabus.getTags()) {
            Tag tag;
            try {
                tag = tagClient.getTagByName(tagName);
                if (!tag.getSyllabusIds().contains(createdSyllabus.getId())) {
                    tag.getSyllabusIds().add(createdSyllabus.getId());
                }
            } catch (Exception e) {
                tag = new Tag();
                tag.setName(tagName);
                tag.setSyllabusIds(new ArrayList<>(List.of(createdSyllabus.getId())));
            }
            tagClient.saveTag(tag);
        }
        return createdSyllabus;
    }

    // Get all syllabuses
    public List<Syllabus> getAllSyllabus() {
        return syllabusRepository.findAll();
    }

    // Update Syllabus
    public Syllabus updateSyllabus(String id, Syllabus syllabus) {
        Optional<Syllabus> existing = syllabusRepository.findById(id);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Syllabus not found with this id");
        }
        Syllabus existingSyllabus = existing.get();
        List<String> oldTags = existingSyllabus.getTags();
        List<String> newTags = syllabus.getTags();
        for (String oldTagName : oldTags) {
            if (!newTags.contains(oldTagName)) {
                try {
                    Tag tag = tagClient.getTagByName(oldTagName);
                    tag.getSyllabusIds().remove(id);
                    if(tag.getSyllabusIds().size()==0) tagClient.deleteTagByName(oldTagName);
                    else tagClient.saveTag(tag);
                } catch (Exception e) {}
            }
        }
        for (String newTagName : newTags) {
            Tag tag;
            try {
                tag = tagClient.getTagByName(newTagName);
                if (!tag.getSyllabusIds().contains(id)) {
                    tag.getSyllabusIds().add(id);
                }
            } catch (Exception e) {
                tag = new Tag();
                tag.setName(newTagName);
                tag.setSyllabusIds(new ArrayList<>(List.of(id)));
            }
            tagClient.saveTag(tag);
        }
        existingSyllabus.setSubject(syllabus.getSubject());
        existingSyllabus.setDescription(syllabus.getDescription());
        existingSyllabus.setTopics(syllabus.getTopics());
        existingSyllabus.setDuration(syllabus.getDuration());
        existingSyllabus.setTags(newTags);

        return syllabusRepository.save(existingSyllabus);
    }

    // Delete Syllabus
    public String deleteSyllabus(String id) {
        Optional<Syllabus> existing = syllabusRepository.findById(id);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Syllabus not found with ID: " + id);
        }
        Syllabus syllabus = existing.get();
        for (String tagName : syllabus.getTags()) {
            try {
                Tag tag = tagClient.getTagByName(tagName);
                tag.getSyllabusIds().remove(id);
                if(tag.getSyllabusIds().size()==0) tagClient.deleteTagByName(tag.getName());
                else tagClient.saveTag(tag);
            } catch (Exception ignored) {}
        }

        syllabusRepository.deleteById(id);
        return "Syllabus deleted successfully.";
    }

    // Get Syllabus By Id
    public Optional<Syllabus> getSyllabusById(String id) {
        return syllabusRepository.findById(id);
    }

    // Get Tag Names By Syllabus Id
    public List<String> getTagsBySyllabusId(String id) {
        Optional<Syllabus> existing = syllabusRepository.findById(id);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Syllabus not found with this id.");
        }
        return existing.get().getTags();
    }
}
