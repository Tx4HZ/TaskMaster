package com.tx4hz.taskmaster.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProfileDTO {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Surname is required")
    @Size(max = 100, message = "Surname must not exceed 100 characters")
    private String surname;


    @Size(max = 100, message = "Patronymic must not exceed 100 characters")
    private String patronymic;

    private LocalDate birthday;
    private String status;
    private List<String> technologies;



}
