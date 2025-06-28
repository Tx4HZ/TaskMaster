package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.CreateProjectDTO;
import com.tx4hz.taskmaster.dto.EntityResponse;
import com.tx4hz.taskmaster.dto.ProjectDTO;
import com.tx4hz.taskmaster.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing project-related operations.
 * Provides endpoints for creating, updating, retrieving, and deleting projects.
 */
@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Creates a new project based on the provided DTO.
     *
     * @param createProjectDTO the DTO containing project creation data
     * @return a ResponseEntity containing the created project DTO or an error message
     */
    @PostMapping
    public ResponseEntity<EntityResponse<ProjectDTO>> createProject(@RequestBody CreateProjectDTO createProjectDTO) {
        try {
            ProjectDTO projectDTO = projectService.createProject(createProjectDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to create project: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to create project: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to create project: " + e.getMessage()));
        }
    }

    /**
     * Updates an existing project identified by its ID.
     *
     * @param id               the ID of the project to update
     * @param updateProjectDTO the DTO containing updated project data
     * @return a ResponseEntity containing the updated project DTO or an error message
     */
    @PutMapping("/{id}")
    public ResponseEntity<EntityResponse<ProjectDTO>> updateProject(@PathVariable Long id, CreateProjectDTO updateProjectDTO) {
        try {
            ProjectDTO projectDTO = projectService.updateProject(id, updateProjectDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        }
    }

    /**
     * Retrieves a project by its ID if the authenticated user has access.
     *
     * @param id the ID of the project to retrieve
     * @return a BlasResponseEntity containing the project DTO or an error message
     */
    @GetMapping("/{id}")
    public ResponseEntity<EntityResponse<ProjectDTO>> getProject(@PathVariable Long id) {
        try {
            ProjectDTO projectDTO = projectService.getProject(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get project: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get project: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get project: " + e.getMessage()));
        }
    }

    /**
     * Retrieves all projects associated with the authenticated user (as owner or participant).
     *
     * @return a ResponseEntity containing a list of project DTOs or an error message
     */
    @GetMapping("/all")
    public ResponseEntity<EntityResponse<List<ProjectDTO>>> getAllProject() {
        try {
            List<ProjectDTO> projectDTO = projectService.getProjectsWithUserAsParticipant();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        }
    }

    /**
     * Retrieves all projects owned by the authenticated user.
     *
     * @return a ResponseEntity containing a list of project DTOs or an error message
     */
    @GetMapping("/owned")
    public ResponseEntity<EntityResponse<List<ProjectDTO>>> getProjectOwnedByUser() {
        try {
            List<ProjectDTO> projectDTO = projectService.getProjectsOwnedByUser();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        }
    }

    /**
     * Retrieves all projects where the authenticated user is a participant.
     *
     * @return a ResponseEntity containing a list of project DTOs or an error message
     */
    @GetMapping("/participated")
    public ResponseEntity<EntityResponse<List<ProjectDTO>>> getProjectsWithUserAsParticipant() {
        try {
            List<ProjectDTO> projectDTO = projectService.getProjectsWithUserAsParticipant();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(projectDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        }
    }

    /**
     * Deletes a project by its ID if the authenticated user is the owner.
     *
     * @param id the ID of the project to delete
     * @return a ResponseEntity with a success message or an error message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<EntityResponse<String>> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success("Project with ID " + id + " deleted successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get projects: " + e.getMessage()));
        }
    }
}
