package com.example.syllabus_service.feign;

import com.example.syllabus_service.model.Tag;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "tag-service", url = "http://localhost:8082")
public interface TagClient {

    @PostMapping("/tag")
    Tag saveTag(@RequestBody Tag tag);

    @GetMapping("/tag/{name}")
    Tag getTagByName(@PathVariable("name") String name);

    @DeleteMapping("/tag/{name}")
    String deleteTagByName(@PathVariable String name);
}
