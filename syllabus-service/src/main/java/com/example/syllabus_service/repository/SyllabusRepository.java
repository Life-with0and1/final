package com.example.syllabus_service.repository;

import com.example.syllabus_service.model.Syllabus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyllabusRepository extends MongoRepository<Syllabus, String> {
}
