package com.tx4hz.taskmaster.service.mapper;

import com.tx4hz.taskmaster.model.Project;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.dto.ProjectDTO;
import com.tx4hz.taskmaster.dto.CreateProjectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    ProjectDTO toDTO(Project project);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", source = "owner")
    Project toEntity(CreateProjectDTO createProjectDTO, User owner);
}