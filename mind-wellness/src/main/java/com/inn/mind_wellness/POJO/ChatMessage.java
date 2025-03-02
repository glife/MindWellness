package com.inn.mind_wellness.POJO;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
@Slf4j
@Data  // Lombok generates getters and setters
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore  // Prevent infinite recursion
    private User user;  // The user who sent the message

    @Column(nullable = false)
    private String nickname;  // Anonymous nickname (not the real name)

    @Column(nullable = false)
    private String message;

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonBackReference
    private PeerSupportGroup peerSupportGroup;
}

