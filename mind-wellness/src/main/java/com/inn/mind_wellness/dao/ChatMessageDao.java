package com.inn.mind_wellness.dao;

import com.inn.mind_wellness.POJO.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageDao extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByPeerSupportGroup_GroupId(Long groupId);
}

