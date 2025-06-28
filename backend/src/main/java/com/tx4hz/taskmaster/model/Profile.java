package com.tx4hz.taskmaster.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "surname", nullable = false, length = 100)
    private String surname;

    @Column(name = "patronymic", length = 100)
    private String patronymic;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "status")
    private String status;

    @ElementCollection
    @CollectionTable(name = "profile_technologies", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "technologies")
    private List<String> technologies = new ArrayList<>();
}
