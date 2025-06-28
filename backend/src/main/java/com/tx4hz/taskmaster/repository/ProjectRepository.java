package com.tx4hz.taskmaster.repository;

import com.tx4hz.taskmaster.model.Project;
import com.tx4hz.taskmaster.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByOwner(User user);

    List<Project> findByOwnerId(Long ownerId);

    List<Project> findByUsersId(Long userId);

    @Query("SELECT DISTINCT p FROM Project p WHERE p.owner.id = :userId OR :userId IN (SELECT u.id FROM p.users u)")
    List<Project> findAllProjectsForUser(@Param("userId") Long userId);
}
