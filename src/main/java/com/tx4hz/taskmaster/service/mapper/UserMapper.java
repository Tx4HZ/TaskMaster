package com.tx4hz.taskmaster.service.mapper;

import com.tx4hz.taskmaster.dto.CreateUserDTO;
import com.tx4hz.taskmaster.dto.UserDTO;
import com.tx4hz.taskmaster.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {ProfileMapper.class})
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
    User toEntity(CreateUserDTO createUserDTO);
}
