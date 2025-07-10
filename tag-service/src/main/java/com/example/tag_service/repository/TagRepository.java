package com.example.tag_service.repository;

import com.example.tag_service.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TagRepository extends MongoRepository<Tag,String> {
    Optional<Tag> findByName(String name);
}
