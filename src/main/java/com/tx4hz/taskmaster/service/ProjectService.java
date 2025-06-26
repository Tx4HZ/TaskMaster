package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.CreateProjectDTO;
import com.tx4hz.taskmaster.dto.ProjectDTO;
import com.tx4hz.taskmaster.dto.UserDTO;
import com.tx4hz.taskmaster.model.Project;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.ProjectRepository;
import com.tx4hz.taskmaster.repository.UserRepository;
import com.tx4hz.taskmaster.service.mapper.ProjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMapper = projectMapper;
    }

    public ProjectDTO createProject(CreateProjectDTO createProjectDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));

        Project project = projectMapper.toEntity(createProjectDTO, owner);
        Project savedProject = projectRepository.save(project);
        return projectMapper.toDTO(savedProject);
    }
}
