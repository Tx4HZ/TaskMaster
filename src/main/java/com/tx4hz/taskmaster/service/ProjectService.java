package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.CreateProjectDTO;
import com.tx4hz.taskmaster.dto.ProjectDTO;
import com.tx4hz.taskmaster.dto.UserDTO;
import com.tx4hz.taskmaster.model.Profile;
import com.tx4hz.taskmaster.model.Project;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.ProjectRepository;
import com.tx4hz.taskmaster.repository.UserRepository;
import com.tx4hz.taskmaster.service.mapper.ProjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for managing project-related operations, including creation, updating, retrieval, and deletion of projects.
 * Provides methods to handle project ownership, participation, and user associations.
 */
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

    /**
     * Creates a new project for the authenticated user.
     *
     * @param createProjectDTO DTO containing project creation data
     * @return ProjectDTO representing the created project
     * @throws EntityNotFoundException if the user is not found
     */
    @Transactional
    public ProjectDTO createProject(CreateProjectDTO createProjectDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));

        Project project = projectMapper.toEntity(createProjectDTO, owner);
        Project savedProject = projectRepository.save(project);
        return projectMapper.toDTO(savedProject);
    }

    /**
     * Updates an existing project owned by the authenticated user.
     *
     * @param id              the ID of the project to update
     * @param updateProjectDTO the DTO containing updated project data
     * @return the DTO representing the updated project
     * @throws EntityNotFoundException if the user or project is not found
     * @throws IllegalStateException   if the authenticated user is not the project owner
     */
    @Transactional
    public ProjectDTO updateProject(Long id, CreateProjectDTO updateProjectDTO) {
        User owner = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        Project project = projectRepository.findByOwner(owner)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found for user: "));

        if (!project.getOwner().getId().equals(owner.getId())) {
            throw new IllegalStateException("Access denied: user is not the project owner");
        }

        updateProjectFields(project, updateProjectDTO);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toDTO(updatedProject);
    }

    /**
     * Deletes a project owned by the authenticated user.
     *
     * @param id the ID of the project to delete
     * @throws EntityNotFoundException if the user or project is not found
     * @throws IllegalStateException   if the authenticated user is not the project owner
     */
    @Transactional
    public void deleteProject(Long id) {
        User owner = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        if (!project.getOwner().getId().equals(owner.getId())) {
            throw new IllegalStateException("Access denied: user is not the project owner");
        }

        projectRepository.delete(project);
    }

    /**
     * Retrieves a project by its ID if the authenticated user is associated with it.
     *
     * @param id the ID of the project to retrieve
     * @return the DTO representing the project
     * @throws EntityNotFoundException if the user or project is not found
     * @throws AccessDeniedException   if the user is not associated with the project
     */
    public ProjectDTO getProject (Long id) throws AccessDeniedException {
        User user = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (isUserAssociatedWithProject(project, user, true)) {
            return projectMapper.toDTO(project);
        } else {
            throw new AccessDeniedException("User does not have permission to access this project");
        }
    }

    /**
     * Retrieves all projects owned by the authenticated user.
     *
     * @return a list of DTOs representing projects owned by the user
     * @throws EntityNotFoundException if the user is not found
     */
    public List<ProjectDTO> getProjectsOwnedByUser() {
        User user = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        return projectRepository.findByOwnerId(user.getId())
                .stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves all projects where the authenticated user is a participant.
     *
     * @return a list of DTOs representing projects where the user is a participant
     * @throws EntityNotFoundException if the user is not found
     */
    public List<ProjectDTO> getProjectsWithUserAsParticipant() {
        User user = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        return projectRepository.findByUsersId(user.getId())
                .stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves all projects where the authenticated user is either an owner or a participant.
     *
     * @return a list of DTOs representing all projects associated with the user
     * @throws EntityNotFoundException if the user is not found
     */
    public List<ProjectDTO> getAllProjectsForUser() {
        User user = userRepository.findByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found with username or access denied"));

        return projectRepository.findAllProjectsForUser(user.getId())
                .stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Checks if a user is associated with a project, either as an owner or a participant.
     *
     * @param project the project to check
     * @param user   the user to verify
     * @return true if the user is associated with the project, false otherwise
     */
    private boolean isUserAssociatedWithProject(Project project, User user) {
        return isUserAssociatedWithProject(project, user, false);
    }

    /**
     * Checks if a user is associated with a project, with an option to check only ownership.
     *
     * @param project the project to check
     * @param user    the user to verify
     * @param isOwner if true, checks only if the user is the project owner
     * @return true if the user is associated with the project (or is the owner, if isOwner is true), false otherwise
     */
    private boolean isUserAssociatedWithProject(Project project, User user, Boolean isOwner) {
        if (user == null) {
            return false;
        }

        if (isOwner) {
            return user.equals(project.getOwner());
        }

        return project.getUsers().contains(user) || user.equals(project.getOwner());
    }

    /**
     * Updates the fields of a project based on the provided DTO.
     * Only non-null and non-blank fields from the DTO are applied.
     *
     * @param project          the project entity to update
     * @param updateProjectDTO the DTO containing updated project data
     * @throws IllegalArgumentException if some users specified in the DTO are not found
     */
    private void updateProjectFields(Project project, CreateProjectDTO updateProjectDTO) {
        if (updateProjectDTO.getTitle() != null && !updateProjectDTO.getTitle().isBlank()) {
            project.setTitle(updateProjectDTO.getTitle());
        }
        project.setSummary(updateProjectDTO.getSummary());

        if (updateProjectDTO.getUsersId() != null) {
            List<User> users = userRepository.findAllById(updateProjectDTO.getUsersId());
            if (users.size() != updateProjectDTO.getUsersId().size()) {
                throw new IllegalArgumentException("Some users were not found");
            }
            project.setUsers(users);
        }
    }
}