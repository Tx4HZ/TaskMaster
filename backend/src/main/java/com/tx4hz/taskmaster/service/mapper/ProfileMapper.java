package com.tx4hz.taskmaster.service.mapper;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.ProfileDTO;
import com.tx4hz.taskmaster.model.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileMapper INSTANCE = Mappers.getMapper(ProfileMapper.class);

    ProfileDTO toDTO(Profile profile);

    @Mapping(target = "id", ignore = true)
    Profile toEntity(CreateProfileDTO createProfileDTO);
}
