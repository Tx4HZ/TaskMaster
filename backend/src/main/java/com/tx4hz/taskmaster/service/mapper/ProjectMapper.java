package com.tx4hz.taskmaster.service.mapper;

import com.tx4hz.taskmaster.dto.CreateProjectDTO;
import com.tx4hz.taskmaster.dto.ProjectDTO;
import com.tx4hz.taskmaster.model.Project;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.UserRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(
        componentModel = "spring",
        uses = { UserRepository.class },
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class ProjectMapper {
    @Autowired
    protected UserRepository userRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", source = "owner")
    @Mapping(target = "users", source = "dto.usersId", qualifiedByName = "mapUsersIdToUsers")
    public abstract Project toEntity(CreateProjectDTO dto, User owner);

    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "usersID", source = "users", qualifiedByName = "mapUsersToUsersId")
    public abstract ProjectDTO toDTO(Project project);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "users", source = "usersId", qualifiedByName = "mapUsersIdToUsers")
    public abstract void updateEntity(@MappingTarget Project project, CreateProjectDTO dto);

    @Named("mapUsersIdToUsers")
    public List<User> mapUsersIdToUsers(List<Long> usersId) {
        if (usersId == null) {
            return new ArrayList<>();
        }
        return usersId.stream()
                .map(userId -> userRepository.findById(userId)
                        .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("User not found with id: " + userId)))
                .collect(Collectors.toList());
    }

    @Named("mapUsersToUsersId")
    public List<Long> mapUsersToUsersId(List<User> users) {
        if (users == null) {
            return new ArrayList<>();
        }
        return users.stream()
                .map(User::getId)
                .collect(Collectors.toList());
    }
}