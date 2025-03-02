package com.inn.mind_wellness.POJO;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Slf4j
@Data  // Lombok generates getters and setters
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "user_nicknames")
public class UserNickname {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true)
    private String nickname;  // User's unique anonymous nickname
}
