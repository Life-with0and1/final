package com.example.tag_service.service;

import com.example.tag_service.model.Tag;
import com.example.tag_service.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    // Add Tag
    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    // Get All tags
    public List<Tag> getAllTags(){
        return tagRepository.findAll();
    }

    // Get Tag By Name
    public Tag getTagByName(String name){
        Optional<Tag> tag = tagRepository.findByName(name);
        if(tag.isEmpty()){
            throw new IllegalArgumentException("Tag with such name not found");
        }
        return tag.get();
    }

    //Delete By Name
    public String deleteByName(String name){
        Optional<Tag> existingTag = tagRepository.findByName(name);
        if(existingTag.isEmpty()){
            throw new IllegalArgumentException("Tag with such name not found");
        }
        Tag tag = existingTag.get();
        tagRepository.deleteById(tag.getId());
        return "Tag deleted successfully";
    }

}
