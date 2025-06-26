package com.tx4hz.taskmaster.repository;

import com.tx4hz.taskmaster.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
