package com.inn.mind_wellness.dao;

import com.inn.mind_wellness.POJO.UserNickname;
import com.inn.mind_wellness.POJO.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNicknameDao extends JpaRepository<UserNickname, Long> {
    UserNickname findByUser(User user);
    boolean existsByNickname(String nickname);

}
