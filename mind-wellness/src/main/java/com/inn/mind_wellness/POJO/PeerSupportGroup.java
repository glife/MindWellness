package com.inn.mind_wellness.POJO;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Slf4j
@Data  // Lombok generates getters and setters
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "peer_support_group")
public class PeerSupportGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(nullable = false, unique = true)
    private String groupName; // Example: "Peer Chat Room"

    @OneToMany(mappedBy = "peerSupportGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> messages;
}
