package com.inn.mind_wellness.dao;

import com.inn.mind_wellness.POJO.PeerSupportGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeerSupportGroupDao extends JpaRepository<PeerSupportGroup, Long> {
}
