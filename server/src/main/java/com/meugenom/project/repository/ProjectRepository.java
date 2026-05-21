package com.meugenom.project.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.meugenom.project.model.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    List<Project> findAllByOrderByDateDesc();
}