package com.example.tag_service.controller;

import com.example.tag_service.model.Tag;
import com.example.tag_service.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    // Add the tag
    @PostMapping
    public Tag saveTag(@RequestBody Tag tag) {
        return tagService.saveTag(tag);
    }


    // Get all the tags
    @GetMapping
    public List<Tag> allTags(){
        return tagService.getAllTags();
    }

    // Get tag by tag name
    @GetMapping("/{name}")
    public Tag getTagByName(@PathVariable String name){
        return tagService.getTagByName(name);
    }

    // Delete tag by tag name
    @DeleteMapping("/{name}")
    public String deleteTagByName(@PathVariable String name){
        return tagService.deleteByName(name);
    }

}
